import { Client } from "discord.js";
import { ToSetRoleHoist } from "../../../src/expect/matches";
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

describe("testing toSetRoleHoist operation", () => {
  afterEach(() => {
    mockDiscord = new MockDiscord();
  });

  it("should fail due to undefined roleIdentifier", async () => {
    const corde = initClient();
    const toSetHoist = new ToSetRoleHoist(corde, "test", false);
    const report = await toSetHoist.action(true, undefined);

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

  it("should return false due to invalid hoist parameter (object)", async () => {
    const corde = initClient();
    const toSetHoist = new ToSetRoleHoist(corde, "test", false);
    // @ts-ignore
    const report = await toSetHoist.action({}, { id: "123" });

    const message = buildReportMessage(
      `expect: hoist parameter to be of boolean type\n`,
      `received: object`,
    );

    const expectReport: TestReport = {
      pass: false,
      message,
    };

    expect(report).toEqual(expectReport);
    expect(report).toMatchSnapshot();
  });

  it("should return false due to invalid hoist parameter (undefined)", async () => {
    const corde = initClient();
    const toSetHoist = new ToSetRoleHoist(corde, "test", false);
    // @ts-ignore
    const report = await toSetHoist.action(undefined, { id: "123" });

    const message = buildReportMessage(
      `expected: hoist option to be true or false\n`,
      `received: undefined`,
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
    const toSetHoist = new ToSetRoleHoist(corde, "test", false);
    const report = await toSetHoist.action(false, { id: "123" });

    const message = buildReportMessage(`expected: role with id 123\n`, `received: null`);

    const expectReport: TestReport = {
      pass: false,
      message,
    };

    expect(report).toEqual(expectReport);
    expect(report).toMatchSnapshot();
  });

  it("should fail due to no role hoist was not updated", async () => {
    const corde = initClient();

    runtime.setConfigs({ timeOut: 100 }, true);

    const toSetHoist = new ToSetRoleHoist(corde, "test", false);
    const report = await toSetHoist.action(false, { id: "123" });

    const message = buildReportMessage(
      `expected: hoist to be false\n`,
      `received: role hoist was not updated`,
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

    const toSetHoist = new ToSetRoleHoist(corde, "test", true);
    const report = await toSetHoist.action(false, { id: "123" });

    const expectReport: TestReport = {
      pass: true,
    };

    expect(report).toEqual(expectReport);
    expect(report).toMatchSnapshot();
  });

  it("should return true due to role changed the hoist (isNot false)", async () => {
    const corde = initClient();

    runtime.setConfigs({ timeOut: 100 }, true);
    const mockEvent = new MockEvents(corde, mockDiscord);
    mockEvent.mockOnceHoistUpdate(mockDiscord.role);
    const toSetHoist = new ToSetRoleHoist(corde, "test", false);
    const report = await toSetHoist.action(mockDiscord.role.hoist, { id: "123" });

    const expectReport: TestReport = {
      pass: true,
    };

    expect(report).toEqual(expectReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a not passed test due to hoist should not change (isNot true)", async () => {
    const corde = initClient();

    runtime.setConfigs({ timeOut: 100 }, true);
    const mockEvent = new MockEvents(corde, mockDiscord);
    mockEvent.mockOnceHoistUpdate(mockDiscord.role);
    const toSetHoist = new ToSetRoleHoist(corde, "test", true);
    const report = await toSetHoist.action(mockDiscord.role.hoist, { id: "123" });

    const message = buildReportMessage(
      `expected: hoist to not be ${mockDiscord.role.hoist}\n`,
      `received: ${mockDiscord.role.hoist}`,
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
    mockEvent.mockOnceHoistUpdate(mockDiscord.role);
    const toSetHoist = new ToSetRoleHoist(corde, "test", false);
    const report = await toSetHoist.action(false, { id: "123" });

    const message = buildReportMessage(`expected: hoist to be false\n`, `received: true`);

    const expectReport: TestReport = {
      pass: false,
      message,
    };

    expect(report).toEqual(expectReport);
    expect(report).toMatchSnapshot();
  });
});
