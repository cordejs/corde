import { ExpectOperation } from "../operation";
import { RoleData } from "discord.js";
import { TestReport } from "../..";

export class ToSetRolePosition extends ExpectOperation<number, RoleData> {
  public async action(newPosition: number, roleData: RoleData): Promise<TestReport> {
    try {
      let role = await this.cordeBot.findRole(roleData);
      const lastRole = this.cordeBot
        .getRoles()
        .sort((r1, r2) => r2.position - r1.position)
        .first();

      if (!role) {
        this.isEqual = false;
        this.forceIsEqualValue = true;
        this.output = "No role found";
      } else if (newPosition > lastRole.position) {
        this.customReturnMessage = `the maximum position possible is ${lastRole.position}. Attempted value: ${newPosition}`;
      } else {
        await this.cordeBot.sendTextMessage(this.command);
        role = await this.cordeBot.findRole(roleData);
        if (role.position === newPosition) {
          this.isEqual = true;
        } else {
          this.customReturnMessage = `expected position: ${newPosition}, actual position: ${role.position}`;
        }
      }
    } catch (error) {
      this.catchExecutionError(error);
    }

    return this.generateReport();
  }
}
