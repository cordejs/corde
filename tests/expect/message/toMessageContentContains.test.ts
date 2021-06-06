import { Client } from "discord.js";
import MockDiscord from "../../mocks/mockDiscord";
import { createCordeBotWithMockedFunctions, testUtils } from "../../testHelper";
import { MockEvents } from "../../mocks/mockEvents";
import { ICordeBot, ITestReport } from "../../../src/types";
import { ToMessageContentContains } from "../../../src/expect/matches";
import { buildReportMessage } from "../../../src/utils";
import { runtime } from "../../../src/common/runtime";

let mockDiscord = new MockDiscord();

describe("testing toMessageContentContains", () => {
  afterEach(() => {
    mockDiscord = new MockDiscord();
  });

  function initTestClass(cordeBot: ICordeBot, isNot: boolean) {
    return testUtils.initTestClass(ToMessageContentContains, {
      isCascade: false,
      command: "toMessageContentContains",
      cordeBot: cordeBot,
      isNot: isNot,
    });
  }

  it("should return a failed test due to invalid parameter (null)", async () => {
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const message = buildReportMessage(`expected content can not be null or empty`);

    const toMessageContentContains = initTestClass(cordeClient, false);

    const reportModel: ITestReport = {
      pass: false,
      testName: toMessageContentContains.toString(),
      message,
    };

    const report = await toMessageContentContains.action(null);
    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test due to invalid parameter (undefined)", async () => {
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());
    const message = buildReportMessage(`expected content can not be null or empty`);
    const toMessageContentContains = initTestClass(cordeClient, false);

    const reportModel: ITestReport = {
      pass: false,
      testName: toMessageContentContains.toString(),
      message,
    };

    const report = await toMessageContentContains.action(undefined);
    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should fail due to no message was sent by the bot", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const message = buildReportMessage(
      `expected: testing bot to send a message\n`,
      `received: no message was sent`,
    );

    const toMessageContentContains = initTestClass(cordeClient, false);

    const reportModel: ITestReport = {
      pass: false,
      testName: toMessageContentContains.toString(),
      message,
    };

    const report = await toMessageContentContains.action("pong");
    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to timeout but isNot = true", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const toMessageContentContains = initTestClass(cordeClient, true);

    const reportModel: ITestReport = {
      pass: true,
      testName: toMessageContentContains.toString(),
    };

    const report = await toMessageContentContains.action("pong");
    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to bot returned equal message", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessage();

    const toMessageContentContains = initTestClass(cordeClient, false);

    const reportModel: ITestReport = {
      pass: true,
      testName: toMessageContentContains.toString(),
    };

    const report = await toMessageContentContains.action(mockDiscord.message.content);

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to bot returned a contained message", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const events = new MockEvents(cordeClient, mockDiscord);
    mockDiscord.message.content = "message to contain";
    events.mockOnceMessage();

    const toMessageContentContains = initTestClass(cordeClient, false);

    const reportModel: ITestReport = {
      pass: true,
      testName: toMessageContentContains.toString(),
    };

    const report = await toMessageContentContains.action("message");

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get fail test due to bot returned different messages both primitive values", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessage();

    const toMessageContentContains = initTestClass(cordeClient, false);
    const expectValue = "expect value";

    const reportModel: ITestReport = {
      pass: false,
      testName: toMessageContentContains.toString(),
      message: buildReportMessage(
        `expected '${mockDiscord.message.content}' to contains '${expectValue}'`,
      ),
    };

    const report = await toMessageContentContains.action(expectValue);

    expect(report).toEqual(reportModel);
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

    const toMessageContentContains = initTestClass(corde, false);
    const report = await toMessageContentContains.action("abc");

    const reportModel: ITestReport = {
      pass: false,
      message: buildReportMessage(erroMessage),
      testName: toMessageContentContains.toString(),
    };

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });
});
