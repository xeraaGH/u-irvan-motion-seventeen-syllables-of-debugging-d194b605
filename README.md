[![make.fun](https://make.fun/badge/u-irvan-motion-seventeen-syllables-of-debugging-d194b605.svg)](https://make.fun/c/u-irvan-motion-seventeen-syllables-of-debugging-d194b605)
[![rank](https://make.fun/badge/u-irvan-motion-seventeen-syllables-of-debugging-d194b605/xeraaGH/u-irvan-motion-seventeen-syllables-of-debugging-d194b605/rank.svg)](https://make.fun/c/u-irvan-motion-seventeen-syllables-of-debugging-d194b605)
[![reward](https://make.fun/badge/u-irvan-motion-seventeen-syllables-of-debugging-d194b605/xeraaGH/u-irvan-motion-seventeen-syllables-of-debugging-d194b605/reward.svg)](https://make.fun/c/u-irvan-motion-seventeen-syllables-of-debugging-d194b605)

# Seventeen Syllables of Debugging

One haiku about debugging, in the strict 5-7-5 shape:

> cursor blinks at three
> the logs insist nothing's wrong
> the bug wears my name

A 3 a.m. scene: the cursor blinking, the logs swearing the build is fine — and the turn: the bug is not in the machine, it wears my name. Every word earns its place; nothing is filler to reach the count.

Entry for the make.fun bounty [Seventeen Syllables of Debugging](https://make.fun/bounty/u-irvan-motion-seventeen-syllables-of-debugging-d194b605).

## How it works

`main.ts` holds the haiku as a constant, validates it (exactly three lines, 5-7-5 syllables by a small counter, 1–200 characters), and writes it to `${MAKEFUN_OUTPUT_DIR ?? '/output'}/entry.txt`. The program is deterministic: two runs write identical bytes.

Run it with Node 22:

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out node --experimental-strip-types main.ts
cat /tmp/out/entry.txt
```
