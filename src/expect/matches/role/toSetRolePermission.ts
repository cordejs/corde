import { RoleData, TestReport } from "../../../types";
import { calcPermissionsValue, Permission, RolePermission } from "../../../utils";
import { ExpectOperation } from "../operation";

export class ToSetRolePermission extends ExpectOperation<RolePermission[], RoleData> {
  public async action(permissions: RolePermission[], roleData: RoleData): Promise<TestReport> {
    if (!this.cordeBot.hasRole(roleData)) {
      return this.setDataForNotFoundRoleAndGenerateReport();
    }

    this.cordeBot.sendTextMessage(this.command);
    const role = await this.cordeBot.events.onceRolePermissionUpdate(roleData);

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
