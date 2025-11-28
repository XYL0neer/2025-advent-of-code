import { readInput } from "../../shared/read_input.ts";
import { join } from "@std/path";

const path = join(import.meta.dirname!, "input");
const input = readInput(path);

console.log(input);
