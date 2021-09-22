/* eslint-disable @typescript-eslint/no-var-requires */

const { test, expect, beforeAll } = require("corde");
const { login } = require("../src/bot");

beforeAll(async () => {
  await login();
});

test("ping should return pong", () => {
  expect("ping").toReturn("pong");
});
