import { ExpectOperation } from "../operation";
import { TestReport } from "../..";
import { RoleData } from "../../../types";
import { Role } from "discord.js";

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
        const promiseRole = new Promise<Role>(async (resolve) => {
          setTimeout(async () => {
            role = await this.cordeBot.fetchRole(role.id);
            resolve(role);
          }, 600);
        });

        role = await promiseRole;
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
