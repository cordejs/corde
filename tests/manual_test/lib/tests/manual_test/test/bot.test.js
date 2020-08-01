"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../../lib/src");
const bot_1 = require("../bot");
src_1.beforeStart(() => {
  bot_1.loginBot();
});
// group("main commands", () => {
//   test("Hello command should return... hello!!", () => {
//     cordeExpect("hello").toReturn("hello!!");
//   });
//   test("Embed command should return a embed message!!", () => {
//     cordeExpect("embed").toReturn(embedMsg);
//     cordeExpect("emoji").toAddReaction("😄");
//     cordeExpect("emojis").toAddReaction("😄", "🍊");
//   });
// });
// test("Hello command should return... hello!!", () => {
//   cordeExpect("hello").toReturn("hello!!");
// });
// cordeExpect("hello").toReturn("hello!!");
src_1.expect("emoji").toAddReaction("😄");
src_1.expect("removeEmoji 😄").toRemoveReactions(["😄"]);
src_1.afterAll(() => {
  bot_1.bot.destroy();
});
