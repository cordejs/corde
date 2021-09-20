import { Client } from "discord.js";
import { runtime } from "../../../src/common/runtime";
import { ICordeBot, ITestReport } from "../../../src/types";
import { buildReportMessage, typeOf } from "../../../src/utils";
import MockDiscord from "../../mocks/mockDiscord";
import { MockEvents } from "../../mocks/mockEvents";
import { createCordeBotWithMockedFunctions, testUtils } from "../../testHelper";

import { debugCommand } from "../../../src/command";

const testName = "shouldReturn";

const failReport: ITestReport = {
  pass: false,
  testName,
};

const passReport: ITestReport = {
  pass: true,
  testName,
};

let mockDiscord = new MockDiscord();
let cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

function debugCon(customCommand?: string, customChannelId?: string, customClient?: ICordeBot) {
  return debugCommand(customCommand ?? "con", customChannelId, customClient ?? cordeClient);
}

describe(`testing ${testName} function`, () => {
  afterEach(() => {
    mockDiscord = new MockDiscord();
    runtime.setConfigs({ timeout: 100 }, true);
    cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());
  });

  it("should return error message due to no mesageIdentifier (null)", async () => {
    const corde = createCordeBotWithMockedFunctions(mockDiscord, new Client());
    const toUnPinMessage = initTestClass(corde, false);
    const report = await toUnPinMessage.action(null);

    const expectReport: ITestReport = {
      pass: false,
      testName: toUnPinMessage.toString(),
      message: buildReportMessage(
        `expected: message identifier to be a string or a IMessageIdentifier object\n`,
        `received: ${typeOf(null)}`,
      ),
    };

    expect(report).toEqual(expectReport);
    expect(report).toMatchSnapshot();
  });

  it("should return error message due to no mesageIdentifier (undefined)", async () => {
    const corde = createCordeBotWithMockedFunctions(mockDiscord, new Client());
    const toUnPinMessage = initTestClass(corde, false);
    const report = await toUnPinMessage.action(undefined);

    const expectReport: ITestReport = {
      pass: false,
      testName: toUnPinMessage.toString(),
      message: buildReportMessage(
        `expected: message identifier to be a string or a IMessageIdentifier object\n`,
        `received: ${typeOf(undefined)}`,
      ),
    };

    expect(report).toEqual(expectReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a passed test due to isNot true and timeout", async () => {
    runtime.setConfigs({ timeout: 10 }, true);
    const corde = createCordeBotWithMockedFunctions(mockDiscord, new Client());
    const toUnPinMessage = initTestClass(corde, true);
    const report = await toUnPinMessage.action("1233");

    const expectReport: ITestReport = {
      pass: true,
      testName: toUnPinMessage.toString(),
    };

    expect(report).toEqual(expectReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test due to isNot false and timeout", async () => {
    runtime.setConfigs({ timeout: 10 }, true);
    const corde = createCordeBotWithMockedFunctions(mockDiscord, new Client());
    const toUnPinMessage = initTestClass(corde, false);
    const report = await toUnPinMessage.action("1233");

    const msgString = toUnPinMessage.humanizeMessageIdentifierObject({ id: "1233" });
    const expectReport: ITestReport = {
      pass: false,
      testName: toUnPinMessage.toString(),
      message: buildReportMessage(
        `expected: unpin ${msgString}\n`,
        `received: informed message was not unpinned`,
      ),
    };

    expect(report).toEqual(expectReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test due to isNot false and timeout (messageIdentifier)", async () => {
    runtime.setConfigs({ timeout: 10 }, true);
    const corde = createCordeBotWithMockedFunctions(mockDiscord, new Client());
    const toUnPinMessage = initTestClass(corde, false);
    const report = await toUnPinMessage.action({ id: "1233" });

    const msgString = toUnPinMessage.humanizeMessageIdentifierObject({ id: "1233" });
    const expectReport: ITestReport = {
      pass: false,
      testName: toUnPinMessage.toString(),
      message: buildReportMessage(
        `expected: unpin ${msgString}\n`,
        `received: informed message was not unpinned`,
      ),
    };

    expect(report).toEqual(expectReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a passed test due to message unpinned", async () => {
    const corde = createCordeBotWithMockedFunctions(mockDiscord, new Client());
    const toUnPinMessage = initTestClass(corde, false);

    const mockEvent = new MockEvents(corde, mockDiscord);
    mockEvent.mockOnceMessageUnPinned();

    const report = await toUnPinMessage.action({ id: "1233" });

    const expectReport: ITestReport = {
      pass: true,
      testName: toUnPinMessage.toString(),
    };

    expect(report).toEqual(expectReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test due to message unpinned but isNot true", async () => {
    const corde = createCordeBotWithMockedFunctions(mockDiscord, new Client());
    const toUnPinMessage = initTestClass(corde, true);

    const mockEvent = new MockEvents(corde, mockDiscord);
    mockEvent.mockOnceMessageUnPinned();

    const report = await toUnPinMessage.action({ id: "1233" });
    const msgString = toUnPinMessage.humanizeMessageIdentifierObject({ id: "1233" });

    const expectReport: ITestReport = {
      pass: false,
      testName: toUnPinMessage.toString(),
      message: buildReportMessage(
        `expected: to not unpin ${msgString}\n`,
        `received: message pin = true`,
      ),
    };

    expect(report).toEqual(expectReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test due to failure in message sending", async () => {
    const corde = createCordeBotWithMockedFunctions(mockDiscord, new Client());
    corde.getRoles = jest.fn().mockReturnValue(mockDiscord.roleManager.cache);
    corde.findRole = jest.fn().mockReturnValue(mockDiscord.role);

    const erroMessage = "can not send message to channel x";
    corde.sendTextMessage = jest
      .fn()
      .mockImplementation(() => Promise.reject(new Error(erroMessage)));

    const toUnPinMessage = initTestClass(corde, false);
    const report = await toUnPinMessage.action("1");

    const reportModel: ITestReport = {
      pass: false,
      message: buildReportMessage(erroMessage),
      testName: toUnPinMessage.toString(),
    };

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });
});
