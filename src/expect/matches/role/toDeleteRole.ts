import { Role } from "discord.js";
import { RoleIdentifier, TestReport } from "../../../types/types";
import { roleUtils } from "../../roleUtils";
import { ExpectTest } from "../expectTest";

export class ToDeleteRole extends ExpectTest {
  public async action(roleIdentifier: RoleIdentifier): Promise<TestReport> {
    const roleOrFailObject = await this.getRoleOrInvalidMessage(roleIdentifier);

    if ((roleOrFailObject as TestReport).message) {
      return roleOrFailObject as TestReport;
    }

    const role = roleOrFailObject as Role;

    await this.cordeBot.sendTextMessage(this.command);
    try {
      await this.cordeBot.events.onceRoleDelete(roleIdentifier, this.timeOut);
    } catch (error) {
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

    let role = await this.cordeBot.findRole(roleIdentifier);

    const invalidRoleErrorMessage = roleUtils.validateRole(role, roleIdentifier);

    if (invalidRoleErrorMessage) {
      return { pass: false, message: invalidRoleErrorMessage };
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
