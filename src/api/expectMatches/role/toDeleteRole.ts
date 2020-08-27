import { CordeBot } from "../../../core";
import { TestReport } from "../..";
import { RoleData } from "../../../types";

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
      // It must to fetch the role based on it's id
      // If make just fetch() the deleted role will still be there
      // and deleted property will be false.
      // fetch the role using the id is a workaround for it.
      role = await cordeBot.fetchRole(role.id);
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
