import { CordeBot } from "../../../core";
import { TestReport } from "../..";
import { RoleData } from "../../../types";
import Utils from "../../../utils/utils";

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
      await Utils.wait(Utils.delayValue);
      role = await cordeBot.fetchRole(role.id);
      if (!role || role.deleted) {
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
