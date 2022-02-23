import { typeOf } from "../../../utils/typeOf";
import { roleUtils } from "../../roleUtils";
import { CommandState } from "../CommandState";

/**
 * Function to be injected globally.
 * **Do not use it directly**.
 *
 * @internal
 */
export async function setRolePosition(
  this: CommandState,
  newPosition: number,
  roleIdentifier: string | corde.IRoleIdentifier,
) {
  const identifier = roleUtils.getRoleData(roleIdentifier);
  const error = roleUtils.getErrorForUndefinedRoleData(identifier);

  if (error) {
    return this.createFailedTest(error);
  }

  if (typeof newPosition !== "number") {
    return this.createReport(
      "expected: position option to be a number\n",
      `received: ${typeOf(newPosition)}`,
    );
  }

  const oldRole = await this.cordeBot.findRole(identifier);
  const invalidRoleErrorMessage = roleUtils.validateRole(oldRole, identifier);

  if (invalidRoleErrorMessage) {
    return this.createFailedTest(invalidRoleErrorMessage);
  }

  let role = await this.cordeBot.findRole(identifier);
  const lastRole = this.cordeBot
    .getRoles()
    .sort((r1, r2) => r2.rawPosition - r1.rawPosition)
    .first();

  if (!lastRole) {
    return this.createReport("no roles were found");
  }

  if (newPosition > lastRole.rawPosition) {
    return this.createReport(
      `expected: position to be >= 0 and <= ${lastRole.rawPosition} (max value possible)\n`,
      `received: ${newPosition}`,
    );
  }

  try {
    await this.sendCommandMessage();
  } catch (error) {
    return this.createFailedTest(error.message);
  }

  try {
    role = await this.cordeBot.events.onceRolePositionUpdate({
      ...identifier,
      timeout: this.timeout,
      guild: { id: this.guildId },
    });
  } catch {
    if (this.isNot) {
      return this.createPassTest();
    }

    return this.createReport(
      `expected: role position to change to ${newPosition}\n`,
      "received: position didn't change",
    );
  }

  if (role.rawPosition === newPosition) {
    this.hasPassed = true;
  }

  this.invertHasPassedIfIsNot();

  if (this.hasPassed) {
    return this.createPassTest();
  }

  return this.createReport(
    `expected: role position to change to ${newPosition}\n`,
    `received: ${role.rawPosition}`,
  );
}
