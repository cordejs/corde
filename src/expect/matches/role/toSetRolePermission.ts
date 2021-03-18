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
      return this.createReport(`expect: permissions to be null, undefined or an array`);
    }

    if (permissions && isPermissionsValid(permissions)) {
      return this.createReport(diff(permissionsArray, permissions));
    }

    if (typeof mentionable !== "boolean") {
      return this.createReport(
        `expect: mentionable parameter to be of boolean type\n`,
        `received: ${typeof mentionable}`,
      );
    }

    const oldRole = await this.cordeBot.findRole(roleIdentifier);
    const invalidRoleErrorMessage = roleUtils.validateRole(oldRole, roleIdentifier);

    if (invalidRoleErrorMessage) {
      return { pass: false, message: invalidRoleErrorMessage };
    }

    if (!this.cordeBot.hasRole(roleIdentifier)) {
      return this.setDataForNotFoundRoleAndGenerateReport();
    }

    this.cordeBot.sendTextMessage(this.command);
    const role = await this.cordeBot.events.onceRolePermissionUpdate(roleIdentifier);

    if (!role) {
      return this.setDataForNotFoundRoleAndGenerateReport();
    }

    const valuePermissions = permissions.map((p) => Permission[p]);
    const expectedPermissionsValue = calcPermissionsValue(...valuePermissions);
    if (role.permissions.bitfield === expectedPermissionsValue) {
      this.hasPassed = true;
    }
    this.invertHasPassedIfIsNot();
    return this.createReport();
  }

  private setDataForNotFoundRoleAndGenerateReport() {
    return this.createReport("Role not found");
  }
}

function isPermissionsValid(permissions: RolePermission[]) {
  for (let i = 0; i < permissions.length; i++) {
    if (!permissionsArray.includes(permissions[i])) {
      return false;
    }
  }

  return true;
}
