import { ExpectOperation } from "../operation";
import { Role } from "discord.js";
import { RoleData, TestReport } from "../../../types";
import { roleUtils } from "../../roleUtils";

export class ToSetRoleHoist extends ExpectOperation<boolean, RoleData> {
  public async action(hoist: boolean, roleData: RoleData): Promise<TestReport> {
    const error = roleUtils.getErrorForUndefinedRoleData(roleData);

    if (error) {
      return { pass: false, message: error };
    }

    if (hoist == undefined) {
      return this.createReport(
        `expected: hoist option to be true or false\n`,
        `received: ${typeof hoist}`,
      );
    }

    if (typeof hoist !== "boolean") {
      return this.createReport(
        `expect: hoist parameter to be of boolean type\n`,
        `received: ${typeof hoist}`,
      );
    }

    const oldRole = await this.cordeBot.findRole(roleData);
    const invalidRoleErrorMessage = roleUtils.validateRole(oldRole, roleData);

    if (invalidRoleErrorMessage) {
      return { pass: false, message: invalidRoleErrorMessage };
    }

    await this.cordeBot.sendTextMessage(this.command);
    let role: Role;
    try {
      role = await this.cordeBot.events.onceRoleHoistUpdate(roleData, this.timeOut);
    } catch (error) {
      if (this.isNot) {
        return { pass: true };
      }

      return this.createReport(
        `expected: hoist to be ${hoist}\n`,
        `received: role hoist was not updated`,
      );
    }
    if (role.hoist === hoist) {
      this.hasPassed = true;
    }

    this.invertHasPassedIfIsNot();

    if (this.hasPassed) {
      return { pass: true };
    }

    return this.createReport(
      `expected: hoist to ${this.isNot ? "not " : ""}be ${hoist}\n`,
      `received: ${role.hoist}`,
    );
  }
}
