import { join } from "@std/path/join";
import { readInput } from "../../shared/read_input.ts";

function part1(input: string): number {
  console.time("part1");
  const rows = input.split("\n");
  let joltageSum = 0;
  for (const row of rows) {
    const first = findLargestIndex(row, row.length - 1, 0);
    const second = findLargestIndex(row, row.length, first);

    const joltage = parseInt(`${row[first]}${row[second]}`);
    joltageSum += joltage;
  }
  console.timeEnd("part1");
  return joltageSum;
}

function part2(input: string): number {
  const rows = input.split("\n");
  let joltageSum = 0;
  console.time("part2");
  for (const row of rows) {
    let biggestNumber = "";
    let takeNumberAtIndex = 0;
    for (let i = 12; i > 0; i--) {
      takeNumberAtIndex = findLargestIndex(
        row,
        row.length - i,
        takeNumberAtIndex,
      );
      biggestNumber = `${biggestNumber}${row[takeNumberAtIndex]}`;
    }

    const joltage = parseInt(biggestNumber);
    joltageSum += joltage;
  }
  console.timeEnd("part2");
  return joltageSum;
}

function findLargestIndex(row: string, furthest: number, to: number) {
  let largestIndex = furthest;
  for (let i = furthest; i > to; i--) {
    if (row[i] > row[largestIndex]) {
      largestIndex = i;
    }
  }
  return largestIndex;
}

const path = join(import.meta.dirname!, "input");
const input = readInput(path);
console.log(part1(input));
console.log(part2(input));
