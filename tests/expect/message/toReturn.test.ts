import { Client } from "discord.js";
import MockDiscord from "../../mocks/mockDiscord";
import { createCordeBotWithMockedFunctions } from "../../testHelper";
import { CordeBotLike, MessageEmbedLike, TestReport } from "../../../src/types";
import { ToReturn } from "../../../src/expect/matches";
import { buildReportMessage, diff, formatObject } from "../../../src/utils";
import { runtime } from "../../../src/common/runtime";

let mockDiscord = new MockDiscord();

describe("testing toReturn", () => {
  afterEach(() => {
    mockDiscord = new MockDiscord();
  });

  function initTestClass(cordeBot: CordeBotLike, isNot: boolean) {
    return new ToReturn({
      command: "toReturn",
      cordeBot: cordeBot,
      isNot: isNot,
      timeout: 1000,
    });
  }

  it("should return a failed test due to invalid parameter (null)", async () => {
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const message = buildReportMessage(
      `expected: expect value to be a primitive value (string, boolean, number) or an MessageEmbedLike\n`,
      `received: null`,
    );

    const toReturn = initTestClass(cordeClient, false);

    const reportModel: TestReport = {
      pass: false,
      testName: toReturn.toString(),
      message,
    };

    const report = await toReturn.action(null);
    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test due to invalid parameter (undefined)", async () => {
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const message = buildReportMessage(
      `expected: expect value to be a primitive value (string, boolean, number) or an MessageEmbedLike\n`,
      `received: undefined`,
    );

    const toReturn = initTestClass(cordeClient, false);

    const reportModel: TestReport = {
      pass: false,
      testName: toReturn.toString(),
      message,
    };

    const report = await toReturn.action(undefined);
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

    const toReturn = initTestClass(cordeClient, false);

    const reportModel: TestReport = {
      pass: false,
      testName: toReturn.toString(),
      message,
    };

    const report = await toReturn.action("pong");
    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to timeout but isNot = true", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const toReturn = initTestClass(cordeClient, true);

    const reportModel: TestReport = {
      pass: true,
      testName: toReturn.toString(),
    };

    const report = await toReturn.action("pong");
    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to bot returned equal message", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());
    cordeClient.awaitMessagesFromTestingBot = jest.fn().mockReturnValue(mockDiscord.message);

    const toReturn = initTestClass(cordeClient, false);

    const reportModel: TestReport = {
      pass: true,
      testName: toReturn.toString(),
    };

    const report = await toReturn.action(mockDiscord.message.content);

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to bot returned equal messages (string type)", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());
    cordeClient.awaitMessagesFromTestingBot = jest.fn().mockReturnValue(mockDiscord.message);

    const toReturn = initTestClass(cordeClient, false);

    const reportModel: TestReport = {
      pass: true,
      testName: toReturn.toString(),
    };

    const report = await toReturn.action(mockDiscord.message.content);

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to bot returned equal messages (string number)", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());
    mockDiscord.message.content = "2";
    cordeClient.awaitMessagesFromTestingBot = jest.fn().mockReturnValue(mockDiscord.message);

    const toReturn = initTestClass(cordeClient, false);

    const reportModel: TestReport = {
      pass: true,
      testName: toReturn.toString(),
    };

    const report = await toReturn.action(2);

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to bot returned equal messages (type embed)", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());
    cordeClient.awaitMessagesFromTestingBot = jest.fn().mockReturnValue(mockDiscord.messageEmbed);
    const toReturn = initTestClass(cordeClient, false);

    const reportModel: TestReport = {
      pass: true,
      testName: toReturn.toString(),
    };

    const report = await toReturn.action(mockDiscord.messageEmbedLike);

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get failed test due to bot returned equal messages (isNot true)", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());
    mockDiscord.message.embeds.push(mockDiscord.messageEmbed);
    cordeClient.awaitMessagesFromTestingBot = jest.fn().mockReturnValue(mockDiscord.message);
    const toReturn = initTestClass(cordeClient, true);

    const reportModel: TestReport = {
      pass: false,
      testName: toReturn.toString(),
      message: buildReportMessage(
        `expected: message from bot be different from expectation\n`,
        `received: both returned and expectation are equal`,
      ),
    };

    const report = await toReturn.action(mockDiscord.messageEmbedLike);

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to bot returned different messages (isNot true)", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());
    cordeClient.awaitMessagesFromTestingBot = jest.fn().mockReturnValue(mockDiscord.message);
    const toReturn = initTestClass(cordeClient, true);

    const reportModel: TestReport = {
      pass: true,
      testName: toReturn.toString(),
    };

    const report = await toReturn.action(mockDiscord.messageEmbedLike);

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get fail test due to bot returned different messages (both embed)", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    mockDiscord.message.embeds.push(mockDiscord.messageEmbed);
    cordeClient.awaitMessagesFromTestingBot = jest.fn().mockReturnValue(mockDiscord.message);

    const toReturn = initTestClass(cordeClient, false);

    const embedReturned = toReturn.getMessageByType(mockDiscord.message, "embed");
    const embedLike = {
      author: "Test",
      fields: mockDiscord.messageEmbedLike.fields,
    };

    const embedExpect = toReturn.embedMessageLikeToMessageEmbed(embedLike);
    const embedExpectedMinified = toReturn.getMessageByType(embedExpect, "embed");

    const reportModel: TestReport = {
      pass: false,
      testName: toReturn.toString(),
      message: buildReportMessage(diff(embedReturned, embedExpectedMinified)),
    };

    const report = await toReturn.action(embedLike);

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get fail test due to bot returned different messages (expect primitive and returned embed)", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    mockDiscord.message.embeds.push(mockDiscord.messageEmbed);
    cordeClient.awaitMessagesFromTestingBot = jest.fn().mockReturnValue(mockDiscord.message);

    const toReturn = initTestClass(cordeClient, false);

    const expectValue = "expect value";
    const embedReturned = toReturn.getMessageByType(mockDiscord.message, "embed");

    const reportModel: TestReport = {
      pass: false,
      testName: toReturn.toString(),
      message: buildReportMessage(
        `expected: '${expectValue}'\n`,
        `received: ${formatObject(embedReturned)}`,
      ),
    };

    const report = await toReturn.action(expectValue);

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get fail test due to bot returned different messages (expect embed and returned primitive)", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    cordeClient.awaitMessagesFromTestingBot = jest.fn().mockReturnValue(mockDiscord.message);
    const toReturn = initTestClass(cordeClient, false);

    const embedExpect = toReturn.embedMessageLikeToMessageEmbed(mockDiscord.messageEmbedLike);

    const reportModel: TestReport = {
      pass: false,
      testName: toReturn.toString(),
      message: buildReportMessage(
        `expected: ${formatObject(embedExpect)}\n`,
        `received: '${mockDiscord.message}'`,
      ),
    };

    const report = await toReturn.action(mockDiscord.messageEmbedLike);

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get fail test due to bot returned different messages both primitive values", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    cordeClient.awaitMessagesFromTestingBot = jest.fn().mockReturnValue(mockDiscord.message);

    const toReturn = initTestClass(cordeClient, false);
    const expectValue = "expect value";

    const reportModel: TestReport = {
      pass: false,
      testName: toReturn.toString(),
      message: buildReportMessage(
        `expected: '${expectValue}'\n`,
        `received: '${mockDiscord.message.content}'`,
      ),
    };

    const report = await toReturn.action(expectValue);

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });
});
