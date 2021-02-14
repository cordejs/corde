import { ExpectOperation } from "../operation";
import { TestReport } from "../..";
import { RoleData } from "../../../types";
import { calcPermissionsValue, Permission, RolePermission } from "../../../utils/permission";

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
        this.isEqual = true;
      }
    } catch (error) {
      this.catchExecutionError(error);
    }

    return this.generateReport();
  }

  private setDataForNotFoundRoleAndGenerateReport() {
    this.isEqual = false;
    this.forceIsEqualValue = true;
    this.output = "Role not found";
    return this.generateReport();
  }
}
