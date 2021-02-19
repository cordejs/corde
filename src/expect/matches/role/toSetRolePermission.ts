import { RoleData, TestReport } from "../../../types";
import { calcPermissionsValue, Permission, RolePermission } from "../../../utils";
import { ExpectOperation } from "../operation";

export class ToSetRolePermission extends ExpectOperation<RolePermission[], RoleData> {
  public async action(permissions: RolePermission[], roleData: RoleData): Promise<TestReport> {
    try {
      if (!this.cordeBot.hasRole(roleData)) {
        return this.setDataForNotFoundRoleAndGenerateReport();
      }

      this.cordeBot.sendTextMessage(this.command);
      const role = await this.cordeBot.waitRolePermissionUpdate(roleData);

      if (!role) {
        return this.setDataForNotFoundRoleAndGenerateReport();
      }

      const valuePermissions = permissions.map((p) => Permission[p]);
      const expectedPermissionsValue = calcPermissionsValue(...valuePermissions);
      if (role.permissions.bitfield === expectedPermissionsValue) {
        this.hasPassed = true;
      }
    } catch (error) {
      this.catchExecutionError(error);
      return this.generateReport();
    }

    this.invertHasPassedIfIsNot();
    return this.generateReport();
  }

  private setDataForNotFoundRoleAndGenerateReport() {
    this.hasPassed = false;
    this.output = "Role not found";
    return this.generateReport();
  }
}
