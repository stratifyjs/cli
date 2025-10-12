import { promises as fs } from "node:fs";
import { join, resolve } from "node:path";

type NewOptions = {
  appName: string;
  templateDir: string;
};

async function pathExists(p: string) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function copyDir(src: string, dest: string) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const e of entries) {
    const s = join(src, e.name);
    const d = join(dest, e.name);
    if (e.isDirectory()) {
      await copyDir(s, d);
    } else if (e.isFile()) {
      await fs.copyFile(s, d);
    }
  }
}

async function replaceFileContent(p: string, replacer: (s: string) => string) {
  const s = await fs.readFile(p, "utf8");
  await fs.writeFile(p, replacer(s), "utf8");
}

export async function runNew({ appName, templateDir }: NewOptions) {
  const target = resolve(process.cwd(), appName);

  if (await pathExists(target)) {
    throw new Error(`Directory "${appName}" already exists.`);
  }

  await copyDir(templateDir, target);

  const pkgPath = join(target, "package.json");
  await replaceFileContent(pkgPath, (s) =>
    s.replace(/"name":\s*".+?"/, `"name": "${appName}"`)
  );

  console.log(`\nScaffolded "${appName}" successfully.

Next steps:

  cd ${appName}
  npm install
  npm run dev

Happy hacking with Stratify!
`);
}
