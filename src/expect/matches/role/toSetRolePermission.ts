import { Role } from "discord.js";
import { RoleIdentifier, TestReport } from "../../../types";
import {
  calcPermissionsValue,
  diff,
  Permission,
  permissionsArray,
  RolePermission,
  typeOf,
} from "../../../utils";
import { roleUtils } from "../../roleUtils";
import { ExpectTest } from "../expectTest";

export class ToSetRolePermission extends ExpectTest {
  public async action(
    roleIdentifier: RoleIdentifier,
    permissions: RolePermission[],
  ): Promise<TestReport> {
    const error = roleUtils.getErrorForUndefinedRoleData(roleIdentifier);

    if (error) {
      return { pass: false, message: error };
    }

    if (
      typeOf(permissions) !== "array" &&
      typeOf(permissions) !== "null" &&
      typeOf(permissions) !== "undefined"
    ) {
      return this.createReport(
        `expected: permissions to be null, undefined or an array\n`,
        `received: ${typeof permissions}`,
      );
    }

    if (permissions && !isPermissionsValid(permissions)) {
      return this.createReport(diff(permissionsArray, permissions));
    }

    const oldRole = await this.cordeBot.findRole(roleIdentifier);
    const invalidRoleErrorMessage = roleUtils.validateRole(oldRole, roleIdentifier);

    if (invalidRoleErrorMessage) {
      return { pass: false, message: invalidRoleErrorMessage };
    }

    await this.cordeBot.sendTextMessage(this.command);
    let role: Role;
    try {
      role = await this.cordeBot.events.onceRolePermissionUpdate(roleIdentifier, this.timeOut);
    } catch (error) {
      if (this.isNot) {
        return { pass: true };
      }

      return this.createReport(
        `expected: role permissions change to: ${getPermissionsString(permissions)}\n`,
        `received: permissions were not changed`,
      );
    }

    if (role.permissions.equals(permissions)) {
      this.hasPassed = true;
    }

    this.invertHasPassedIfIsNot();

    if (this.hasPassed) {
      return { pass: true };
    }

    return this.createReport(
      `expected: role permissions ${this.isNot ? "not " : ""}change to: ${getPermissionsString(
        permissions,
      )}\n`,
      `received: ${getPermissionsString(role.permissions.toArray())}`,
    );
  }
}

function getPermissionsString(permissions: RolePermission[]) {
  if (!permissions) {
    return null;
  }

  if (permissions.includes("ADMINISTRATOR")) {
    if (permissions.length === 1) {
      return "ADMINISTRATOR";
    }

    if (permissions.length > 2) {
      return `ADMINISTRATOR (and ${
        permissions.filter((p) => p !== "ADMINISTRATOR").length
      } others)`;
    }

    return `ADMINISTRATOR and ${permissions.filter((p) => p !== "ADMINISTRATOR")}`;
  }

  return permissions.join(", ");
}

function isPermissionsValid(permissions: RolePermission[]) {
  for (let i = 0; i < permissions.length; i++) {
    if (!permissionsArray.includes(permissions[i])) {
      return false;
    }
  }

  return true;
}
