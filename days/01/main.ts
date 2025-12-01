import { readInput } from "../../shared/read_input.ts";
import { join } from "@std/path";

function solutionOne(input: string): number {
  const rawActions = input.split("\n");
  const actions = rawActions.map((a) => parseAction(a));

  let start = 50;
  let zeroCounter = 0;
  for (const a of actions) {
    start += a;
    start = ((start % 100) + 100) % 100;
    if (start == 0) zeroCounter++;
  }
  return zeroCounter;
}

function solutionTwo(input: string): number {
  const rawActions = input.split("\n");
  const actions = rawActions.map((a) => parseAction(a));

  let start = 50;
  let zeroCounter = 0;
  for (const a of actions) {
    zeroCounter += Math.trunc(Math.abs(a) / 100);
    const normalizedRot = a % 100;
    start += normalizedRot;
    // if start ends at the value of normalizedRot then start was 0 and from zero into negative does not count to cross a zero
    if (start != normalizedRot && (start <= 0 || start >= 100)) zeroCounter++;
    start = ((start % 100) + 100) % 100;
  }
  return zeroCounter;
}

function parseAction(a: string): number {
  if (a.startsWith("R")) {
    return parseInt(a.substring(1));
  } else if (a.startsWith("L")) {
    return -1 * parseInt(a.substring(1));
  }
  return NaN;
}

const path = join(import.meta.dirname!, "input");
const input = readInput(path);

console.log(solutionOne(input));
console.log(solutionTwo(input));
