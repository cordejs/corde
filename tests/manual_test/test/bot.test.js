import { beforeStart, afterAll, test, expect } from "../../../lib";
import { Colors } from "../../../lib/src/utils";
import { bot, loginBot } from "../bot";
beforeStart(() => {
  loginBot();
});

test("Hello command should return... hello!!", () => {
  expect("ping").toReturn("Pong?");
});

test("should remove a role", () => {
  const roleName = "test-role";
  expect(`remove-role ${roleName}`).toDeleteRole({ name: roleName });
});

test("should rename a role", () => {
  const roleName = "old-role";
  const newRoleName = "new-role-name";
  expect(`rename-role ${roleName} ${newRoleName}`).toRenameRole(newRoleName, { name: roleName });
});

test("should set role color", () => {
  const roleName = "role-color";
  expect(`change-role-color ${roleName} ${Colors.DARK_GOLD}`).toSetRoleColor(Colors.DARK_GOLD, {
    name: roleName,
  });
});

afterAll(() => {
  bot.destroy();
});
