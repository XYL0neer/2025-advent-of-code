export function readInput(path: string) {
  return Deno.readTextFileSync(path);
}
