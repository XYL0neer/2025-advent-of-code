import { assertEquals } from "@std/assert";

Deno.test({
  name: "Math.floor stuff",
  fn() {
    assertEquals(Math.floor(20 / 100), 0);
    assertEquals(Math.floor(80 / 100), 0);
    assertEquals(Math.floor(99 / 100), 0);
    assertEquals(Math.floor(199 / 100), 1);
    assertEquals(-18 % 100 + 100, 82);
  },
});
