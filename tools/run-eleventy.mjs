import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";

const command = path.join(process.cwd(), "node_modules", "@11ty", "eleventy", "cmd.cjs");
const attempts = process.platform === "win32" ? 5 : 1;

// Windows can briefly retain the generated sitemap after the validation pass.
// Let that handle settle before Eleventy replaces the file, then retain the
// targeted retry below for the same transient error.
if (process.platform === "win32") {
  await new Promise(resolve => setTimeout(resolve, 5000));
}

for (let attempt = 1; attempt <= attempts; attempt += 1) {
  const result = spawnSync(process.execPath, [command, "--quiet"], {
    cwd: process.cwd(),
    encoding: "utf8"
  });
  const output = `${result.stdout || ""}${result.stderr || ""}`;
  const transientSitemapLock = process.platform === "win32"
    && /UNKNOWN: unknown error, open .*sitemap\.xml/i.test(output);

  if (result.status === 0) {
    process.stdout.write(result.stdout || "");
    process.stderr.write(result.stderr || "");
    process.exit(0);
  }

  if (!transientSitemapLock || attempt === attempts) {
    process.stdout.write(result.stdout || "");
    process.stderr.write(result.stderr || "");
    process.exit(result.status || 1);
  }

  await new Promise(resolve => setTimeout(resolve, attempt * 2000));
}
