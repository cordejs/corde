import { Role } from "discord.js";
import { RoleData, TestReport } from "../../../types";
import { typeOf } from "../../../utils";
import { roleUtils } from "../../roleUtils";
import { ExpectOperation } from "../operation";

export class ToRenameRole extends ExpectOperation<string, RoleData> {
  public async action(newName: string, roleData: RoleData): Promise<TestReport> {
    const error = roleUtils.getErrorForUndefinedRoleData(roleData);

    if (error) {
      return { pass: false, message: error };
    }

    if (typeof newName !== "string" && typeof newName !== "number") {
      return this.createReport(
        `expected: parameter newName must be a string or a number\n`,
        `received: ${typeOf(newName)}`,
      );
    }

    if (typeof newName === "string" && newName.trim() == "") {
      return this.createReport(
        `expected: parameter newName must be a valid string\n`,
        `received: '${newName}'`,
      );
    }

    const oldRole = await this.cordeBot.findRole(roleData);

    const invalidRoleErrorMessage = roleUtils.validateRole(oldRole, roleData);

    if (invalidRoleErrorMessage) {
      return { pass: false, message: invalidRoleErrorMessage };
    }

    await this.cordeBot.sendTextMessage(this.command);

    let newRole: Role;
    try {
      newRole = await this.cordeBot.events.onceRoleRenamed(roleData, this.timeOut);
    } catch (error) {
      if (this.isNot) {
        return { pass: true };
      }

      return this.createReport(
        `expected: role '${oldRole.name}' to be renamed to ${newName}\n`,
        `received: name was not changed`,
      );
    }

    if (newRole.name === newName) {
      this.hasPassed = true;
    }

    this.invertHasPassedIfIsNot();

    if (this.hasPassed) {
      return { pass: true };
    }

    return this.createReport(
      `expected: role ${this.isNot ? "not " : ""}change name to '${newName}'\n`,
      `received: name was not changed (actual: '${newRole.name}')`,
    );
  }
}
