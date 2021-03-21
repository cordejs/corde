const { test, expect } = require("corde");

test("ping should return pong", () => {
  expect("ping").toReturn("pong");
});
