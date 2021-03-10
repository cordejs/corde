import { RoleData, TestReport } from "../../../types";
import { wait } from "../../../utils";
import { ExpectOperation } from "../operation";

export class ToSetRoleMentionable extends ExpectOperation<boolean, RoleData> {
  public async action(mentionable: boolean, roleData: RoleData): Promise<TestReport> {
    await this.cordeBot.sendTextMessage(this.command);
    await wait(400);
    const role = await this.cordeBot.findRole(roleData);
    if (role.mentionable === mentionable) {
      this.hasPassed = true;
    }
    this.invertHasPassedIfIsNot();

    return this.createReport();
  }
}
