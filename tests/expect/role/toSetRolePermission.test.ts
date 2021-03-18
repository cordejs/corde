import { Client } from "discord.js";
import { ToSetRolePermission } from "../../../src/expect/matches";
import MockDiscord from "../../mocks/mockDiscord";
import { initCordeClientWithChannel } from "../../testHelper";
import { TestReport } from "../../../src/types";
import { buildReportMessage, calcPermissionsValue, Permission } from "../../../src/utils";
import { MockEvents } from "../../mocks/mockEvents";
import { runtime } from "../../../src/common";

let mockDiscord = new MockDiscord();

function initClient() {
  const corde = initCordeClientWithChannel(mockDiscord, new Client());
  corde.findRole = jest.fn().mockReturnValue(mockDiscord.role);
  corde.fetchRole = jest.fn().mockReturnValue(mockDiscord.role);
  corde.sendTextMessage = jest.fn().mockImplementation(() => {});
  return corde;
}

describe("testing toSetRolePermission operation", () => {
  afterEach(() => {
    mockDiscord = new MockDiscord();
  });

  it("should fail due to undefined roleIdentifier", async () => {
    const corde = initClient();
    const toSetRolePermission = new ToSetRolePermission(corde, "test", false);
    const report = await toSetRolePermission.action(undefined, ["ADD_REACTIONS"]);

    const message = buildReportMessage(
      "expected: data to identifier the role (id or name)\n",
      `received: null`,
    );

    const expectReport: TestReport = {
      pass: false,
      message,
    };

    expect(report).toEqual(expectReport);
    expect(report).toMatchSnapshot();
  });

  it("should return false due to invalid permission parameter (object)", async () => {
    const corde = initClient();
    const toSetRolePermission = new ToSetRolePermission(corde, "test", false);
    // @ts-ignore
    const report = await toSetRolePermission.action({ id: "123" }, {});

    const message = buildReportMessage(
      `expected: permissions to be null, undefined or an array\n`,
      `received: object`,
    );

    const expectReport: TestReport = {
      pass: false,
      message,
    };

    expect(report).toEqual(expectReport);
    expect(report).toMatchSnapshot();
  });

  it("should return false due to invalid permission parameter (undefined)", async () => {
    const corde = initClient();
    const toSetRolePermission = new ToSetRolePermission(corde, "test", false);
    // @ts-ignore
    const report = await toSetRolePermission.action({ id: "123" }, {});

    const message = buildReportMessage(
      `expected: permissions to be null, undefined or an array\n`,
      `received: object`,
    );

    const expectReport: TestReport = {
      pass: false,
      message,
    };

    expect(report).toEqual(expectReport);
    expect(report).toMatchSnapshot();
  });

  it("should return false due to not found role", async () => {
    const corde = initClient();
    corde.findRole = jest.fn().mockReturnValue(null);
    const toSetRolePermission = new ToSetRolePermission(corde, "test", false);
    const report = await toSetRolePermission.action({ id: "123" }, ["ATTACH_FILES"]);

    const message = buildReportMessage(`expected: role with id 123\n`, `received: null`);

    const expectReport: TestReport = {
      pass: false,
      message,
    };

    expect(report).toEqual(expectReport);
    expect(report).toMatchSnapshot();
  });

  it("should fail due to role permissions was not updated", async () => {
    const corde = initClient();

    runtime.setConfigs({ timeOut: 100 }, true);

    const toSetRolePermission = new ToSetRolePermission(corde, "test", false);
    const report = await toSetRolePermission.action({ id: "123" }, ["ATTACH_FILES"]);

    const message = buildReportMessage(
      `expected: role permissions change to: ATTACH_FILES\n`,
      `received: permissions were not changed`,
    );

    const expectReport: TestReport = {
      pass: false,
      message,
    };

    expect(report).toEqual(expectReport);
    expect(report).toMatchSnapshot();
  });

  it("should return true due to isNot true and no role change", async () => {
    const corde = initClient();

    runtime.setConfigs({ timeOut: 100 }, true);

    const toSetRolePermission = new ToSetRolePermission(corde, "test", true);
    const report = await toSetRolePermission.action({ id: "123" }, ["ATTACH_FILES"]);

    const expectReport: TestReport = {
      pass: true,
    };

    expect(report).toEqual(expectReport);
    expect(report).toMatchSnapshot();
  });

  it("should return true due to role changed permissions (isNot false)", async () => {
    const corde = initClient();

    runtime.setConfigs({ timeOut: 100 }, true);
    const mockEvent = new MockEvents(corde, mockDiscord);
    const mockRole = mockDiscord.createMockRole(
      "test role",
      calcPermissionsValue(...mockDiscord.role.permissions.toArray().map((p) => Permission[p])),
    );
    mockEvent.mockOnceRolePermissionsUpdate(mockRole);
    const toSetRolePermission = new ToSetRolePermission(corde, "test", false);
    const report = await toSetRolePermission.action({ id: "123" }, mockRole.permissions.toArray());

    const expectReport: TestReport = {
      pass: true,
    };

    expect(report).toEqual(expectReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a not passed test due to permissions should not change (isNot true)", async () => {
    const corde = initClient();
    const mockRole = mockDiscord.createMockRole(
      "test role",
      calcPermissionsValue(Permission.ADMINISTRATOR),
    );
    runtime.setConfigs({ timeOut: 100 }, true);
    const mockEvent = new MockEvents(corde, mockDiscord);

    mockEvent.mockOnceRolePermissionsUpdate(mockRole);
    const toSetRolePermission = new ToSetRolePermission(corde, "test", true);
    const report = await toSetRolePermission.action({ id: "123" }, ["ADMINISTRATOR"]);

    const message = buildReportMessage(
      `expected: role permissions not change to: ADMINISTRATOR\n`,
      `received: ADMINISTRATOR (and ${
        mockRole.permissions.toArray().filter((p) => p !== "ADMINISTRATOR").length
      } others)`,
    );

    const expectReport: TestReport = {
      pass: false,
      message,
    };

    expect(report).toEqual(expectReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a not passed test due to permissions should not change (isNot true)", async () => {
    const corde = initClient();
    const mockRole = mockDiscord.createMockRole(
      "test role",
      calcPermissionsValue(Permission.ADMINISTRATOR, Permission.BAN_MEMBERS),
    );
    runtime.setConfigs({ timeOut: 100 }, true);
    const mockEvent = new MockEvents(corde, mockDiscord);

    mockEvent.mockOnceRolePermissionsUpdate(mockRole);
    const toSetRolePermission = new ToSetRolePermission(corde, "test", true);
    const report = await toSetRolePermission.action({ id: "123" }, [
      "ADMINISTRATOR",
      "BAN_MEMBERS",
    ]);

    const message = buildReportMessage(
      `expected: role permissions not change to: ADMINISTRATOR and BAN_MEMBERS\n`,
      `received: ADMINISTRATOR (and ${
        mockRole.permissions.toArray().filter((p) => p !== "ADMINISTRATOR").length
      } others)`,
    );

    const expectReport: TestReport = {
      pass: false,
      message,
    };

    expect(report).toEqual(expectReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a not passed test due to permissions should not change (isNot true)", async () => {
    const corde = initClient();
    const mockRole = mockDiscord.createMockRole(
      "test role",
      calcPermissionsValue(Permission.ADMINISTRATOR, Permission.BAN_MEMBERS, Permission.CONNECT),
    );
    runtime.setConfigs({ timeOut: 100 }, true);
    const mockEvent = new MockEvents(corde, mockDiscord);

    mockEvent.mockOnceRolePermissionsUpdate(mockRole);
    const toSetRolePermission = new ToSetRolePermission(corde, "test", true);
    const report = await toSetRolePermission.action({ id: "123" }, [
      "ADMINISTRATOR",
      "BAN_MEMBERS",
      "CONNECT",
    ]);

    const message = buildReportMessage(
      `expected: role permissions not change to: ADMINISTRATOR (and 2 others)\n`,
      `received: ADMINISTRATOR (and ${
        mockRole.permissions.toArray().filter((p) => p !== "ADMINISTRATOR").length
      } others)`,
    );

    const expectReport: TestReport = {
      pass: false,
      message,
    };

    expect(report).toEqual(expectReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a not passed test due expected name did not match to received", async () => {
    const corde = initClient();

    runtime.setConfigs({ timeOut: 100 }, true);
    const mockEvent = new MockEvents(corde, mockDiscord);
    mockEvent.mockOnceRolePermissionsUpdate(mockDiscord.role);
    const toSetRolePermission = new ToSetRolePermission(corde, "test", false);
    const report = await toSetRolePermission.action({ id: "123" }, ["ATTACH_FILES"]);

    const message = buildReportMessage(
      `expected: role permissions change to: ATTACH_FILES\n`,
      `received: ADMINISTRATOR (and 30 others)`,
    );

    const expectReport: TestReport = {
      pass: false,
      message,
    };

    expect(report).toEqual(expectReport);
    expect(report).toMatchSnapshot();
  });
});
