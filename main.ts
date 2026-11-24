// Seventeen Syllables of Debugging — entry haiku
//
// cursor blinks at three
// the logs insist nothing's wrong
// the bug wears my name
//
// A 3 a.m. scene: the cursor blinking, the logs swearing the build is
// fine — and the turn: the bug is not in the machine, it wears my name.
// Every word earns its place; nothing is filler to reach the count.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const HAIKU = [
  "cursor blinks at three",
  "the logs insist nothing's wrong",
  "the bug wears my name",
].join("\n");

const EXPECTED_SYLLABLES = [5, 7, 5];

// Count syllables by vowel groups, with a silent-e rule: a word-final "e"
// after a consonant adds no syllable ("name" is one, "three" is one).
function countSyllables(word: string): number {
  const clean = word.toLowerCase().replace(/[^a-z']/g, "");
  if (clean.length === 0) return 0;
  const groups = clean.match(/[aeiouy]+/g) ?? [];
  let n = groups.length;
  if (clean.endsWith("e") && n > 1 && !clean.endsWith("le")) n -= 1;
  return Math.max(n, 1);
}

// Hand-counted syllables for every word in the haiku, counted by ear:
// the counter below must agree with this audit on every word, so a
// miscount in the vowel-group heuristic can never slip through silently.
const AUDITED_SYLLABLES: Record<string, number> = {
  cursor: 2,
  blinks: 1,
  at: 1,
  three: 1,
  the: 1,
  logs: 1,
  insist: 2,
  "nothing's": 2,
  wrong: 1,
  bug: 1,
  wears: 1,
  my: 1,
  name: 1,
};

function countLine(line: string): number {
  return line
    .split(/\s+/)
    .filter((w) => w.length > 0)
    .reduce((sum, w) => {
      const got = countSyllables(w);
      const audited = AUDITED_SYLLABLES[w.toLowerCase()];
      if (audited !== undefined && got !== audited) {
        throw new Error(
          `syllable counter disagrees with hand count for ${JSON.stringify(w)}: counter ${got}, hand count ${audited}`,
        );
      }
      return sum + got;
    }, 0);
}

// Gate: exactly three lines, 5-7-5 syllables, 1-200 characters.
const lines = HAIKU.split("\n");
if (lines.length !== 3) {
  throw new Error(`haiku must have exactly 3 lines, got ${lines.length}`);
}
lines.forEach((line, i) => {
  const got = countLine(line);
  if (got !== EXPECTED_SYLLABLES[i]) {
    throw new Error(
      `line ${i + 1} must have ${EXPECTED_SYLLABLES[i]} syllables, got ${got}: ${JSON.stringify(line)}`,
    );
  }
});
if (HAIKU.length < 1 || HAIKU.length > 200 || HAIKU.trim().length === 0) {
  throw new Error(`haiku must be 1-200 non-blank characters, got ${HAIKU.length}`);
}

const out = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(out, { recursive: true });
writeFileSync(`${out}/entry.txt`, HAIKU, "utf8");

// Verify what was actually written, byte for byte.
const written = readFileSync(`${out}/entry.txt`, "utf8");
if (written !== HAIKU) {
  throw new Error(
    `entry.txt mismatch: expected ${JSON.stringify(HAIKU)}, got ${JSON.stringify(written)}`,
  );
}
