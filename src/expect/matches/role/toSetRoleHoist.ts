import { ExpectTest } from "../expectTest";
import { Role } from "discord.js";
import { RoleIdentifier, TestReport } from "../../../types";
import { roleUtils } from "../../roleUtils";
import { typeOf } from "../../../utils";

export class ToSetRoleHoist extends ExpectTest {
  public async action(hoist: boolean, roleIdentifier: RoleIdentifier): Promise<TestReport> {
    const error = roleUtils.getErrorForUndefinedRoleData(roleIdentifier);

    if (error) {
      return { pass: false, message: error };
    }

    if (hoist == undefined) {
      return this.createReport(
        `expected: hoist option to be true or false\n`,
        `received: ${typeOf(hoist)}`,
      );
    }

    if (typeof hoist !== "boolean") {
      return this.createReport(
        `expect: hoist parameter to be of boolean type\n`,
        `received: ${typeOf(hoist)}`,
      );
    }

    const oldRole = await this.cordeBot.findRole(roleIdentifier);
    const invalidRoleErrorMessage = roleUtils.validateRole(oldRole, roleIdentifier);

    if (invalidRoleErrorMessage) {
      return { pass: false, message: invalidRoleErrorMessage };
    }

    await this.cordeBot.sendTextMessage(this.command);
    let role: Role;
    try {
      role = await this.cordeBot.events.onceRoleHoistUpdate(roleIdentifier, this.timeOut);
    } catch {
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
