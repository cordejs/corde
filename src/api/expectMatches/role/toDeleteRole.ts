import { CordeBot } from "../../../core";
import { TestReport } from "../..";
import { RoleData } from "../../../types";
import { Role } from "discord.js";

export async function toDeleteRole(
  commandName: string,
  isNot: boolean,
  cordeBot: CordeBot,
  roleData: RoleData,
): Promise<TestReport> {
  let isEqual = false;
  let output = "";
  try {
    let role = await cordeBot.findRole(roleData);
    if (!role) {
      isEqual = false;
      output = "No role found";
    } else {
      await cordeBot.sendTextMessage(commandName);
      const promiseRole = new Promise<Role>(async (resolve) => {
        setTimeout(async () => {
          role = await cordeBot.fetchRole(role.id);
          resolve(role);
        }, 600);
      });

      role = await promiseRole;
      if (!role) {
        isEqual = true;
      }

      if (isNot) {
        isEqual = !isEqual;
      }
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
    expectation: "",
    hasPassed: isEqual,
    isNot,
    output,
    showExpectAndOutputValue: false,
  });
}
