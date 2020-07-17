import { group, test, command, beforeStart, afterAll } from "corde";
import { client, loginBot } from "../";

beforeStart(() => {
  loginBot();
});

group("main commands", () => {
  test("Hello command should return... hello!!", () => {
    expect("ping").shouldReturn("Ping?");
  });
});

afterAll(() => {
  client.destroy();
});
