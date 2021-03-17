import { Client } from "discord.js";
import { ToRenameRole } from "../../../src/expect/matches";
import MockDiscord from "../../mocks/mockDiscord";
import { initCordeClientWithChannel } from "../../testHelper";
import { TestReport } from "../../../src/types";
import { buildReportMessage } from "../../../src/utils";
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

describe("testing ToRenameRole operation", () => {
  afterEach(() => {
    mockDiscord = new MockDiscord();
  });

  it("should fail due to undefined roleData", async () => {
    const corde = initClient();
    const toRename = new ToRenameRole(corde, "test", false);
    const report = await toRename.action("egg", undefined);

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

  it("should return false due to invalid newName value (null)", async () => {
    const corde = initClient();
    const toRename = new ToRenameRole(corde, "test", false);
    // @ts-ignore
    const report = await toRename.action({}, { id: "123" });

    const message = buildReportMessage(
      `expected: parameter newName must be a string or a number\n`,
      `received: object`,
    );

    const expectReport: TestReport = {
      pass: false,
      message,
    };

    expect(report).toEqual(expectReport);
    expect(report).toMatchSnapshot();
  });

  it("should return false due to newName be a empty string", async () => {
    const corde = initClient();
    const toRename = new ToRenameRole(corde, "test", false);
    const report = await toRename.action("", { id: "123" });

    const message = buildReportMessage(
      `expected: parameter newName must be a valid string\n`,
      `received: ''`,
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
    const toRename = new ToRenameRole(corde, "test", false);
    const report = await toRename.action("newName", { id: "123" });

    const message = buildReportMessage(`expected: role with id 123\n`, `received: null`);

    const expectReport: TestReport = {
      pass: false,
      message,
    };

    expect(report).toEqual(expectReport);
    expect(report).toMatchSnapshot();
  });

  it("should fail due to no role was renamed", async () => {
    const corde = initClient();

    runtime.setConfigs({ timeOut: 100 }, true);

    const toRename = new ToRenameRole(corde, "test", false);
    const report = await toRename.action("newName", { id: "123" });

    const message = buildReportMessage(
      `expected: role 'WE DEM BOYZZ!!!!!! 1' to be renamed to newName\n`,
      `received: name was not changed`,
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

    const toRename = new ToRenameRole(corde, "test", true);
    const report = await toRename.action("newName", { id: "123" });

    const expectReport: TestReport = {
      pass: true,
    };

    expect(report).toEqual(expectReport);
    expect(report).toMatchSnapshot();
  });

  it("should return true due to role has changed the name (isNot false)", async () => {
    const corde = initClient();

    runtime.setConfigs({ timeOut: 100 }, true);
    const mockEvent = new MockEvents(corde, mockDiscord);
    mockEvent.mockOnceRoleRenamed(mockDiscord.role);
    const toRename = new ToRenameRole(corde, "test", false);
    const report = await toRename.action(mockDiscord.role.name, { id: "123" });

    const expectReport: TestReport = {
      pass: true,
    };

    expect(report).toEqual(expectReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a not passed test due to name should not change (isNot true)", async () => {
    const corde = initClient();

    runtime.setConfigs({ timeOut: 100 }, true);
    const mockEvent = new MockEvents(corde, mockDiscord);
    mockEvent.mockOnceRoleRenamed(mockDiscord.role);
    const toRename = new ToRenameRole(corde, "test", true);
    const report = await toRename.action(mockDiscord.role.name, { id: "123" });

    const message = buildReportMessage(
      `expected: role not change name to '${mockDiscord.role.name}'\n`,
      `received: name was not changed (actual: '${mockDiscord.role.name}')`,
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
    mockEvent.mockOnceRoleRenamed(mockDiscord.role);
    const toRename = new ToRenameRole(corde, "test", false);
    const report = await toRename.action("test", { id: "123" });

    const message = buildReportMessage(
      `expected: role change name to 'test'\n`,
      `received: name was not changed (actual: '${mockDiscord.role.name}')`,
    );

    const expectReport: TestReport = {
      pass: false,
      message,
    };

    expect(report).toEqual(expectReport);
    expect(report).toMatchSnapshot();
  });
});
