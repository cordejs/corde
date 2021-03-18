import { Role } from "discord.js";
import { RoleData, TestReport } from "../../../types";
import { roleUtils } from "../../roleUtils";
import { ExpectOperation } from "../operation";

export class ToSetRoleMentionable extends ExpectOperation<boolean, RoleData> {
  public async action(mentionable: boolean, roleData: RoleData): Promise<TestReport> {
    const error = roleUtils.getErrorForUndefinedRoleData(roleData);

    if (error) {
      return { pass: false, message: error };
    }

    if (mentionable == undefined) {
      return this.createReport(
        `expected: mentionable option to be true or false\n`,
        `received: ${typeof mentionable}`,
      );
    }

    if (typeof mentionable !== "boolean") {
      return this.createReport(
        `expect: mentionable parameter to be of boolean type\n`,
        `received: ${typeof mentionable}`,
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
      role = await this.cordeBot.events.onceRoleMentionableUpdate(roleData, this.timeOut);
    } catch (error) {
      if (this.isNot) {
        return { pass: true };
      }

      return this.createReport(
        `expected: mentionable to be ${mentionable}\n`,
        `received: role mentionable was not updated`,
      );
    }
    if (role.mentionable === mentionable) {
      this.hasPassed = true;
    }

    this.invertHasPassedIfIsNot();

    if (this.hasPassed) {
      return { pass: true };
    }

    return this.createReport(
      `expected: mentionable to ${this.isNot ? "not " : ""}be ${mentionable}\n`,
      `received: ${role.mentionable}`,
    );
  }
}
