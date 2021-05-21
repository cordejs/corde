import { roleUtils } from "../../src/expect/roleUtils";
import { buildReportMessage, formatObject } from "../../src/utils";
import MockDiscord from "../mocks/mockDiscord";

describe("testing createExpectedMessageForRoleData", () => {
  it("should get a error message for null roleIdentifier", () => {
    expect(roleUtils.createExpectedMessageForRoleData(null)).toBeFalsy();
  });

  it("should get a error message for roleIdentifier with id", () => {
    const roleIdentifier = { id: "1" };
    expect(roleUtils.createExpectedMessageForRoleData(roleIdentifier)).toEqual(
      `role with id ${roleIdentifier.id}`,
    );
  });

  it("should get a error message for roleIdentifier with name", () => {
    const roleIdentifier = { name: "roleName" };
    expect(roleUtils.createExpectedMessageForRoleData(roleIdentifier)).toEqual(
      `role with name '${roleIdentifier.name}'`,
    );
  });

  it("should get a error message for roleIdentifier with name and id", () => {
    const roleIdentifier = { name: "roleName", id: "12" };
    expect(roleUtils.createExpectedMessageForRoleData(roleIdentifier)).toEqual(
      `role with id ${roleIdentifier.id} or name '${roleIdentifier.name}'`,
    );
  });

  it("should get null for roleIdentifier with invalid content", () => {
    const roleIdentifier = { test: "123" };
    // @ts-ignore
    expect(roleUtils.createExpectedMessageForRoleData(roleIdentifier)).toBeFalsy();
  });
});

describe("testing getErrorForUndefinedRoleData", () => {
  it("should get a error message for undefined roleIdentifier", () => {
    expect(roleUtils.getErrorForUndefinedRoleData(null)).toEqual(
      "expected: data to identifier the role (id or name)\n" + `received: null`,
    );
  });

  it("should return a null report", () => {
    expect(roleUtils.getErrorForUndefinedRoleData({})).toBeFalsy();
  });
});

describe("testing getRoleData", () => {
  it("should get given string id", () => {
    expect(roleUtils.getRoleData("123")).toEqual({ id: "123" });
  });

  it("should get given object", () => {
    expect(roleUtils.getRoleData({ id: "123" })).toEqual({ id: "123" });
  });
});

describe("testing validateRole", () => {
  const mock = new MockDiscord();

  it("should return a error message due to null role", () => {
    const roleIdentifier = { id: "1" };
    const message = roleUtils.validateRole(null, roleIdentifier);
    const errorMessage = roleUtils.createExpectedMessageForRoleData(roleIdentifier);
    expect(message).toEqual(`expected: ${errorMessage}\n` + `received: null`);
  });

  it("should return a error message due to null role and roleIdentifier null", () => {
    const message = roleUtils.validateRole(null, null);
    expect(message).toEqual(
      `expected: a id or a name to identify the role\n` + `received: ${formatObject(null)}`,
    );
  });

  it("should return null due to existing role", () => {
    const message = roleUtils.validateRole(mock.role, { id: "123" });
    expect(message).toBeFalsy();
  });
});
