import { Role } from "discord.js";
import { IRoleIdentifier } from "../types";
import { formatObject } from "../utils";

export namespace roleUtils {
  export function createExpectedMessageForRoleData(roleIdentifier: IRoleIdentifier) {
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

  export function getErrorForUndefinedRoleData(roleIdentifier: IRoleIdentifier) {
    if (!roleIdentifier) {
      return "expected: data to identifier the role (id or name)\n" + "received: null";
    }

    return null;
  }

  export function validateRole(
    role: Role | undefined,
    roleIdentifier: IRoleIdentifier,
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

  export function getRoleData(roleIdentifier: string | IRoleIdentifier) {
    let data: IRoleIdentifier;
    if (typeof roleIdentifier === "string") {
      data = { id: roleIdentifier };
    } else {
      data = roleIdentifier as IRoleIdentifier;
    }
    return data;
  }
}
