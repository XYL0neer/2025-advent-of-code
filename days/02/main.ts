import { readInput } from "../../shared/read_input.ts";
import { join } from "@std/path";

type Range = { from: string; to: string };
function ceilDiv(a: bigint, b: bigint) {
  return (a + b - 1n) / b;
}

// AI Slop I dont understand the solution. But yielded the right result.
// I give up and dont do part 2
function countAndSumMirroredInRange(L: bigint, R: bigint) {
  let sum = 0n;
  const digits = (s: bigint) => s.toString().length;
  const maxK = Math.floor(digits(R) / 2);
  for (let k = 1; k <= maxK; k++) {
    const pow = 10n ** BigInt(k);
    const M = pow + 1n;
    const tMinAllowed = (k === 1) ? 1n : pow / 10n;
    let tLow = ceilDiv(L, M);
    let tHigh = R / M;
    if (tLow < tMinAllowed) tLow = tMinAllowed;
    if (tHigh > pow - 1n) tHigh = pow - 1n;
    if (tLow <= tHigh) {
      const count = tHigh - tLow + 1n;
      const tSum = (tLow + tHigh) * count / 2n;
      sum += M * tSum;
    }
  }
  return sum;
}

function part1(input: string): bigint {
  const ranges = parseInput(input);
  let sum = BigInt(0);
  for (const range of ranges) {
    sum += countAndSumMirroredInRange(BigInt(range.from), BigInt(range.to));
    // const halfLength = Math.floor(range.from.length / 2);
    // let firstHalf = range.from.substring(0, halfLength);
    // while (parseInt(`${firstHalf}${firstHalf}`, 10) <= parseInt(range.to, 10)) {
    //   const fullNumber = mirrorIsInRange(firstHalf, range);
    //   if (fullNumber !== null) {
    //     sum += BigInt(fullNumber);
    //   }
    //
    //   firstHalf = (parseInt(firstHalf, 10) + 1).toString();
    // }
  }

  // console.log(JSON.stringify(mirroredNumbers.sort()));
  return sum;
}

function mirrorIsInRange(firstHalf: string, range: Range) {
  const fullNumber = parseInt(`${firstHalf}${firstHalf}`, 10);
  if (
    fullNumber >= parseInt(range.from, 10) &&
    fullNumber <= parseInt(range.to, 10)
  ) {
    // console.log(`${fullNumber} is in range ${range.from}-${range.to}`);
    return fullNumber;
  }
  return null;
}

function parseInput(input: string): Range[] {
  const rawRanges = input.split(",");
  return rawRanges.map((raw) => {
    const [rawFrom, rawTo] = raw.split("-");
    return { from: rawFrom, to: rawTo };
  });
}

const path = join(import.meta.dirname!, "input");
const input = readInput(path);
console.log(part1(input));
