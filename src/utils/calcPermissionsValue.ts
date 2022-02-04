import { Permission } from "..";

/**
 * Convert a list of permissions into an integer value.
 * @param permissions Permissions to be converted
 */
export function calcPermissionsValue(...permissions: Permission[]): number | undefined {
  if (permissions.length === 0) {
    return undefined;
  }
  // tslint:disable-next-line: no-bitwise
  return permissions.reduce((p1, p2) => p1 | p2) as number;
}
