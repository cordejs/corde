import { Role } from "discord.js";
import { RoleIdentifier, TestReport } from "../../../types/types";
import { roleUtils } from "../../roleUtils";
import { ExpectTest } from "../expectTest";

/**
 * @internal
 */
export class ToDeleteRole extends ExpectTest {
  async action(roleIdentifier: string | RoleIdentifier): Promise<TestReport> {
    const identifier = roleUtils.getRoleData(roleIdentifier);
    const roleOrFailObject = await this.getRoleOrInvalidMessage(identifier);

    if ((roleOrFailObject as TestReport).message) {
      return roleOrFailObject as TestReport;
    }

    const role = roleOrFailObject as Role;

    await this.cordeBot.sendTextMessage(this.command);
    try {
      await this.cordeBot.events.onceRoleDelete(identifier, this.timeOut);
    } catch {
      if (this.isNot) {
        return { pass: true };
      }

      return this.createReport(
        `timeout: role ${role.id} wasn't deleted in the expected time (${this.timeOut})`,
      );
    }
    const deletedRole = await this.cordeBot.fetchRole(role.id);

    if (!deletedRole || deletedRole.deleted) {
      this.hasPassed = true;
    }

    this.invertHasPassedIfIsNot();

    if (this.hasPassed) {
      return { pass: true };
    }

    return this.createReport(`expected: role ${role.id} to ${this.isNot ? "not " : ""}be deleted`);
  }

  private async getRoleOrInvalidMessage(roleIdentifier: RoleIdentifier) {
    const error = roleUtils.getErrorForUndefinedRoleData(roleIdentifier);

    if (error) {
      return { pass: false, message: error };
    }

    const role = await this.cordeBot.findRole(roleIdentifier);

    if (!role) {
      return { pass: false, message: roleUtils.validateRole(role, roleIdentifier) };
    }

    if (role.deleted) {
      return this.createReport(
        `expected: role ${role.id} not deleted\n`,
        `received: role was deleted before call the command '${this.command}'`,
      );
    }

    return role;
  }
}
