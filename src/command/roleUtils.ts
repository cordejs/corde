import { Role } from "discord.js";
import { formatObject } from "../utils/formatObject";

export namespace roleUtils {
  export function createExpectedMessageForRoleData(roleIdentifier: corde.IRoleIdentifier) {
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

  export function getErrorForUndefinedRoleData(roleIdentifier: corde.IRoleIdentifier) {
    if (!roleIdentifier) {
      return "expected: data to identifier the role (id or name)\n" + "received: null";
    }

    return null;
  }

  export function validateRole(
    role: Role | undefined,
    roleIdentifier: corde.IRoleIdentifier,
  ): string | undefined {
    if (!role) {
      const message = roleUtils.createExpectedMessageForRoleData(roleIdentifier);

      if (message) {
        return `expected: ${message}\n` + "received: null";
      }

      return (
        "expected: a id or a name to identify the role\n" +
        `received: ${formatObject(roleIdentifier)}`
      );
    }

    return undefined;
  }

  export function getRoleData(roleIdentifier: string | corde.IRoleIdentifier) {
    let data: corde.IRoleIdentifier;
    if (typeof roleIdentifier === "string") {
      data = { id: roleIdentifier };
    } else {
      data = roleIdentifier as corde.IRoleIdentifier;
    }
    return data;
  }
}
