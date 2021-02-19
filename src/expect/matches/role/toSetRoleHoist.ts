import { ExpectOperation } from "../operation";
import { RoleData } from "discord.js";
import { TestReport } from "../../../types";

export class ToSetRoleHoist extends ExpectOperation<boolean, RoleData> {
  public async action(hoist: boolean, roleData: RoleData): Promise<TestReport> {
    try {
      this.cordeBot.sendTextMessage(this.command);
      await this.cordeBot.onceRoleUpdate();
      const role = await this.cordeBot.findRole(roleData);
      if (role.hoist === hoist) {
        this.hasPassed = true;
      }
      this.invertHasPassedIfIsNot();
    } catch (error) {
      this.catchExecutionError(error);
    }

    return this.generateReport();
  }
}
