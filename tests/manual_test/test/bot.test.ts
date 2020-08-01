import { group, test, beforeStart, afterAll, expect as cordeExpect } from "../../../lib/src";
import { bot, loginBot, embedMsg } from "../bot";

beforeStart(() => {
  loginBot();
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

cordeExpect("emoji").toAddReaction("😄");
cordeExpect("removeEmoji 😄").toRemoveReactions(["😄"]);

afterAll(() => {
  bot.destroy();
});
