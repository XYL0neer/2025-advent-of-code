import { join } from "@std/path/join";
import { readInput } from "../../shared/read_input.ts";

function part1(input: string) {
  const rows = input.split("\n");
  const width = rows[0].length;
  const rolls = rows.join("");
  const afterRolls = rolls.split("");

  let removableRolls = 0;

  for (let i = 0; i < rolls.length; i++) {
    const neighboringRolls = countNeighboringRolls(
      rolls,
      i,
      width,
      rolls.length,
    );
    if (rolls[i] === "@" && neighboringRolls < 4) {
      removableRolls++;
      afterRolls[i] = "x";
    }
  }

  print(rolls, width, rows.length);
  console.log();
  print(afterRolls.join(""), width, rows.length);
  return removableRolls;
}

function part2(input: string) {
  const rows = input.split("\n");
  const width = rows[0].length;
  let rolls = rows.join("");

  let removableRolls = 0;

  while (true) {
    let hasRemovedSomething = false;

    const nextRolls = rolls.split("");
    for (let i = 0; i < rolls.length; i++) {
      const neighboringRolls = countNeighboringRolls(
        rolls,
        i,
        width,
        rolls.length,
      );
      if (rolls[i] === "@" && neighboringRolls < 4) {
        removableRolls++;
        nextRolls[i] = ".";
        hasRemovedSomething = true;
      }
    }
    if (!hasRemovedSomething) break;

    rolls = nextRolls.join("");
    // print(rolls, width, rows.length);
    // console.log();
  }
  return removableRolls;
}

function countNeighboringRolls(
  rolls: string,
  pos: number,
  width: number,
  boardSize: number,
) {
  let count = 0;
  if (pos % width < width - 1) {
    if (rolls[pos + 1] === "@") count++;
    if (rolls[pos + 1 + width] === "@" && pos + 1 + width < boardSize) count++;
    if (rolls[pos + 1 - width] === "@" && pos + 1 - width >= 0) count++;
  }

  if (pos % width > 0) {
    if (rolls[pos - 1] === "@") count++;
    if (rolls[pos - 1 + width] === "@" && pos - 1 + width < boardSize) count++;
    if (rolls[pos - 1 - width] === "@" && pos - 1 - width >= 0) count++;
  }
  if (rolls[pos + width] === "@" && pos + width < boardSize) count++;
  if (rolls[pos - width] === "@" && pos - width >= 0) count++;

  return count;
}

function print(printHall: string, width: number, rows: number) {
  for (let i = 0; i < rows; i++) {
    console.log(printHall.substring(i * rows, i * rows + width));
  }
}

const path = join(import.meta.dirname!, "input");
const input = readInput(path);

console.log(part1(input));
console.log(part2(input));
