import { Role } from "discord.js";
import { RoleIdentifier } from "../types";
import { buildReportMessage, formatObject } from "../utils";

class RoleUtils {
  createExpectedMessageForRoleData(roleIdentifier: RoleIdentifier) {
    if (!roleIdentifier) {
      return null;
    }

    if (roleIdentifier.id && roleIdentifier.name) {
      return `role with id ${roleIdentifier.id} or name '${roleIdentifier.name}'`;
    }

    if (roleIdentifier?.id) {
      return `role with id ${roleIdentifier.id}`;
    }

    if (roleIdentifier?.name) {
      return `role with name '${roleIdentifier.name}'`;
    }

    return null;
  }

  getErrorForUndefinedRoleData(roleIdentifier: RoleIdentifier) {
    if (!roleIdentifier) {
      return buildReportMessage(
        "expected: data to identifier the role (id or name)\n",
        "received: null",
      );
    }

    return null;
  }

  validateRole(role: Role | undefined, roleIdentifier: RoleIdentifier): string | undefined {
    if (!role) {
      const message = roleUtils.createExpectedMessageForRoleData(roleIdentifier);

      if (message) {
        return buildReportMessage(`expected: ${message}\n`, "received: null");
      }

      return buildReportMessage(
        "expected: a id or a name to identify the role\n",
        `received: ${formatObject(roleIdentifier)}`,
      );
    }

    return undefined;
  }

  getRoleData(roleIdentifier: string | RoleIdentifier) {
    let data: RoleIdentifier;
    if (typeof roleIdentifier === "string") {
      data = { id: roleIdentifier };
    } else {
      data = roleIdentifier as RoleIdentifier;
    }
    return data;
  }
}

const roleUtils = new RoleUtils();
export { roleUtils };
