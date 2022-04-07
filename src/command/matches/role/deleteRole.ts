import { Role } from "discord.js";
import { ITestReport } from "../../../types";
import { roleUtils } from "../../roleUtils";
import { CommandState } from "../CommandState";

/**
 * Function to be injected globally.
 * **Do not use it directly**.
 *
 * @internal
 */
export async function deleteRole(
  this: CommandState,
  roleIdentifier: string | corde.IRoleIdentifier,
) {
  const identifier = roleUtils.getRoleData(roleIdentifier);
  const roleOrFailObject = await getRoleOrInvalidMessage(this, identifier);

  if ((roleOrFailObject as ITestReport).message) {
    return roleOrFailObject as ITestReport;
  }

  const role = roleOrFailObject as Role;

  try {
    await this.sendCommandMessage();
  } catch (error) {
    return this.createFailedTest(error.message);
  }

  try {
    await this.cordeBot.events.onceRoleDelete({
      ...identifier,
      timeout: this.timeout,
      guild: { id: this.guildId },
    });
  } catch {
    if (this.isNot) {
      return this.createPassTest();
    }

    return this.createReport(
      `timeout: role ${role.id} wasn't deleted in the expected time (${this.timeout})`,
    );
  }
  const deletedRole = await this.cordeBot.fetchRole(role.id);

  if (!deletedRole) {
    this.hasPassed = true;
  }

  this.invertHasPassedIfIsNot();

  if (this.hasPassed) {
    return this.createPassTest();
  }

  return this.createReport(`expected: role ${role.id} to ${this.isNot ? "not " : ""}be deleted`);
}

async function getRoleOrInvalidMessage(prop: CommandState, roleIdentifier: corde.IRoleIdentifier) {
  const error = roleUtils.getErrorForUndefinedRoleData(roleIdentifier);

  if (error) {
    return prop.createFailedTest(error);
  }

  const role = await prop.cordeBot.findRole(roleIdentifier);
  if (!role) {
    return prop.createFailedTest(roleUtils.validateRole(role, roleIdentifier));
  }

  return role;
}
