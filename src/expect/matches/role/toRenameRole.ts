import { RoleData, TestReport } from "../../../types";
import { wait } from "../../../utils";
import { ExpectOperation } from "../operation";

export class ToRenameRole extends ExpectOperation<string, RoleData> {
  public async action(newName: string, roleData: RoleData): Promise<TestReport> {
    try {
      let role = await this.cordeBot.findRole(roleData);
      if (!role) {
        this.isEqual = false;
        this.forceIsEqualValue = true;
        this.output = "No role found";
      } else {
        await this.cordeBot.sendTextMessage(this.command);
        await wait(600);
        role = await this.cordeBot.fetchRole(role.id);
        if (role.name === newName) {
          this.isEqual = true;
        }
      }
    } catch (error) {
      this.catchExecutionError(error);
    }

    return this.generateReport();
  }
}
