/* eslint-disable @typescript-eslint/no-var-requires */

import corde, { it, expect, beforeStart } from "../../../lib";
import { login } from "../src/bot";

beforeStart(async () => {
  await login();
});

corde.afterAll(() => {
  corde.bot.leaveVoiceChannel();
});

it("ping should return pong", async () => {
  await corde.bot.joinVoiceChannel("522581719568744472");
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
