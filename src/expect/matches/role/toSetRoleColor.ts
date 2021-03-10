import { ColorResolvable } from "../../../discordTypes";
import { RoleData, TestReport } from "../../../types";
import { Colors, resolveColor, wait } from "../../../utils";
import { ExpectOperation } from "../operation";

export class ToSetRoleColor extends ExpectOperation<ColorResolvable | Colors, RoleData> {
  public async action(color: ColorResolvable, roleData: RoleData): Promise<TestReport> {
    await this.cordeBot.sendTextMessage(this.command);

    await wait(600);
    const role = await this.cordeBot.findRole(roleData);

    const numberColor = resolveColor(color);
    if (numberColor > 0) {
      this.hasPassed = numberColor === role.color;
    }

    if (!role) {
      return this.createReport("Role not found");
    }

    if (role.color === color) {
      this.hasPassed = true;
    }

    this.invertHasPassedIfIsNot();

    return this.createReport(role.color.toString());
  }
}
