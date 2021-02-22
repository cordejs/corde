import { RoleData, TestReport } from "../../../types/types";
import { ExpectOperation } from "../operation";

export class ToDeleteRole extends ExpectOperation<RoleData> {
  public async action(roleData: RoleData): Promise<TestReport> {
    try {
      let role = await this.cordeBot.findRole(roleData);
      if (!role) {
        this.output = "No role found";
        return this.generateReport();
      } else {
        await this.cordeBot.sendTextMessage(this.command);
        await this.cordeBot.events.onceRoleDelete();
        role = await this.cordeBot.fetchRole(role.id);
        if (!role || role.deleted) {
          this.hasPassed = true;
        }

        this.invertHasPassedIfIsNot();
      }
    } catch (error) {
      this.hasPassed = false;
      if (error instanceof Error) {
        this.output = error.message;
      } else {
        this.output = error;
      }
    }

    return this.generateReport();
  }
}
