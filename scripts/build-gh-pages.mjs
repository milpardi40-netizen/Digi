import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const root = process.cwd();
const tmpDir = path.join(root, ".gh-pages-tmp");
const appDir = path.join(root, "src", "app");

const excludedDirs = [
  path.join(appDir, "api"),
  path.join(appDir, "profile", "orders"),
  path.join(appDir, "seller", "products", "[id]"),
];

const movedDirs = [];
const modifiedFiles = new Map();

function walkTsFiles(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkTsFiles(full, out);
    else if (entry.isFile() && /\.(ts|tsx)$/.test(entry.name)) out.push(full);
  }
  return out;
}

try {
  fs.rmSync(tmpDir, { recursive: true, force: true });
  fs.mkdirSync(tmpDir, { recursive: true });

  for (const srcPath of excludedDirs) {
    if (fs.existsSync(srcPath)) {
      const rel = path.relative(appDir, srcPath);
      const destPath = path.join(tmpDir, rel);
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.renameSync(srcPath, destPath);
      movedDirs.push({ srcPath, destPath });
    }
  }

  for (const file of walkTsFiles(appDir)) {
    const content = fs.readFileSync(file, "utf8");
    if (content.includes('export const dynamic = "force-dynamic"')) {
      modifiedFiles.set(file, content);
      fs.writeFileSync(
        file,
        content.replaceAll('export const dynamic = "force-dynamic"', 'export const dynamic = "force-static"'),
        "utf8"
      );
    }
  }

  fs.rmSync(path.join(root, ".next"), { recursive: true, force: true });
  fs.rmSync(path.join(root, "out"), { recursive: true, force: true });

  execSync("npx next build", {
    cwd: root,
    stdio: "inherit",
    env: {
      ...process.env,
      GITHUB_PAGES: "true",
      NEXT_PUBLIC_GITHUB_PAGES: "true",
      NEXT_PUBLIC_BASE_PATH: "/Digi",
      NEXT_TELEMETRY_DISABLED: "1",
    },
  });

  const outDir = path.join(root, "out");
  if (fs.existsSync(outDir)) {
    fs.writeFileSync(path.join(outDir, ".nojekyll"), "", "utf8");
  }
} finally {
  for (const [file, original] of modifiedFiles.entries()) {
    fs.writeFileSync(file, original, "utf8");
  }
  for (const { srcPath, destPath } of movedDirs.reverse()) {
    if (fs.existsSync(destPath)) {
      fs.mkdirSync(path.dirname(srcPath), { recursive: true });
      fs.renameSync(destPath, srcPath);
    }
  }
  fs.rmSync(tmpDir, { recursive: true, force: true });
}
