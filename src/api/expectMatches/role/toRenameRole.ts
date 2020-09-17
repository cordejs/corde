import { ExpectOperation } from "../operation";
import { TestReport } from "../..";
import { RoleData } from "../../../types";

export default class ToRenameRole extends ExpectOperation<string, RoleData> {
  public async action(newName: string, roleData: RoleData): Promise<TestReport> {
    try {
      let role = await this.cordeBot.findRole(roleData);
      if (!role) {
        this.isEqual = false;
        this.forceIsEqualValue = true;
        this.output = "No role found";
      } else {
        await this.cordeBot.sendTextMessage(this.command);
        role = await this.cordeBot.findRole(roleData);
        if (role.name === newName) {
          super.isEqual = true;
        }
      }
    } catch (error) {
      this.catchExecutionError(error);
    }

    return this.generateReport();
  }
}
