import chalk from "chalk";
import { ColorResolvable, Role } from "discord.js";
import { RoleUpdateColor } from "../../../core/event";
import { resolveColor } from "../../../utils/colors";
import { rgba } from "../../../utils/rgba";
import { typeOf } from "../../../utils/typeOf";
import { roleUtils } from "../../roleUtils";
import { CommandState } from "../CommandState";

/**
 * Function to be injected globally.
 * **Do not use it directly**.
 *
 * @internal
 */
export async function setRoleColor(
  this: CommandState,
  color: ColorResolvable,
  roleIdentifier: string | corde.IRoleIdentifier,
) {
  const identifier = roleUtils.getRoleData(roleIdentifier);
  const error = roleUtils.getErrorForUndefinedRoleData(identifier);

  if (error) {
    return this.createFailedTest(error);
  }

  if (!color) {
    return this.createReport(`toSetRoleColor: invalid color informed - '${typeOf(color)}'`);
  }

  const oldRole = await this.cordeBot.findRole(identifier);

  if (!oldRole) {
    return this.createFailedTest(roleUtils.validateRole(oldRole, identifier));
  }

  const numberColor = resolveColor(color);

  const event = this.getEvent(RoleUpdateColor);

  if (!event.canListen()) {
    return this.createMissingIntentError(
      "Client has no intent to listen to color changes in roles",
      event.getIntents(),
    );
  }

  try {
    await this.sendCommandMessage();
  } catch (error) {
    return this.createFailedTest(error.message);
  }

  let role: Role;

  try {
    role = await event.once({
      ...identifier,
      timeout: this.timeout,
      guild: { id: this.guildId },
    });
  } catch {
    if (this.isNot) {
      return this.createPassTest();
    }

    const resolvedExpectedColor = resolveColor(oldRole.color);
    const fromLabelColor = createChalkLabelFromColor(resolvedExpectedColor);
    const toLabelColor = createChalkLabelFromColor(numberColor);
    return this.createReport(
      `expected: change role color from ${fromLabelColor(resolvedExpectedColor)} to ${toLabelColor(
        numberColor,
      )}\n`,
      "received: the color was not changed",
    );
  }

  if (role.color === numberColor) {
    this.hasPassed = true;
  }

  this.invertHasPassedIfIsNot();

  if (this.hasPassed) {
    return this.createPassTest();
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

function createChalkLabelFromColor(color: number) {
  const [r, g, b] = rgba(color);
  return chalk.rgb(r, g, b);
}
