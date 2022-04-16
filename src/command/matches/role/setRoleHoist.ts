import { Role } from "discord.js";
import { roleUtils } from "../../roleUtils";
import { typeOf } from "../../../utils/typeOf";
import { CommandState } from "../CommandState";
import { RoleUpdateHoist } from "../../../core/event";

/**
 * Function to be injected globally.
 * **Do not use it directly**.
 *
 * @internal
 */
export async function setRoleHoist(
  this: CommandState,
  hoist: boolean,
  roleIdentifier: string | corde.IRoleIdentifier,
) {
  const identifier = roleUtils.getRoleData(roleIdentifier);
  const error = roleUtils.getErrorForUndefinedRoleData(identifier);

  if (error) {
    return this.createFailedTest(error);
  }

  if (hoist == undefined) {
    return this.createReport(
      "expected: hoist option to be true or false\n",
      `received: ${typeOf(hoist)}`,
    );
  }

  if (typeof hoist !== "boolean") {
    return this.createReport(
      "expect: hoist parameter to be of boolean type\n",
      `received: ${typeOf(hoist)}`,
    );
  }

  const oldRole = await this.cordeBot.findRole(identifier);
  const invalidRoleErrorMessage = roleUtils.validateRole(oldRole, identifier);

  if (invalidRoleErrorMessage) {
    return this.createFailedTest(invalidRoleErrorMessage);
  }

  const event = this.getEvent(RoleUpdateHoist);

  if (!event.canListen()) {
    return this.createMissingIntentError(
      "Client has no intent to listen to hoist changes in roles",
      event.getIntents(),
    );
  }

  try {
    await this.sendCommandMessage();
  } catch (error) {
    return this.createFailedTest(error.message);
  }

  let role: Role;
  try {
    role = await event.once({
      ...identifier,
      timeout: this.timeout,
      guild: { id: this.guildId },
    });
  } catch {
    if (this.isNot) {
      return this.createPassTest();
    }

    return this.createReport(
      `expected: hoist to be ${hoist}\n`,
      "received: role hoist was not updated",
    );
  }
  if (role.hoist === hoist) {
    this.hasPassed = true;
  }

  this.invertHasPassedIfIsNot();

  if (this.hasPassed) {
    return this.createPassTest();
  }

  return this.createReport(
    `expected: hoist to ${this.isNot ? "not " : ""}be ${hoist}\n`,
    `received: ${role.hoist}`,
  );
}
