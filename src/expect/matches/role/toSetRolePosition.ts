import { RoleIdentifier, TestReport } from "../../../types";
import { roleUtils } from "../../roleUtils";
import { ExpectTest } from "../expectTest";

export class ToSetRolePosition extends ExpectTest {
  public async action(newPosition: number, roleIdentifier: RoleIdentifier): Promise<TestReport> {
    const error = roleUtils.getErrorForUndefinedRoleData(roleIdentifier);

    if (error) {
      return { pass: false, message: error };
    }

    if (typeof newPosition !== "number") {
      return this.createReport(
        `expected: position option to be a number\n`,
        `received: ${typeof newPosition}`,
      );
    }

    const oldRole = await this.cordeBot.findRole(roleIdentifier);
    const invalidRoleErrorMessage = roleUtils.validateRole(oldRole, roleIdentifier);

    if (invalidRoleErrorMessage) {
      return { pass: false, message: invalidRoleErrorMessage };
    }

    let role = await this.cordeBot.findRole(roleIdentifier);
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
      role = await this.cordeBot.events.onceRolePositionUpdate(roleIdentifier, this.timeOut);
    } catch (error) {
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
