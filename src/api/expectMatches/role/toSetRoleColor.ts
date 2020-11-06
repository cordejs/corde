import { CordeBot } from "../../../core";
import { TestReport } from "../..";
import { ColorResolvable, Role } from "discord.js";
import { RoleData } from "../../../types";
import { Colors, resolveColor } from "../../../utils/colors";

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

    const role = await new Promise<Role>((resolve) => {
      setTimeout(async () => {
        const _role = await cordeBot.findRole(roleData);
        resolve(_role);
      }, 500);
    });
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

  return new TestReport({
    commandName,
    expectation: color.toString(),
    hasPassed: isEqual,
    isNot,
    output,
    showExpectAndOutputValue: false,
  });
}
