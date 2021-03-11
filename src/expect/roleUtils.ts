import { Role } from "discord.js";
import { CordeBot } from "../core";
import { RoleData } from "../types";
import { buildReportMessage, formatObject } from "../utils";

class RoleUtils {
  public createExpectedMessageForRoleData(roleData: RoleData) {
    if (!roleData) {
      return null;
    }

    if (roleData.id && roleData.name) {
      return `role with id ${roleData.id} or name '${roleData.name}'`;
    }

    if (roleData?.id) {
      return `role with id ${roleData.id}`;
    }

    if (roleData?.name) {
      return `role with name '${roleData.name}'`;
    }

    return null;
  }

  public getErrorForUndefinedRoleData(roleData: RoleData) {
    if (roleData == undefined) {
      return buildReportMessage(
        "expected: data to identifier the role (id or name)\n",
        `received: null`,
      );
    }

    return null;
  }

  public validateRole(role: Role, roleData: RoleData): string | null {
    if (!role) {
      const message = roleUtils.createExpectedMessageForRoleData(roleData);

      if (message) {
        return buildReportMessage(`expected: ${message}\n`, `received: null`);
      }

      return buildReportMessage(
        `expected: a id or a name to identify the role\n`,
        `received: ${formatObject(roleData)}`,
      );
    }

    return null;
  }
}

const roleUtils = new RoleUtils();
export { roleUtils };
