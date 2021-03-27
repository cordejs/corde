import { Role } from "discord.js";
import { RoleIdentifier, TestReport } from "../../../types";
import { typeOf } from "../../../utils";
import { roleUtils } from "../../roleUtils";
import { ExpectTest } from "../expectTest";

/**
 * @internal
 */
export class ToSetRoleMentionable extends ExpectTest {
  async action(mentionable: boolean, roleIdentifier: string | RoleIdentifier): Promise<TestReport> {
    const identifier = roleUtils.getRoleData(roleIdentifier);
    const error = roleUtils.getErrorForUndefinedRoleData(identifier);

    if (error) {
      return { pass: false, message: error };
    }

    if (mentionable == undefined) {
      return this.createReport(
        `expected: mentionable option to be true or false\n`,
        `received: ${typeOf(mentionable)}`,
      );
    }

    if (typeof mentionable !== "boolean") {
      return this.createReport(
        `expected: mentionable parameter to be of boolean type\n`,
        `received: ${typeOf(mentionable)}`,
      );
    }

    const oldRole = await this.cordeBot.findRole(identifier);
    const invalidRoleErrorMessage = roleUtils.validateRole(oldRole, identifier);

    if (invalidRoleErrorMessage) {
      return { pass: false, message: invalidRoleErrorMessage };
    }

    await this.cordeBot.sendTextMessage(this.command);
    let role: Role;
    try {
      role = await this.cordeBot.events.onceRoleMentionableUpdate(identifier, this.timeOut);
    } catch {
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
