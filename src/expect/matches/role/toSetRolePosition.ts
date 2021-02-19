import { RoleData, TestReport } from "../../../types";
import { wait } from "../../../utils";
import { ExpectOperation } from "../operation";

export class ToSetRolePosition extends ExpectOperation<number, RoleData> {
  public async action(newPosition: number, roleData: RoleData): Promise<TestReport> {
    try {
      let role = await this.cordeBot.findRole(roleData);
      const lastRole = this.cordeBot
        .getRoles()
        .sort((r1, r2) => r2.position - r1.position)
        .first();

      if (!role || !lastRole) {
        this.hasPassed = false;
        this.output = "Role not found";
        return this.generateReport();
      } else if (newPosition > lastRole.position) {
        this.customReturnMessage = `the maximum position possible is ${lastRole.position}. Attempted value: ${newPosition}`;
        return this.generateReport();
      } else {
        await this.cordeBot.sendTextMessage(this.command);
        // TODO: Fix this required wait to avoid inconsistence
        await wait(400);
        role = await this.cordeBot.findRole(roleData);
        if (role.position === newPosition) {
          this.hasPassed = true;
        } else {
          this.customReturnMessage = `expected position: ${newPosition}, actual position: ${role.position}`;
        }
      }
    } catch (error) {
      this.catchExecutionError(error);
      return this.generateReport();
    }

    this.invertHasPassedIfIsNot();
    return this.generateReport();
  }
}
