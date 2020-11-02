import { beforeStart } from "corde";
import { client, loginBot } from "../";

beforeStart(() => {
  loginBot();
});

group("main commands", () => {
  test("Hello command should return... hello!!", () => {
    expect("ping").to("Ping?");
  });
});

afterAll(() => {
  client.destroy();
});
