import { RoleIdentifier, TestReport } from "../../../types";
import { calcPermissionsValue, Permission, RolePermission } from "../../../utils";
import { ExpectOperation } from "../operation";

export class ToSetRolePermission extends ExpectOperation<RolePermission[], RoleIdentifier> {
  public async action(
    permissions: RolePermission[],
    roleIdentifier: RoleIdentifier,
  ): Promise<TestReport> {
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
