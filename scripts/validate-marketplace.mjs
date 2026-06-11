import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";

const root = process.cwd();
const codexMarketplacePath = ".agents/plugins/marketplace.json";
const sharedMarketplacePath = ".claude-plugin/marketplace.json";
const namePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const errors = [];

function addError(message) {
  errors.push(message);
}

async function pathExists(relativePath) {
  try {
    await stat(path.join(root, relativePath));
    return true;
  } catch {
    return false;
  }
}

async function readJson(relativePath) {
  try {
    return JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
  } catch (error) {
    addError(`${relativePath}: ${error.message}`);
    return null;
  }
}

function normalizeSourcePath(source, catalogPath, pluginName) {
  if (typeof source === "string") {
    return source;
  }

  if (source && typeof source === "object") {
    if (source.path) {
      return source.path;
    }

    if (source.source === "local" && source.path) {
      return source.path;
    }
  }

  addError(
    `${catalogPath}: plugin "${pluginName}" must use a local source path.`
  );
  return null;
}

function validateMarketplaceShape(marketplace, catalogPath) {
  if (!marketplace || typeof marketplace !== "object") {
    addError(`${catalogPath}: marketplace must be a JSON object.`);
    return [];
  }

  if (!namePattern.test(marketplace.name ?? "")) {
    addError(`${catalogPath}: marketplace name must be lowercase kebab-case.`);
  }

  if (!Array.isArray(marketplace.plugins)) {
    addError(`${catalogPath}: plugins must be an array.`);
    return [];
  }

  return marketplace.plugins;
}

async function validatePluginEntry(entry, catalogPath) {
  if (!entry || typeof entry !== "object") {
    addError(`${catalogPath}: plugin entries must be objects.`);
    return null;
  }

  const pluginName = entry.name;
  if (!namePattern.test(pluginName ?? "")) {
    addError(
      `${catalogPath}: plugin name "${pluginName}" must be lowercase kebab-case.`
    );
  }

  const sourcePath = normalizeSourcePath(entry.source, catalogPath, pluginName);
  if (!sourcePath) {
    return null;
  }

  if (sourcePath.includes("..")) {
    addError(
      `${catalogPath}: plugin "${pluginName}" source must not contain "..".`
    );
  }

  const normalizedPath = sourcePath.replace(/^\.\//, "");
  if (!normalizedPath.startsWith("plugins/")) {
    addError(
      `${catalogPath}: plugin "${pluginName}" source must resolve under plugins/.`
    );
  }

  if (!(await pathExists(normalizedPath))) {
    addError(
      `${catalogPath}: plugin "${pluginName}" source does not exist: ${sourcePath}`
    );
  }

  return {
    name: pluginName,
    path: normalizedPath,
  };
}

async function validateCatalogEntries(catalogPath, entries) {
  const seen = new Map();

  for (const entry of entries) {
    const plugin = await validatePluginEntry(entry, catalogPath);
    if (!plugin) {
      continue;
    }

    if (seen.has(plugin.name)) {
      addError(`${catalogPath}: duplicate plugin name "${plugin.name}".`);
    }

    seen.set(plugin.name, plugin.path);
  }

  return seen;
}

async function validatePluginDirectory(pluginName, pluginPath) {
  const manifestPaths = [
    ".codex-plugin/plugin.json",
    ".claude-plugin/plugin.json",
    "plugin.json",
  ];

  for (const manifestPath of manifestPaths) {
    const relativePath = path.join(pluginPath, manifestPath);
    if (await pathExists(relativePath)) {
      await readJson(relativePath);
    }
  }

  const skillsPath = path.join(pluginPath, "skills");
  if (!(await pathExists(skillsPath))) {
    addError(
      `plugins/${pluginName}: listed plugins must include a skills/ directory.`
    );
    return;
  }

  await validateSkillsDirectory(skillsPath);
}

async function validateSkillsDirectory(skillsPath) {
  const entries = await readdir(path.join(root, skillsPath), {
    withFileTypes: true,
  });

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const skillDirectory = path.join(skillsPath, entry.name);
    const skillFile = path.join(skillDirectory, "SKILL.md");

    if (!(await pathExists(skillFile))) {
      addError(`${skillDirectory}: missing SKILL.md.`);
      continue;
    }

    await validateSkill(skillFile, entry.name);
  }
}

async function validateSkill(skillFile, directoryName) {
  const content = await readFile(path.join(root, skillFile), "utf8");
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n?/);

  if (!frontmatterMatch) {
    addError(`${skillFile}: missing YAML frontmatter block.`);
    return;
  }

  let metadata;
  try {
    metadata = YAML.parse(frontmatterMatch[1]);
  } catch (error) {
    addError(`${skillFile}: invalid YAML frontmatter: ${error.message}`);
    return;
  }

  if (!metadata || typeof metadata !== "object") {
    addError(`${skillFile}: frontmatter must be a YAML mapping.`);
    return;
  }

  if (!namePattern.test(metadata.name ?? "")) {
    addError(`${skillFile}: name must be lowercase kebab-case.`);
  }

  if (metadata.name !== directoryName) {
    addError(`${skillFile}: name must match directory "${directoryName}".`);
  }

  if (
    typeof metadata.description !== "string" ||
    metadata.description.trim() === ""
  ) {
    addError(`${skillFile}: description is required.`);
  } else if (metadata.description.length > 1024) {
    addError(`${skillFile}: description must be 1024 characters or fewer.`);
  }
}

const codexMarketplace = await readJson(codexMarketplacePath);
const sharedMarketplace = await readJson(sharedMarketplacePath);

const codexEntries = validateMarketplaceShape(
  codexMarketplace,
  codexMarketplacePath
);
const sharedEntries = validateMarketplaceShape(
  sharedMarketplace,
  sharedMarketplacePath
);

const codexPlugins = await validateCatalogEntries(
  codexMarketplacePath,
  codexEntries
);
const sharedPlugins = await validateCatalogEntries(
  sharedMarketplacePath,
  sharedEntries
);

const codexNames = [...codexPlugins.keys()].sort();
const sharedNames = [...sharedPlugins.keys()].sort();

if (JSON.stringify(codexNames) !== JSON.stringify(sharedNames)) {
  addError(
    "Codex and Claude/Copilot marketplace catalogs must list the same plugin names."
  );
}

for (const [pluginName, pluginPath] of codexPlugins) {
  const sharedPath = sharedPlugins.get(pluginName);
  if (sharedPath && sharedPath !== pluginPath) {
    addError(
      `Plugin "${pluginName}" uses different source paths across catalogs.`
    );
  }

  await validatePluginDirectory(pluginName, pluginPath);
}

if (errors.length > 0) {
  console.error("Marketplace validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Validated ${codexPlugins.size} marketplace plugin(s).`);
