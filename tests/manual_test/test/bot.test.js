import { group, test, command, beforeStart, afterAll } from "../../../lib";
import { bot, loginBot, embedMsg } from "../bot.js";

beforeStart(() => {
  loginBot();
});

group("main commands", () => {
  test("Hello command should return... hello!!", () => {
    expect("hello").toReturn("hello!!");
  });

  test("Embed command should return a embed message!!", () => {
    expect("embed").toReturn(embedMsg);
    expect("emoji").toAddReaction("😄");
    expect("emojis").toAddReaction("😄", "🍊");
  });
});

test("Hello command should return... hello!!", () => {
  expect("hello").toReturn("hello!!");
});

expect("hello").toReturn("hello!!");

afterAll(() => {
  bot.destroy();
});
