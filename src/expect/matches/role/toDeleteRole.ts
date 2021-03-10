import { RoleData, TestReport } from "../../../types/types";
import { roleUtils } from "../../roleUtils";
import { ExpectOperation } from "../operation";

export class ToDeleteRole extends ExpectOperation<RoleData> {
  public async action(roleData: RoleData): Promise<TestReport> {
    if (!roleData) {
      return this.createReport(
        "expected: data to identifier the role (id or name)",
        `received: ${roleData}`,
      );
    }

    let role = await this.cordeBot.findRole(roleData);

    if (!role) {
      const message = roleUtils.createExpectedMessageForMessageData(roleData);
      return this.createReport(`expected: ${message}`, `received: ${role}`);
    }

    if (role.deleted) {
      return this.createReport(
        "expected: a role not deleted",
        `received: the role with id: ${role.id} and name ${role.name} is already deleted`,
      );
    }

    await this.cordeBot.sendTextMessage(this.command);
    await this.cordeBot.events.onceRoleDelete();
    const deletedRole = await this.cordeBot.fetchRole(role.id);

    if (!deletedRole || deletedRole.deleted) {
      this.hasPassed = true;
    }

    this.invertHasPassedIfIsNot();

    if (this.hasPassed) {
      return { pass: true };
    }

    return this.createReport(`expected: role ${role.id} to ${this.isNot ? "not" : ""} be deleted.`);
  }
}
