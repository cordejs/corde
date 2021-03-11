import { roleUtils } from "../../src/expect/roleUtils";
import { buildReportMessage, formatObject } from "../../src/utils";
import MockDiscord from "../mocks/mockDiscord";

describe("testing createExpectedMessageForRoleData", () => {
  it("should get a error message for null roleData", () => {
    expect(roleUtils.createExpectedMessageForRoleData(null)).toBeFalsy();
  });

  it("should get a error message for roleData with id", () => {
    const roleData = { id: "1" };
    expect(roleUtils.createExpectedMessageForRoleData(roleData)).toEqual(
      `role with id ${roleData.id}`,
    );
  });

  it("should get a error message for roleData with name", () => {
    const roleData = { name: "roleName" };
    expect(roleUtils.createExpectedMessageForRoleData(roleData)).toEqual(
      `role with name '${roleData.name}'`,
    );
  });

  it("should get a error message for roleData with name and id", () => {
    const roleData = { name: "roleName", id: "12" };
    expect(roleUtils.createExpectedMessageForRoleData(roleData)).toEqual(
      `role with id ${roleData.id} or name '${roleData.name}'`,
    );
  });

  it("should get null for roleData with invalid content", () => {
    const roleData = { test: "123" };
    // @ts-ignore
    expect(roleUtils.createExpectedMessageForRoleData(roleData)).toBeFalsy();
  });
});

describe("testing getErrorForUndefinedRoleData", () => {
  it("should get a error message for undefined roleData", () => {
    expect(roleUtils.getErrorForUndefinedRoleData(null)).toEqual(
      buildReportMessage("expected: data to identifier the role (id or name)\n", `received: null`),
    );
  });

  it("should return a null report", () => {
    expect(roleUtils.getErrorForUndefinedRoleData({})).toBeFalsy();
  });
});

describe("testing validateRole", () => {
  const mock = new MockDiscord();

  it("should return a error message due to null role", () => {
    const roleData = { id: "1" };
    const message = roleUtils.validateRole(null, roleData);
    const errorMessage = roleUtils.createExpectedMessageForRoleData(roleData);
    expect(message).toEqual(buildReportMessage(`expected: ${errorMessage}\n`, `received: null`));
  });

  it("should return a error message due to null role and roleData null", () => {
    const message = roleUtils.validateRole(null, null);
    expect(message).toEqual(
      buildReportMessage(
        `expected: a id or a name to identify the role\n`,
        `received: ${formatObject(null)}`,
      ),
    );
  });

  it("should return null due to existing role", () => {
    const message = roleUtils.validateRole(mock.role, { id: "123" });
    expect(message).toBeFalsy();
  });
});
