import { Client } from "discord.js";
import MockDiscord from "../../mocks/mockDiscord";
import { createCordeBotWithMockedFunctions, testUtils } from "../../testHelper";
import { CordeBotLike, TestReport } from "../../../src/types";
import { ToEditMessage } from "../../../src/expect/matches";
import { buildReportMessage, diff, formatObject } from "../../../src/utils";
import { runtime } from "../../../src/common/runtime";
import { MockEvents } from "../../mocks/mockEvents";

let mockDiscord = new MockDiscord();

describe("testing toEditMessage", () => {
  afterEach(() => {
    mockDiscord = new MockDiscord();
  });

  function initTestClass(cordeBot: CordeBotLike, commandName?: string, isNot?: boolean) {
    return testUtils.initTestClass(ToEditMessage, {
      command: commandName,
      cordeBot: cordeBot,
      isNot: isNot,
      channelId: runtime.channelId,
    });
  }

  it("should return a failed test due to invalid parameter (null)", async () => {
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const message = buildReportMessage(
      `expected: expect value to be a primitive value (string, boolean, number) or an MessageEmbedLike object\n`,
      `received: null`,
    );

    const toEditMessage = initTestClass(cordeClient, "ping", false);

    const reportModel: TestReport = {
      pass: false,
      message,
      testName: toEditMessage.toString(),
    };

    const report = await toEditMessage.action(null);
    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test due to invalid parameter (undefined)", async () => {
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const message = buildReportMessage(
      `expected: expect value to be a primitive value (string, boolean, number) or an MessageEmbedLike object\n`,
      `received: undefined`,
    );

    const toEditMessage = initTestClass(cordeClient, "ping", false);

    const reportModel: TestReport = {
      pass: false,
      message,
      testName: toEditMessage.toString(),
    };

    const report = await toEditMessage.action(undefined);
    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should fail due to message was not edited by the bot (no messageIdentifier)", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const message = buildReportMessage(
      `expected: testing bot to edit the last message sent\n`,
      `received: message was not edited`,
    );

    const toEditMessage = initTestClass(cordeClient, "ping", false);

    const reportModel: TestReport = {
      pass: false,
      message,
      testName: toEditMessage.toString(),
    };

    const report = await toEditMessage.action("pong");
    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should fail due to message was not edited by the bot (no messageIdentifier as string)", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const message = buildReportMessage(
      `expected: testing bot to edit the message of id 123\n`,
      `received: message was not edited`,
    );

    const toEditMessage = initTestClass(cordeClient, "ping", false);

    const reportModel: TestReport = {
      pass: false,
      message,
      testName: toEditMessage.toString(),
    };

    const report = await toEditMessage.action("pong", "123");
    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should fail due to message was not edited by the bot (no messageIdentifier as object with id)", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const message = buildReportMessage(
      `expected: testing bot to edit the message of id 123\n`,
      `received: message was not edited`,
    );

    const toEditMessage = initTestClass(cordeClient, "ping", false);

    const reportModel: TestReport = {
      pass: false,
      testName: toEditMessage.toString(),
      message,
    };

    const report = await toEditMessage.action("pong", { id: "123" });
    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should fail due to message was not edited by the bot (no messageIdentifier as object with content)", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const message = buildReportMessage(
      `expected: testing bot to edit the message of content "message test"\n`,
      `received: message was not edited`,
    );

    const toEditMessage = initTestClass(cordeClient, "ping", false);

    const reportModel: TestReport = {
      pass: false,
      message,
      testName: toEditMessage.toString(),
    };

    const report = await toEditMessage.action("pong", { oldContent: "message test" });
    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to timeout but isNot = true", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const toEditMessage = initTestClass(cordeClient, "ping", true);

    const reportModel: TestReport = {
      pass: true,
      testName: toEditMessage.toString(),
    };

    const report = await toEditMessage.action("pong");
    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to bot returned equal message", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageContentOrEmbedChange();

    const toEditMessage = initTestClass(cordeClient, "ping", false);

    const reportModel: TestReport = {
      pass: true,
      testName: toEditMessage.toString(),
    };

    const report = await toEditMessage.action(mockDiscord.message.content);

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to bot returned equal messages (string type)", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageContentOrEmbedChange();

    const toEditMessage = initTestClass(cordeClient, "ping", false);

    const reportModel: TestReport = {
      pass: true,
      testName: toEditMessage.toString(),
    };

    const report = await toEditMessage.action(mockDiscord.message.content);

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to bot returned equal messages (string number)", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());
    mockDiscord.message.content = "2";

    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageContentOrEmbedChange();

    const toEditMessage = initTestClass(cordeClient, "ping", false);

    const reportModel: TestReport = {
      pass: true,
      testName: toEditMessage.toString(),
    };

    const report = await toEditMessage.action(2);

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to bot returned equal messages (type embed)", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageContentOrEmbedChange(mockDiscord.messageWithEmbed);

    const toEditMessage = initTestClass(cordeClient, "ping", false);

    const reportModel: TestReport = {
      pass: true,
      testName: toEditMessage.toString(),
    };

    const report = await toEditMessage.action(mockDiscord.messageEmbedLike);

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get failed test due to bot returned equal messages (isNot true)", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageContentOrEmbedChange(mockDiscord.messageWithEmbed);

    const toEditMessage = initTestClass(cordeClient, "ping", true);

    const reportModel: TestReport = {
      pass: false,
      testName: toEditMessage.toString(),
      message: buildReportMessage(
        `expected: message from bot be different from expectation\n`,
        `received: both returned and expectation are equal`,
      ),
    };

    const report = await toEditMessage.action(mockDiscord.messageEmbedLike);

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to bot returned different messages (isNot true)", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageContentOrEmbedChange();

    const toEditMessage = initTestClass(cordeClient, "ping", true);

    const reportModel: TestReport = {
      pass: true,
      testName: toEditMessage.toString(),
    };

    const report = await toEditMessage.action(mockDiscord.messageEmbedLike);

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get fail test due to bot returned different messages (both embed)", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageContentOrEmbedChange(mockDiscord.messageWithEmbed);

    const toEditMessage = initTestClass(cordeClient, "ping", false);

    const embedReturned = toEditMessage.getMessageByType(mockDiscord.messageWithEmbed, "embed");
    const embedLike = {
      author: "Test",
      fields: mockDiscord.messageEmbedLike.fields,
    };

    const embedExpect = toEditMessage.embedMessageLikeToMessageEmbed(embedLike);
    const embedExpectedMinified = toEditMessage.getMessageByType(embedExpect, "embed");

    const reportModel: TestReport = {
      pass: false,
      testName: toEditMessage.toString(),
      message: buildReportMessage(diff(embedReturned, embedExpectedMinified)),
    };

    const report = await toEditMessage.action(embedLike);

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get fail test due to bot returned different messages (expect primitive and returned embed)", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageContentOrEmbedChange(mockDiscord.messageWithEmbed);
    const toEditMessage = initTestClass(cordeClient, "ping", false);

    const expectValue = "expect value";
    const embedReturned = toEditMessage.getMessageByType(mockDiscord.messageWithEmbed, "embed");

    const reportModel: TestReport = {
      pass: false,
      testName: toEditMessage.toString(),
      message: buildReportMessage(
        `expected: '${expectValue}'\n`,
        `received: ${formatObject(embedReturned)}`,
      ),
    };

    const report = await toEditMessage.action(expectValue);

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get fail test due to bot returned different messages both primitive values", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());
    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageContentOrEmbedChange();

    const expectValue = "expect value";

    const toEditMessage = initTestClass(cordeClient, "ping", false);

    const reportModel: TestReport = {
      pass: false,
      message: buildReportMessage(
        `expected: '${expectValue}'\n`,
        `received: '${mockDiscord.message.content}'`,
      ),
      testName: toEditMessage.toString(),
    };

    const report = await toEditMessage.action(expectValue);

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get fail test due to bot returned different messages (expect embed and returned primitive)", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const mockEvent = new MockEvents(cordeClient, mockDiscord);
    mockEvent.mockOnceMessageContentOrEmbedChange();

    const toEditMessage = initTestClass(cordeClient, "ping", false);

    const embedExpect = toEditMessage.embedMessageLikeToMessageEmbed(mockDiscord.messageEmbedLike);

    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageContentOrEmbedChange();

    const reportModel: TestReport = {
      pass: false,
      message: buildReportMessage(
        `expected: ${formatObject(embedExpect)}\n`,
        `received: '${mockDiscord.message}'`,
      ),
      testName: toEditMessage.toString(),
    };

    const report = await toEditMessage.action(mockDiscord.messageEmbedLike);

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });
});
