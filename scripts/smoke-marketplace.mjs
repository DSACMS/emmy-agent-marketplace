import { mkdir, mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";

const root = process.cwd();
const codexMarketplacePath = ".agents/plugins/marketplace.json";
const claudeMarketplacePath = ".claude-plugin/marketplace.json";
const stateRoot = await mkdtemp(
  path.join(process.env.RUNNER_TEMP ?? os.tmpdir(), "marketplace-smoke-")
);

function quote(value) {
  return /^[A-Za-z0-9_./:=@-]+$/.test(value) ? value : JSON.stringify(value);
}

async function readJson(relativePath) {
  return JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
}

async function run(command, args, env) {
  console.log(`\n$ ${[command, ...args].map(quote).join(" ")}`);

  await new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: root,
      env: {
        ...process.env,
        ...env,
        CI: "1",
        NO_COLOR: "1",
      },
      stdio: "inherit",
    });

    child.on("error", reject);
    child.on("exit", (code, signal) => {
      if (code === 0) {
        resolve();
        return;
      }

      const suffix = signal ? `signal ${signal}` : `exit code ${code}`;
      reject(new Error(`${command} ${args.join(" ")} failed with ${suffix}`));
    });
  });
}

function pluginNamesFrom(marketplace) {
  return marketplace.plugins.map((plugin) => plugin.name).sort();
}

function selectedPluginNames(allPluginNames) {
  const requested = process.env.MARKETPLACE_SMOKE_PLUGINS;
  if (!requested) {
    return allPluginNames;
  }

  const requestedNames = requested
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean)
    .sort();

  const missing = requestedNames.filter(
    (name) => !allPluginNames.includes(name)
  );
  if (missing.length > 0) {
    throw new Error(
      `MARKETPLACE_SMOKE_PLUGINS includes unknown plugin(s): ${missing.join(", ")}`
    );
  }

  return requestedNames;
}

async function smokeCodex(marketplaceName, pluginNames) {
  const codexHome = path.join(stateRoot, "codex-home");
  await mkdir(codexHome, { recursive: true });

  const env = {
    CODEX_HOME: codexHome,
  };

  console.log("\n== Codex marketplace smoke ==");
  await run("codex", ["plugin", "marketplace", "add", root, "--json"], env);
  await run("codex", ["plugin", "marketplace", "list", "--json"], env);
  await run(
    "codex",
    [
      "plugin",
      "list",
      "--marketplace",
      marketplaceName,
      "--available",
      "--json",
    ],
    env
  );

  if (pluginNames.length === 0) {
    console.log("No plugins listed; skipping Codex plugin install smoke.");
    return;
  }

  for (const pluginName of pluginNames) {
    await run(
      "codex",
      ["plugin", "add", `${pluginName}@${marketplaceName}`, "--json"],
      env
    );
  }

  await run("codex", ["plugin", "list", "--json"], env);
}

async function smokeClaude(marketplaceName, pluginNames) {
  const claudeHome = path.join(stateRoot, "claude-home");
  const xdgConfigHome = path.join(stateRoot, "xdg-config-home");
  await mkdir(claudeHome, { recursive: true });
  await mkdir(xdgConfigHome, { recursive: true });

  const env = {
    HOME: claudeHome,
    XDG_CONFIG_HOME: xdgConfigHome,
  };

  console.log("\n== Claude marketplace smoke ==");
  await run("claude", ["plugin", "validate", "."], env);
  await run(
    "claude",
    ["plugin", "marketplace", "add", root, "--scope", "local"],
    env
  );
  await run("claude", ["plugin", "list", "--available", "--json"], env);

  if (pluginNames.length === 0) {
    console.log("No plugins listed; skipping Claude plugin install smoke.");
    return;
  }

  for (const pluginName of pluginNames) {
    await run(
      "claude",
      [
        "plugin",
        "install",
        `${pluginName}@${marketplaceName}`,
        "--scope",
        "local",
      ],
      env
    );
  }

  await run("claude", ["plugin", "list", "--json"], env);
}

try {
  const codexMarketplace = await readJson(codexMarketplacePath);
  const claudeMarketplace = await readJson(claudeMarketplacePath);

  if (codexMarketplace.name !== claudeMarketplace.name) {
    throw new Error(
      `Marketplace names differ: ${codexMarketplace.name} !== ${claudeMarketplace.name}`
    );
  }

  const codexPluginNames = pluginNamesFrom(codexMarketplace);
  const claudePluginNames = pluginNamesFrom(claudeMarketplace);

  if (JSON.stringify(codexPluginNames) !== JSON.stringify(claudePluginNames)) {
    throw new Error("Codex and Claude marketplace plugin lists differ.");
  }

  const pluginNames = selectedPluginNames(codexPluginNames);

  await smokeCodex(codexMarketplace.name, pluginNames);
  await smokeClaude(claudeMarketplace.name, pluginNames);

  console.log("\nMarketplace smoke tests passed.");
} finally {
  if (process.env.KEEP_MARKETPLACE_SMOKE_STATE === "1") {
    console.log(`Keeping marketplace smoke state at ${stateRoot}`);
  } else {
    await rm(stateRoot, { recursive: true, force: true });
  }
}
