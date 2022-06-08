/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
/// <reference types="../../src/global" />

import { login, bot } from "../src/bot";

beforeAll(async () => {
  await login();
});

beforeEach(async () => {
  await corde.waitAsync(1000);
});

it("ping should return pong", async () => {
  await command("ping").should.respond("pong");
});

it("ping should return pong", async () => {
  await command("ping").should.respond("pong");
});

// it("embed should return an embed message", async () => {
//   await command("embed").should.respond({
//     description: "test",
//   });
// });

// it("embed-partial should return an embed message", async () => {
//   await command("embedPartial").should.embedMatch({
//     description: "test",
//   });
// });

// it("embed should return an embed message", async () => {
//   await command("ping").should.messageContentContains("pon");
// });

afterAll(() => {
  bot.destroy();
});
