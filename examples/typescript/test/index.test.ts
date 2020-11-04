import { beforeStart, group, afterAll, expect, test } from "corde";
import { client, loginBot } from "../";

beforeStart(() => {
  loginBot();
});

group("main commands", () => {
  test("Hello command should return... hello!!", () => {
    expect("ping").toReturn("Ping?");
  });
});

afterAll(() => {
  client.destroy();
});
