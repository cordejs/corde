import { Role } from "discord.js";
import { RoleIdentifier, TestReport } from "../../../types";
import { roleUtils } from "../../roleUtils";
import { ExpectTestBaseParams } from "../../../types";
import { ExpectTest } from "../expectTest";

/**
 * @internal
 */
export class ToDeleteRole extends ExpectTest {
  constructor(params: ExpectTestBaseParams) {
    super({ ...params, testName: "toDeleteRole" });
  }

  async action(roleIdentifier: string | RoleIdentifier): Promise<TestReport> {
    const identifier = roleUtils.getRoleData(roleIdentifier);
    const roleOrFailObject = await this.getRoleOrInvalidMessage(identifier);

    if ((roleOrFailObject as TestReport).message) {
      return roleOrFailObject as TestReport;
    }

    const role = roleOrFailObject as Role;

    await this.sendCommandMessage();
    try {
      await this.cordeBot.events.onceRoleDelete(identifier, this.timeOut, this.guildId);
    } catch {
      if (this.isNot) {
        return this.createPassTest();
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
      return this.createPassTest();
    }

    return this.createReport(`expected: role ${role.id} to ${this.isNot ? "not " : ""}be deleted`);
  }

  private async getRoleOrInvalidMessage(roleIdentifier: RoleIdentifier) {
    const error = roleUtils.getErrorForUndefinedRoleData(roleIdentifier);

    if (error) {
      return this.createFailedTest(error);
    }

    const role = await this.cordeBot.findRole(roleIdentifier);

    if (!role) {
      return this.createFailedTest(roleUtils.validateRole(role, roleIdentifier));
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
