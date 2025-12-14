#!/usr/bin/env node
import { resolve } from "node:path";
import { runNew } from "./new.js";

function sanitizeAppName(value?: string) {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();
  if (!trimmed || trimmed.includes("..") || /[\\/]/.test(trimmed)) {
    return undefined;
  }

  return /^[a-z0-9][a-z0-9-_]*$/i.test(trimmed) ? trimmed : undefined;
}

async function main() {
  const [cmd, rawName] = process.argv.slice(2).map((arg) => arg?.trim());

  if (!cmd || cmd !== "new") {
    console.error(`Usage:
  npx stratify-cli new <app-name>

Commands:
  new        Scaffold a new Stratify app
`);
    process.exit(1);
  }

  const name = sanitizeAppName(rawName);

  if (!name) {
    console.error(
      "Please provide a valid app name (letters, numbers, dashes or underscores), e.g. npx stratify-cli new my-app"
    );
    process.exit(1);
  }

  const templateDir = resolve(new URL("../template", import.meta.url).pathname);
  await runNew({ appName: name, templateDir });
}

main().catch((err) => {
  console.error(err?.stack || String(err));
  process.exit(1);
});
