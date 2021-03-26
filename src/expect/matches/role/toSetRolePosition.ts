import { RoleIdentifier, TestReport } from "../../../types";
import { typeOf } from "../../../utils";
import { roleUtils } from "../../roleUtils";
import { ExpectTest } from "../expectTest";

/**
 * @internal
 */
export class ToSetRolePosition extends ExpectTest {
  public async action(
    newPosition: number,
    roleIdentifier: string | RoleIdentifier,
  ): Promise<TestReport> {
    const identifier = roleUtils.getRoleData(roleIdentifier);
    const error = roleUtils.getErrorForUndefinedRoleData(identifier);

    if (error) {
      return { pass: false, message: error };
    }

    if (typeof newPosition !== "number") {
      return this.createReport(
        `expected: position option to be a number\n`,
        `received: ${typeOf(newPosition)}`,
      );
    }

    const oldRole = await this.cordeBot.findRole(identifier);
    const invalidRoleErrorMessage = roleUtils.validateRole(oldRole, identifier);

    if (invalidRoleErrorMessage) {
      return { pass: false, message: invalidRoleErrorMessage };
    }

    let role = await this.cordeBot.findRole(identifier);
    const lastRole = this.cordeBot
      .getRoles()
      .sort((r1, r2) => r2.position - r1.position)
      .first();

    if (newPosition > lastRole.position) {
      return this.createReport(
        `expected: position to be >= 0 and <= ${lastRole.position} (max value possible)\n`,
        `received: ${newPosition}`,
      );
    }

    await this.cordeBot.sendTextMessage(this.command);

    try {
      role = await this.cordeBot.events.onceRolePositionUpdate(identifier, this.timeOut);
    } catch {
      if (this.isNot) {
        return { pass: true };
      }

      return this.createReport(
        `expected: role position to change to ${newPosition}\n`,
        `received: position didn't change`,
      );
    }

    if (role.position === newPosition) {
      this.hasPassed = true;
    }

    this.invertHasPassedIfIsNot();

    if (this.hasPassed) {
      return { pass: true };
    }

    return this.createReport(
      `expected: role position to change to ${newPosition}`,
      `received: ${role.position}`,
    );
  }
}
