import { Role } from "discord.js";
import { RoleData, TestReport } from "../../../types/types";
import { roleUtils } from "../../roleUtils";
import { ExpectOperation } from "../operation";

export class ToDeleteRole extends ExpectOperation<RoleData> {
  public async action(roleData: RoleData): Promise<TestReport> {
    const roleOrFailObject = await this.getRoleOrInvalidMessage(roleData);

    if ((roleOrFailObject as TestReport).message) {
      return roleOrFailObject as TestReport;
    }

    const role = roleOrFailObject as Role;

    await this.cordeBot.sendTextMessage(this.command);
    try {
      await this.cordeBot.events.onceRoleDelete(roleData, this.timeOut);
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

  private async getRoleOrInvalidMessage(roleData: RoleData) {
    const error = roleUtils.getErrorForUndefinedRoleData(roleData);

    if (error) {
      return { pass: false, message: error };
    }

    let role = await this.cordeBot.findRole(roleData);

    const invalidRoleErrorMessage = roleUtils.validateRole(role, roleData);

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
