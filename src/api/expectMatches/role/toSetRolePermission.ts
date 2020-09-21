import { ExpectOperation } from "../operation";
import { TestReport } from "../..";
import { RoleData } from "../../../types";
import { calcPermissionsValue, Permission } from "../../../utils/permission";

export class ToSetRolePermission extends ExpectOperation<Permission[], RoleData> {
  public async action(permissions: Permission[], roleData: RoleData): Promise<TestReport> {
    try {
      if (!this.cordeBot.hasRole(roleData)) {
        return this.setDataForNotFoundRoleAndGenerateReport();
      }

      await this.cordeBot.sendTextMessage(this.command);
      const role = await this.cordeBot.findRole(roleData);

      if (!role) {
        return this.setDataForNotFoundRoleAndGenerateReport();
      }

      const expectedPermissionsValue = calcPermissionsValue(...permissions);
      const permissionsRole = role.permissions
        .toArray()
        .map((p) => this.resolvePermissionString(p));

      const permissionsValue = calcPermissionsValue(...permissionsRole);
      if (permissionsValue === expectedPermissionsValue) {
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

  private resolvePermissionString(permission: string) {
    return Permission[permission as keyof typeof Permission];
  }
}
