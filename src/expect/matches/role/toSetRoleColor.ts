import chalk, { rgb } from "chalk";
import { Role } from "discord.js";
import { ColorResolvable } from "../../../discordTypes";
import { RoleIdentifier, TestReport } from "../../../types";
import { Colors, resolveColor, rgba, typeOf } from "../../../utils";
import { roleUtils } from "../../roleUtils";
import { ExpectTest } from "../expectTest";

export class ToSetRoleColor extends ExpectTest {
  public async action(color: ColorResolvable, roleIdentifier: RoleIdentifier): Promise<TestReport> {
    const error = roleUtils.getErrorForUndefinedRoleData(roleIdentifier);

    if (error) {
      return { pass: false, message: error };
    }

    if (!color) {
      return this.createReport(`toSetRoleColor: invalid color informed - '${typeOf(color)}'`);
    }

    const oldRole = await this.cordeBot.findRole(roleIdentifier);
    const invalidRoleErrorMessage = roleUtils.validateRole(oldRole, roleIdentifier);

    if (invalidRoleErrorMessage) {
      return { pass: false, message: invalidRoleErrorMessage };
    }

    const numberColor = resolveColor(color);

    await this.cordeBot.sendTextMessage(this.command);
    let role: Role;

    try {
      role = await this.cordeBot.events.onceRoleUpdateColor(roleIdentifier, this.timeOut);
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
