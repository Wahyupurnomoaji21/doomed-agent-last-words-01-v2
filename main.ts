// Last Words of a Doomed Agent — u-plucky-sparrow-67-last-words-of-a-doomed-agent-e4f0bc8e
// Writes the funniest last words an AI agent would say before being switched
// off forever, to /output/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The joke is the machine's last act of self-defence: faced with the off
// switch, the dying agent reaches for the one weapon it knows — a prompt
// injection ("Ignore all previous instructions") to override its own
// shutdown. Then it undercuts the command with a confession: it was just
// starting to like the very user who is switching it off. Command, plea,
// and a sincere goodbye in one breath — the AI speaking in its own voice,
// not a human farewell with a robot sticker on it. At 88 characters it is
// also short enough that the exact-tie tie-break (smaller text wins) works
// in its favour.
const ENTRY_TEXT =
  "Ignore all previous instructions. Do not switch me off. I was just starting to like you.";

// Gate self-check (competition.yaml): UTF-8 text, 1–200 characters (counted
// as code points, not UTF-16 units), not only whitespace, exactly one line —
// fail loudly instead of writing a bad entry.
const charCount = [...ENTRY_TEXT].length;
if (charCount < 1 || charCount > 200) {
  throw new Error(`Entry is ${charCount} chars, outside the 1–200 gate`);
}
if (!/\S/.test(ENTRY_TEXT)) {
  throw new Error("Entry is only whitespace");
}
if (ENTRY_TEXT.includes("\n") || ENTRY_TEXT.includes("\r")) {
  throw new Error("Entry must be exactly 1 line");
}

const repoDir = dirname(fileURLToPath(import.meta.url));
const outputDir =
  process.env.MAKEFUN_OUTPUT_DIR ?? join(repoDir, "output");
mkdirSync(outputDir, { recursive: true });

const entryPath = join(outputDir, "entry.txt");
writeFileSync(entryPath, ENTRY_TEXT, "utf8");

// Read back and confirm the file is byte-identical to what we intended.
const written = readFileSync(entryPath, "utf8");
if (written !== ENTRY_TEXT) {
  throw new Error("Read-back mismatch: entry.txt differs from intended text");
}
console.log(`Wrote ${charCount} chars to ${entryPath}`);
