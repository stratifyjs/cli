#!/usr/bin/env node
import { resolve } from "node:path";
import { runNew } from "./new.js";

async function main() {
  const [cmd, name] = process.argv.slice(2);

  if (!cmd || cmd !== "new") {
    console.error(`Usage:
  npx stratify-cli new <app-name>

Commands:
  new        Scaffold a new Stratify app
`);
    process.exit(1);
  }

  if (!name) {
    console.error("Please provide an app name, e.g. npx stratify-cli new my-app");
    process.exit(1);
  }

  const templateDir = resolve(new URL("../template", import.meta.url).pathname);
  await runNew({ appName: name, templateDir });
}

main().catch((err) => {
  console.error(err?.stack || String(err));
  process.exit(1);
});
