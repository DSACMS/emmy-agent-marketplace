import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const ignoredDirectories = new Set([
  ".git",
  ".cache",
  ".venv",
  "node_modules",
  "coverage",
  "dist",
  "build",
]);

const jsonFiles = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!ignoredDirectories.has(entry.name)) {
        await walk(path.join(directory, entry.name));
      }
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".json")) {
      jsonFiles.push(path.join(directory, entry.name));
    }
  }
}

await walk(root);

const failures = [];

for (const file of jsonFiles.sort()) {
  const relativePath = path.relative(root, file);
  try {
    JSON.parse(await readFile(file, "utf8"));
  } catch (error) {
    failures.push(`${relativePath}: ${error.message}`);
  }
}

if (failures.length > 0) {
  console.error("Invalid JSON files found:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Validated ${jsonFiles.length} JSON file(s).`);
