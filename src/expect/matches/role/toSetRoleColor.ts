import { ColorResolvable } from "../../../discordTypes";
import { RoleData, TestReport } from "../../../types";
import { Colors, resolveColor, wait } from "../../../utils";
import { ExpectOperation } from "../operation";

export class ToSetRoleColor extends ExpectOperation<ColorResolvable | Colors, RoleData> {
  public async action(color: ColorResolvable, roleData: RoleData): Promise<TestReport> {
    try {
      await this.cordeBot.sendTextMessage(this.command);

      await wait(600);
      const role = await this.cordeBot.findRole(roleData);

      const numberColor = resolveColor(color);
      if (numberColor > 0) {
        this.hasPassed = numberColor === role.color;
      }

      if (!role) {
        this.output = "Role not found";
      } else {
        this.output = role.color.toString();
      }

      if (role.color === color) {
        this.hasPassed = true;
      }

      this.invertHasPassedIfIsNot();
    } catch (error) {
      this.hasPassed = false;
      if (error instanceof Error) {
        this.output = error.message;
      } else {
        this.output = error;
      }
    }

    return this.generateReport();
  }
}
