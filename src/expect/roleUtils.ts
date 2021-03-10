import { RoleData } from "../types";

class RoleUtils {
  public createExpectedMessageForMessageData(msgData: RoleData): string {
    if (msgData?.id && msgData?.name) {
      return `role with id ${msgData?.id} or content '${msgData?.name}'.`;
    }

    if (msgData?.id) {
      return `Message with id ${msgData?.id} not found.`;
    }

    if (msgData?.name) {
      return `Message with content '${msgData?.name}' not found.`;
    }

    return "No data was provided for identify the role.";
  }
}

const roleUtils = new RoleUtils();
export { roleUtils };
