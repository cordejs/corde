import { beforeStart, group, afterAll, expect, test } from "corde";
import { client, loginBot } from "../";

beforeStart(() => {
  loginBot();
});

group("main commands", () => {
  test("Hello command should return... hello!!", () => {
    expect("ping").toReturn("Pong?");
  });

  test("should remove a role", () => {
    const roleName = "test-role";
    expect(`remove-role ${roleName}`).toDeleteRole({ name: roleName });
  });
});

afterAll(() => {
  client.destroy();
});
