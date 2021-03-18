import chalk, { Color } from "chalk";
import { Client } from "discord.js";
import { runtime } from "../../../src/common";
import { ToSetRoleColor } from "../../../src/expect/matches";
import { TestReport } from "../../../src/types";
import { buildReportMessage, Colors, resolveColor } from "../../../src/utils";
import MockDiscord from "../../mocks/mockDiscord";
import { MockEvents } from "../../mocks/mockEvents";
import { initCordeClientWithChannel, removeANSIColorStyle } from "../../testHelper";

let mockDiscord = new MockDiscord();

function initClient() {
  const corde = initCordeClientWithChannel(mockDiscord, new Client());
  corde.findRole = jest.fn().mockReturnValue(mockDiscord.role);
  corde.fetchRole = jest.fn().mockReturnValue(mockDiscord.role);
  corde.sendTextMessage = jest.fn().mockImplementation(() => {});
  return corde;
}

describe("testing toSetRoleColor", () => {
  afterEach(() => {
    mockDiscord = new MockDiscord();
  });
  it("should fail due to undefined roleIdentifier", async () => {
    const corde = initClient();
    const toSetRoleColor = new ToSetRoleColor(corde, "test", false);
    const report = await toSetRoleColor.action(Colors.BLUE, undefined);

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

  it("should fail due to invalid color", async () => {
    const corde = initClient();
    const toSetRoleColor = new ToSetRoleColor(corde, "test", false);
    const report = await toSetRoleColor.action(null, { id: "132" });

    const message = buildReportMessage(`toSetRoleColor: invalid color informed - 'null'`);

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
    const toSetRoleColor = new ToSetRoleColor(corde, "test", false);
    const report = await toSetRoleColor.action(Colors.PURPLE, { id: "123" });

    const message = buildReportMessage(`expected: role with id 123\n`, `received: null`);

    const expectReport: TestReport = {
      pass: false,
      message,
    };

    expect(report).toEqual(expectReport);
    expect(report).toMatchSnapshot();
  });

  it("should fail due to role hadn't color changed", async () => {
    const corde = initClient();

    runtime.setConfigs({ timeOut: 100 }, true);

    const toSetRoleColor = new ToSetRoleColor(corde, "test", false);
    const report = await toSetRoleColor.action(Colors.NAVY, { id: "123" });

    const message = buildReportMessage(
      `expected: change role color from ${resolveColor(mockDiscord.role.color)} to ${resolveColor(
        Colors.NAVY,
      )}\n`,
      `received: the color was not changed`,
    );

    const expectReport: TestReport = {
      pass: false,
      message,
    };

    expect(report.pass).toEqual(expectReport.pass);
    expect(removeANSIColorStyle(report.message)).toEqual(expectReport.message);
    expect({
      pass: report.pass,
      message: removeANSIColorStyle(report.message),
    }).toMatchSnapshot();
  });

  it("should return true due to isNot true and no role change", async () => {
    const corde = initClient();

    runtime.setConfigs({ timeOut: 100 }, true);

    const toSetRoleColor = new ToSetRoleColor(corde, "test", true);
    const report = await toSetRoleColor.action(Colors.GREY, { id: "123" });

    const expectReport: TestReport = {
      pass: true,
    };

    expect(report).toEqual(expectReport);
    expect(report).toMatchSnapshot();
  });

  it("should return true due to role has changed the color (isNot false)", async () => {
    const corde = initClient();

    runtime.setConfigs({ timeOut: 100 }, true);
    const mockEvent = new MockEvents(corde, mockDiscord);
    mockEvent.mockOnceRoleUpdateColor(mockDiscord.role);
    const toSetRoleColor = new ToSetRoleColor(corde, "test", false);
    const report = await toSetRoleColor.action(mockDiscord.role.color, { id: "123" });

    const expectReport: TestReport = {
      pass: true,
    };

    expect(report).toEqual(expectReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a not passed test due to color should not change (isNot true)", async () => {
    const corde = initClient();

    runtime.setConfigs({ timeOut: 100 }, true);
    const mockEvent = new MockEvents(corde, mockDiscord);
    mockEvent.mockOnceRoleUpdateColor(mockDiscord.role);
    const toSetRoleColor = new ToSetRoleColor(corde, "test", false);
    const report = await toSetRoleColor.action(Colors.DARK_GOLD, { id: "123" });

    const message = buildReportMessage(
      `expected: change role color from ${mockDiscord.role.color} to ${resolveColor(
        Colors.DARK_GOLD,
      )}\n`,
      `received: ${mockDiscord.role.color}`,
    );

    const expectReport: TestReport = {
      pass: false,
      message,
    };

    expect(report.pass).toEqual(expectReport.pass);
    expect(removeANSIColorStyle(report.message)).toEqual(expectReport.message);
    expect({
      pass: report.pass,
      message: removeANSIColorStyle(report.message),
    }).toMatchSnapshot();
  });

  it("should return a not passed test due expected name did not match to received", async () => {
    const corde = initClient();

    runtime.setConfigs({ timeOut: 100 }, true);
    const mockEvent = new MockEvents(corde, mockDiscord);
    mockEvent.mockOnceRoleUpdateColor(mockDiscord.role);
    const toSetRoleColor = new ToSetRoleColor(corde, "test", false);
    const report = await toSetRoleColor.action(Colors.AQUA, { id: "123" });

    const message = buildReportMessage(
      `expected: change role color from ${resolveColor(mockDiscord.role.color)} to ${resolveColor(
        Colors.AQUA,
      )}\n`,
      `received: ${resolveColor(mockDiscord.role.color)}`,
    );

    const expectReport: TestReport = {
      pass: false,
      message,
    };

    expect(report.pass).toEqual(expectReport.pass);
    expect(removeANSIColorStyle(report.message)).toEqual(expectReport.message);
    expect({
      pass: report.pass,
      message: removeANSIColorStyle(report.message),
    }).toMatchSnapshot();
  });
});
