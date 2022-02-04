import { Permission } from "../../src";
import { calcPermissionsValue } from "../../src/utils/calcPermissionsValue";

describe("testing permission conversion", () => {
  it("should get value from permission", () => {
    expect(calcPermissionsValue(Permission.ADD_REACTIONS, Permission.BAN_MEMBERS)).toEqual(
      // tslint:disable-next-line: no-bitwise
      Permission.ADD_REACTIONS | Permission.BAN_MEMBERS,
    );
  });

  it("should return 0 due to no permission", () => {
    expect(calcPermissionsValue()).toEqual(undefined);
  });
});
