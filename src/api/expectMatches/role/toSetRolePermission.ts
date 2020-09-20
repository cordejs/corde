import { ExpectOperation } from "../operation";
import { TestReport } from "../..";
import { RoleData } from "../../../types";
import { calcPermissionsValue, Permission } from "../../../utils/permission";

export class ToSetRolePermission extends ExpectOperation<Permission[], RoleData> {
  public async action(permissions: Permission[], roleData: RoleData): Promise<TestReport> {
    try {
      if (this.cordeBot.hasRole(roleData)) {
        await this.cordeBot.sendTextMessage(this.command);
        const role = await this.cordeBot.findRole(roleData);
        if (role) {
          const expectedPermissionsValue = calcPermissionsValue(...permissions);
          const permissionsRole = role.permissions
            .toArray()
            .map((p) => this.resolvePermissionString(p));

          const permissionsValue = calcPermissionsValue(...permissionsRole);
          if (permissionsValue === expectedPermissionsValue) {
            this.isEqual = true;
          }
        } else {
          this.setDataForNotFoundRole();
        }
      } else {
        this.setDataForNotFoundRole();
      }
    } catch (error) {
      this.catchExecutionError(error);
    }

    return this.generateReport();
  }

  private setDataForNotFoundRole() {
    this.isEqual = false;
    this.forceIsEqualValue = true;
    this.output = "Role not found";
  }

  private resolvePermissionString(permission: string) {
    return Permission[permission as keyof typeof Permission];
  }
}
