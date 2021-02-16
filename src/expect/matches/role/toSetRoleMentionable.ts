import { RoleData, TestReport } from "../../../types";
import { wait } from "../../../utils";
import { ExpectOperation } from "../operation";

export class ToSetRoleMentionable extends ExpectOperation<boolean, RoleData> {
  public async action(mentionable: boolean, roleData: RoleData): Promise<TestReport> {
    try {
      await this.cordeBot.sendTextMessage(this.command);
      // TODO: Fix this required wait to avoid inconsistence
      await wait(400);
      const role = await this.cordeBot.findRole(roleData);
      if (role.mentionable === mentionable) {
        this.isEqual = true;
      }
    } catch (error) {
      this.catchExecutionError(error);
    }

    return this.generateReport();
  }
}
