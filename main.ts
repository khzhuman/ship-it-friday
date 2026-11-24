import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: the funniest one-line git commit message an AI coding agent
// writes right before breaking production on a Friday.
const entry =
  "ship: final fix before the weekend (tested in production, obviously)";
// Fail fast before writing anything: the gate needs 1-159 chars, not blank.
if (!entry.trim() || [...entry].length > 159) {
  throw new Error("entry fails the 1-159 character gate");
}
const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "entry.txt"), entry, "utf8");
const written = readFileSync(join(dir, "entry.txt"), "utf8");
if (written !== entry) throw new Error("entry.txt does not match the entry");
if ([...written].length > 159) throw new Error("entry.txt exceeds 159 characters");
