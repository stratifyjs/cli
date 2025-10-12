import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { mkdtemp, rm } from "node:fs/promises";
import { runNew } from "../new";

const TEMPLATE_FIXTURE = resolve("template");

async function pathExists(p: string) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

describe("runNew()", () => {
  test("copies template and replaces package name", async () => {
    const tmpRoot = await mkdtemp(join(tmpdir(), "stratify-cli-"));
    const appName = "my-app";
    const target = join(tmpRoot, appName);

    const prevCwd = process.cwd();
    process.chdir(tmpRoot);
    try {
      await runNew({ appName, templateDir: TEMPLATE_FIXTURE });

      const pkgPath = join(target, "package.json");
      assert.ok(await pathExists(pkgPath), "package.json should exist");

      const pkg = JSON.parse(await fs.readFile(pkgPath, "utf8"));
      assert.equal(pkg.name, appName);

      const srcDir = join(target, "src");
      assert.ok(await pathExists(srcDir), "src/ should exist");
    } finally {
      process.chdir(prevCwd);
      await rm(tmpRoot, { recursive: true, force: true });
    }
  });

  test("throws if target directory already exists", async () => {
    const tmpRoot = await mkdtemp(join(tmpdir(), "stratify-cli-"));
    const appName = "existing-app";
    const target = join(tmpRoot, appName);

    await fs.mkdir(target, { recursive: true });

    const prevCwd = process.cwd();
    process.chdir(tmpRoot);
    try {
      await assert.rejects(
        () => runNew({ appName, templateDir: TEMPLATE_FIXTURE }),
        /already exists/
      );
    } finally {
      process.chdir(prevCwd);
      await rm(tmpRoot, { recursive: true, force: true });
    }
  });
});
