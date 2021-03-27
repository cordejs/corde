import chalk, { rgb } from "chalk";
import { Role } from "discord.js";
import { ColorResolvable } from "../../../discordTypes";
import { RoleIdentifier, TestReport } from "../../../types";
import { resolveColor, rgba, typeOf } from "../../../utils";
import { roleUtils } from "../../roleUtils";
import { ExpectTest } from "../expectTest";

/**
 * @internal
 */
export class ToSetRoleColor extends ExpectTest {
  async action(
    color: ColorResolvable,
    roleIdentifier: string | RoleIdentifier,
  ): Promise<TestReport> {
    const identifier = roleUtils.getRoleData(roleIdentifier);
    const error = roleUtils.getErrorForUndefinedRoleData(identifier);

    if (error) {
      return { pass: false, message: error };
    }

    if (!color) {
      return this.createReport(`toSetRoleColor: invalid color informed - '${typeOf(color)}'`);
    }

    const oldRole = await this.cordeBot.findRole(identifier);
    const invalidRoleErrorMessage = roleUtils.validateRole(oldRole, identifier);

    if (invalidRoleErrorMessage) {
      return { pass: false, message: invalidRoleErrorMessage };
    }

    const numberColor = resolveColor(color);

    await this.cordeBot.sendTextMessage(this.command);
    let role: Role;

    try {
      role = await this.cordeBot.events.onceRoleUpdateColor(identifier, this.timeOut);
    } catch {
      if (this.isNot) {
        return { pass: true };
      }

      const resolvedExpectedColor = resolveColor(oldRole.color);
      const fromLabelColor = createChalkLabelFromColor(resolvedExpectedColor);
      const toLabelColor = createChalkLabelFromColor(numberColor);
      return this.createReport(
        `expected: change role color from ${fromLabelColor(
          resolvedExpectedColor,
        )} to ${toLabelColor(numberColor)}\n`,
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
