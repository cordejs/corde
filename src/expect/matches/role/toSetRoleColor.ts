import { CordeBot } from "../../../core";
import { ColorResolvable } from "../../../discordTypes";
import { RoleData, TestReport } from "../../../types";
import { Colors, resolveColor, wait } from "../../../utils";

export async function toSetRoleColor(
  commandName: string,
  isNot: boolean,
  cordeBot: CordeBot,
  color: ColorResolvable | Colors,
  roleData: RoleData,
): Promise<TestReport> {
  let isEqual = false;
  let output = "";
  try {
    await cordeBot.sendTextMessage(commandName);

    await wait(600);
    const role = await cordeBot.findRole(roleData);

    const numberColor = resolveColor(color);
    if (numberColor > 0) {
      isEqual = numberColor === role.color;
    }

    if (!role) {
      output = "Role not found";
    } else {
      output = role.color.toString();
    }

    if (role.color === color) {
      isEqual = true;
    }

    if (isNot) {
      isEqual = !isEqual;
    }
  } catch (error) {
    isEqual = false;
    if (error instanceof Error) {
      output = error.message;
    } else {
      output = error;
    }
  }

  return {
    commandName,
    expectation: color.toString(),
    hasPassed: isEqual,
    isNot,
    output,
    showExpectAndOutputValue: false,
  };
}
