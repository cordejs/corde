/* eslint-disable @typescript-eslint/no-var-requires */

import { it, expect, beforeStart } from "../../../lib";
import { login } from "../src/bot";

beforeStart(async () => {
  await login();
});

it("ping should return pong", () => {
  expect("ping").toReturn("pong");
});

it("embed should return an embed message", () => {
  expect("embed").toReturn({
    description: "test",
  });
});

it("embed-partial should return an embed message", () => {
  expect("embedPartial").toEmbedMatch({
    description: "test",
  });
});
