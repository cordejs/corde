import chalk, { rgb } from "chalk";
import { Role } from "discord.js";
import { ColorResolvable } from "../../../discordTypes";
import { RoleData, TestReport } from "../../../types";
import { Colors, resolveColor, rgba, typeOf } from "../../../utils";
import { roleUtils } from "../../roleUtils";
import { ExpectOperation } from "../operation";

export class ToSetRoleColor extends ExpectOperation<ColorResolvable | Colors, RoleData> {
  public async action(color: ColorResolvable, roleData: RoleData): Promise<TestReport> {
    const error = roleUtils.getErrorForUndefinedRoleData(roleData);

    if (error) {
      return { pass: false, message: error };
    }

    if (!color) {
      return this.createReport(`toSetRoleColor: invalid color informed - '${typeOf(color)}'`);
    }

    const oldRole = await this.cordeBot.findRole(roleData);
    const invalidRoleErrorMessage = roleUtils.validateRole(oldRole, roleData);

    if (invalidRoleErrorMessage) {
      return { pass: false, message: invalidRoleErrorMessage };
    }

    const numberColor = resolveColor(color);

    await this.cordeBot.sendTextMessage(this.command);
    let role: Role;

    try {
      role = await this.cordeBot.events.onceRoleUpdateColor(roleData, this.timeOut);
    } catch (error) {
      if (this.isNot) {
        return { pass: true };
      }

      const resolvedExpectedColor = resolveColor(oldRole.color);
      const fromLabel = createChalkLabelFromColor(resolvedExpectedColor);
      const toLabel = createChalkLabelFromColor(numberColor);
      return this.createReport(
        `expected: change role color from ${fromLabel(resolvedExpectedColor)} to ${toLabel(
          numberColor,
        )}\n`,
        `received: the color was not changed`,
      );
    }

    if (role.color === numberColor) {
      this.hasPassed = true;
    }

    this.invertHasPassedIfIsNot();

    if (this.hasPassed) {
      return { pass: true };
    }

    const fromLabel = createChalkLabelFromColor(oldRole.color);
    const toLabel = createChalkLabelFromColor(numberColor);
    return this.createReport(
      `expected: ${this.isNot ? "not " : ""}change role color from ${fromLabel(
        oldRole.color,
      )} to ${toLabel(numberColor)}\n`,
      `received: ${role.color}`,
    );
  }
}

function createChalkLabelFromColor(color: number) {
  const [r, g, b] = rgba(color);
  return chalk.rgb(r, g, b);
}
