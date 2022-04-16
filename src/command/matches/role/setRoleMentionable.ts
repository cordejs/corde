import { Role } from "discord.js";
import { RoleUpdateMentionable } from "../../../core/event";
import { typeOf } from "../../../utils/typeOf";
import { roleUtils } from "../../roleUtils";
import { CommandState } from "../CommandState";

/**
 * Function to be injected globally.
 * **Do not use it directly**.
 *
 * @internal
 */
export async function setRoleMentionable(
  this: CommandState,
  mentionable: boolean,
  roleIdentifier: string | corde.IRoleIdentifier,
) {
  const identifier = roleUtils.getRoleData(roleIdentifier);
  const error = roleUtils.getErrorForUndefinedRoleData(identifier);

  if (error) {
    return this.createFailedTest(error);
  }

  if (mentionable == undefined) {
    return this.createReport(
      "expected: mentionable option to be true or false\n",
      `received: ${typeOf(mentionable)}`,
    );
  }

  if (typeof mentionable !== "boolean") {
    return this.createReport(
      "expected: mentionable parameter to be of boolean type\n",
      `received: ${typeOf(mentionable)}`,
    );
  }

  const oldRole = await this.cordeBot.findRole(identifier);
  const invalidRoleErrorMessage = roleUtils.validateRole(oldRole, identifier);

  if (invalidRoleErrorMessage) {
    return this.createFailedTest(invalidRoleErrorMessage);
  }

  const event = this.getEvent(RoleUpdateMentionable);

  if (!event.canListen()) {
    return this.createMissingIntentError(
      "Client has no intent to listen to mentionable changes in roles",
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
      `expected: mentionable to be ${mentionable}\n`,
      "received: role mentionable was not updated",
    );
  }
  if (role.mentionable === mentionable) {
    this.hasPassed = true;
  }

  this.invertHasPassedIfIsNot();

  if (this.hasPassed) {
    return this.createPassTest();
  }

  return this.createReport(
    `expected: mentionable to ${this.isNot ? "not " : ""}be ${mentionable}\n`,
    `received: ${role.mentionable}`,
  );
}
