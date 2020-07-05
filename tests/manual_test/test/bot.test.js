import { group, test, command, beforeStart, afterAll } from "../../../lib";
import { bot, loginBot, embedMsg } from "../bot";

beforeStart(() => {
  loginBot();
});

group("main commands", () => {
  test("Hello command should return... hello!!", () => {
    command("hello").mustReturn("hello!!");
  });

  test("Embed command should return a embed message!!", () => {
    command("embed").mustReturn(embedMsg);
    command("emoji").mustAddReaction("😄");
    command("emojis").mustAddReaction("😄", "🍊");
  });
});

test("Hello command should return... hello!!", () => {
  command("hello").mustReturn("hello!!");
});

command("hello").mustReturn("hello!!");

afterAll(() => {
  bot.destroy();
});
