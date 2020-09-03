import { ExpectOperation } from "../operation";
import { RoleData } from "discord.js";
import { TestReport } from "../..";

export class ToSetHoist extends ExpectOperation<boolean, RoleData> {
  public async action(hoist: boolean, roleData: RoleData): Promise<TestReport> {
    try {
      await super.cordeBot.sendTextMessage(super.command);
      const role = await super.cordeBot.findRole(roleData);
      if (role.hoist === hoist) {
        super.isEqual = true;
      }
    } catch (error) {
      super.catchExecutionError(error);
    }

    return super.generateReport();
  }
}
