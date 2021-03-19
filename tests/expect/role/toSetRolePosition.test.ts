import { Client } from "discord.js";
import { runtime } from "../../../src/common";
import { ToSetRolePosition } from "../../../src/expect/matches";
import { TestReport } from "../../../src/types";
import { buildReportMessage } from "../../../src/utils";
import MockDiscord from "../../mocks/mockDiscord";
import { MockEvents } from "../../mocks/mockEvents";
import { initCordeClientWithChannel } from "../../testHelper";

let mockDiscord = new MockDiscord();

function initClient() {
  const corde = initCordeClientWithChannel(mockDiscord, new Client());
  corde.findRole = jest.fn().mockReturnValue(mockDiscord.role);
  corde.fetchRole = jest.fn().mockReturnValue(mockDiscord.role);
  corde.sendTextMessage = jest.fn().mockImplementation(() => {});
  runtime.setConfigs({ timeOut: 100 }, true);
  return corde;
}

/**
 * I can not figure out how to mock position of roles.
 * They come as -1 '-'. So I in tests I'm gonna test with -2.
 */
describe("testing ToSetRolePosition operation", () => {
  afterEach(() => {
    mockDiscord = new MockDiscord();
  });

  it("should fail due to undefined roleIdentifier", async () => {
    const corde = initClient();
    const toSetRolePosition = new ToSetRolePosition(corde, "test", false);
    const report = await toSetRolePosition.action(1, null);

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

  it("should find and must return passed report due to 'changed position' (isNot false)", async () => {
    const corde = createCordeBotWithMockedFunctions();
    const mockEvent = new MockEvents(corde, mockDiscord);
    mockEvent.mockOnceRolePositionUpdate();
    const toSetPosition = new ToSetRolePosition(corde, "test", false);
    const report = await toSetPosition.action(-1, { id: "123" });
    const matchReport: TestReport = {
      pass: true,
    };
    expect(report).toEqual(matchReport);
  });

  it("should find and must return passed report due to 'changed position' (isNot true)", async () => {
    const corde = createCordeBotWithMockedFunctions();
    const mockEvent = new MockEvents(corde, mockDiscord);
    mockEvent.mockOnceRolePositionUpdate();
    const toSetPosition = new ToSetRolePosition(corde, "test", true);
    const report = await toSetPosition.action(-2, { id: "123" });
    const matchReport: TestReport = {
      pass: true,
    };

    expect(report).toEqual(matchReport);
    expect(report).toMatchSnapshot();
  });

  it("should not find a role and must return not passed (isNot true)", async () => {
    const corde = createCordeBotWithMockedFunctions(null);

    const toSetPosition = new ToSetRolePosition(corde, "test", true);
    const report = await toSetPosition.action(1, { id: "123" });

    const message = buildReportMessage(`expected: role with id 123\n`, `received: null`);

    const matchReport: TestReport = {
      pass: false,
      message,
    };
    expect(report).toEqual(matchReport);
    expect(report).toMatchSnapshot();
  });

  it("should not find a role and must return not passed (isNot false)", async () => {
    const corde = createCordeBotWithMockedFunctions(null);
    const toSetPosition = new ToSetRolePosition(corde, "test", false);
    const report = await toSetPosition.action(2, { id: "123" });

    const message = buildReportMessage(`expected: role with id 123\n`, `received: null`);

    const matchReport: TestReport = {
      pass: false,
      message,
    };
    expect(report).toEqual(matchReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a not passed test due to new position be higher than the permitted (isNot false)", async () => {
    const corde = createCordeBotWithMockedFunctions();
    const toSetPosition = new ToSetRolePosition(corde, "test", false);
    const report = await toSetPosition.action(2, { id: "123" });

    const message = buildReportMessage(
      `expected: position to be >= 0 and <= -1 (max value possible)\n`,
      `received: 2`,
    );

    const matchReport: TestReport = {
      pass: false,
      message,
    };
    expect(report).toEqual(matchReport);
    expect(report).toMatchSnapshot();
  });

  it("should not find a role and return a failed report", async () => {
    const corde = createCordeBotWithMockedFunctions();

    corde.findRole = jest.fn().mockImplementation(null);
    const toSetPosition = new ToSetRolePosition(corde, "test", false);
    const report = await toSetPosition.action(1, { id: "123" });

    const message = buildReportMessage(`expected: role with id 123\n`, `received: null`);

    const matchReport: TestReport = {
      pass: false,
      message,
    };
    expect(report).toEqual(matchReport);
    expect(report).toMatchSnapshot();
  });
});

function createCordeBotWithMockedFunctions(findRoleMock: any = mockDiscord.role) {
  const corde = initCordeClientWithChannel(mockDiscord, new Client());
  corde.getRoles = jest.fn().mockReturnValue(mockDiscord.roleManager.cache);
  corde.findRole = jest.fn().mockReturnValue(findRoleMock);
  corde.sendTextMessage = jest.fn().mockImplementation(() => {});
  return corde;
}
