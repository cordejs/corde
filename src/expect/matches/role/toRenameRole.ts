import { Role } from "discord.js";
import { RoleIdentifier, TestReport } from "../../../types";
import { typeOf } from "../../../utils";
import { roleUtils } from "../../roleUtils";
import { ExpectTest } from "../expectTest";

/**
 * @internal
 */
export class ToRenameRole extends ExpectTest {
  public async action(
    newName: string,
    roleIdentifier: RoleIdentifier | string,
  ): Promise<TestReport> {
    const identifier = roleUtils.getRoleData(roleIdentifier);
    const error = roleUtils.getErrorForUndefinedRoleData(identifier);

    if (error) {
      return { pass: false, message: error };
    }

    if (typeof newName !== "string" && typeof newName !== "number") {
      return this.createReport(
        `expected: parameter newName must be a string or a number\n`,
        `received: ${typeOf(newName)}`,
      );
    }

    if (typeof newName === "string" && newName.trim() === "") {
      return this.createReport(
        `expected: parameter newName must be a valid string\n`,
        `received: '${newName}'`,
      );
    }

    const oldRole = await this.cordeBot.findRole(identifier);

    const invalidRoleErrorMessage = roleUtils.validateRole(oldRole, identifier);

    if (invalidRoleErrorMessage) {
      return { pass: false, message: invalidRoleErrorMessage };
    }

    await this.cordeBot.sendTextMessage(this.command);

    let newRole: Role;
    try {
      newRole = await this.cordeBot.events.onceRoleRenamed(identifier, this.timeOut);
    } catch {
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
