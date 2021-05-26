/* eslint-disable @typescript-eslint/no-var-requires */

import { test, expect, beforeStart } from "../../../lib";
import { login } from "../src/bot";

beforeStart(async () => {
  await login();
});

test("ping should return pong", () => {
  expect("ping").toReturn("pong");
});

test("embed should return an embed message", () => {
  expect("embed").toReturn({
    description: "test",
  });
});
