import { RoleIdentifier, TestReport } from "../../../types";
import { wait } from "../../../utils";
import { ExpectOperation } from "../operation";

export class ToSetRolePosition extends ExpectOperation<number, RoleIdentifier> {
  public async action(newPosition: number, roleIdentifier: RoleIdentifier): Promise<TestReport> {
    let role = await this.cordeBot.findRole(roleIdentifier);
    const lastRole = this.cordeBot
      .getRoles()
      .sort((r1, r2) => r2.position - r1.position)
      .first();

    if (!role || !lastRole) {
      this.hasPassed = false;
      return this.createReport("Role not found");
    } else if (newPosition > lastRole.position) {
      return this.createReport(
        `the maximum position possible is ${lastRole.position}. Attempted value: ${newPosition}`,
      );
    } else {
      await this.cordeBot.sendTextMessage(this.command);
      // TODO: Fix this required wait to avoid inconsistence
      await wait(400);
      role = await this.cordeBot.findRole(roleIdentifier);
      if (role.position === newPosition) {
        this.hasPassed = true;
      } else {
        return this.createReport(
          `expected position: ${newPosition}, actual position: ${role.position}`,
        );
      }
    }

    this.invertHasPassedIfIsNot();
    return this.createReport();
  }
}
