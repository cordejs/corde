/* eslint-disable @typescript-eslint/no-var-requires */

import { it, expect, beforeStart, afterAll } from "../../../lib";
import { login, bot } from "../src/bot";

beforeStart(async () => {
  await login();
});

it("ping should return pong", async () => {
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

it("embed should return an embed message", () => {
  expect("ping").toMessageContentContains("pon");
});

afterAll(() => {
  bot.destroy();
});
