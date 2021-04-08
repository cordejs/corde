import { Role } from "discord.js";
import { RoleIdentifier, TestReport } from "../../../types";
import { diff, permissionsArray, RolePermission, typeOf } from "../../../utils";
import { roleUtils } from "../../roleUtils";
import { ExpectTestBaseParams } from "../../../types";
import { ExpectTest } from "../expectTest";

/**
 * @internal
 */
export class ToSetRolePermission extends ExpectTest {
  constructor(params: ExpectTestBaseParams) {
    super({ ...params, testName: "toSetRolePermission" });
  }

  async action(
    roleIdentifier: string | RoleIdentifier,
    permissions: RolePermission[],
  ): Promise<TestReport> {
    const identifier = roleUtils.getRoleData(roleIdentifier);
    const error = roleUtils.getErrorForUndefinedRoleData(identifier);

    if (error) {
      return this.createFailedTest(error);
    }

    if (
      typeOf(permissions) !== "array" &&
      typeOf(permissions) !== "null" &&
      typeOf(permissions) !== "undefined"
    ) {
      return this.createReport(
        "expected: permissions to be null, undefined or an array\n",
        `received: ${typeOf(permissions)}`,
      );
    }

    if (permissions && !isPermissionsValid(permissions)) {
      return this.createReport(diff(permissionsArray, permissions));
    }

    const oldRole = await this.cordeBot.findRole(identifier);
    const invalidRoleErrorMessage = roleUtils.validateRole(oldRole, identifier);

    if (invalidRoleErrorMessage) {
      return this.createFailedTest(invalidRoleErrorMessage);
    }

    await this.sendCommandMessage();
    let role: Role;
    try {
      role = await this.cordeBot.events.onceRolePermissionUpdate(
        identifier,
        this.timeOut,
        this.guildId,
      );
    } catch {
      if (this.isNot) {
        return this.createPassTest();
      }

      return this.createReport(
        `expected: role permissions change to: ${getPermissionsString(permissions)}\n`,
        "received: permissions were not changed",
      );
    }

    if (role.permissions.equals(permissions ?? [])) {
      this.hasPassed = true;
    }

    this.invertHasPassedIfIsNot();

    if (this.hasPassed) {
      return this.createPassTest();
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
