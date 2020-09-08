import { ExpectOperation } from "../operation";
import { RoleData } from "discord.js";
import { TestReport } from "../..";

export default class ToSetRoleMentionable extends ExpectOperation<boolean, RoleData> {
  public async action(mentionable: boolean, roleData: RoleData): Promise<TestReport> {
    try {
      await super.cordeBot.sendTextMessage(super.command);
      const role = await super.cordeBot.findRole(roleData);
      if (role.mentionable === mentionable) {
        super.isEqual = true;
      }
    } catch (error) {
      super.catchExecutionError(error);
    }

    return super.generateReport();
  }
}
