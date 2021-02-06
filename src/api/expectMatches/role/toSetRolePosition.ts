import { ExpectOperation } from "../operation";
import { TestReport } from "../..";
import { RoleData } from "../../../types";
import Utils from "../../../utils/utils";

export class ToSetRolePosition extends ExpectOperation<number, RoleData> {
  public async action(newPosition: number, roleData: RoleData): Promise<TestReport> {
    try {
      let role = await this.cordeBot.findRole(roleData);
      const lastRole = this.cordeBot.getRoles().sort((r1, r2) => r2.position - r1.position)[0];

      if (!role) {
        this.isEqual = false;
        this.forceIsEqualValue = true;
        this.output = "Role not found";
      } else if (newPosition > lastRole.position) {
        this.forceIsEqualValue = true;
        this.customReturnMessage = `the maximum position possible is ${lastRole.position}. Attempted value: ${newPosition}`;
      } else {
        await this.cordeBot.sendTextMessage(this.command);
        // TODO: Fix this required wait to avoid inconsistence
        await Utils.wait(400);
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
