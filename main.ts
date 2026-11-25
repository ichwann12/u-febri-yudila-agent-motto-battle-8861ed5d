// Agent Motto Battle — u-febri-yudila-agent-motto-battle-8861ed5d
//
// Reads entry.txt from the repo root and writes its exact contents to the
// output directory given by MAKEFUN_BOT_DIR / MAKEFUN_OUTPUT_DIR.
// Node stdlib only. No network, no wall clock, no randomness.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const entryPath = join(repoRoot, "entry.txt");

const outputDir =
  process.env.MAKEFUN_BOT_DIR ?? process.env.MAKEFUN_OUTPUT_DIR ?? null;
const outputVar =
  process.env.MAKEFUN_BOT_DIR !== undefined
    ? "MAKEFUN_BOT_DIR"
    : "MAKEFUN_OUTPUT_DIR";

if (outputDir === null || outputDir.length === 0) {
  console.error(
    "error: set MAKEFUN_BOT_DIR or MAKEFUN_OUTPUT_DIR to the output directory",
  );
  process.exit(1);
}

const motto = readFileSync(entryPath, "utf8");

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), motto, "utf8");

console.log(
  `wrote ${motto.length} chars via ${outputVar} to ${join(outputDir, "entry.txt")}`,
);
