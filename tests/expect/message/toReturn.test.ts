import { Client } from "discord.js";
import MockDiscord from "../../mocks/mockDiscord";
import { createCordeBotWithMockedFunctions } from "../../testHelper";
import { MessageEmbedLike, TestReport } from "../../../src/types";
import { ToReturn } from "../../../src/expect/matches";
import { buildReportMessage, diff, formatObject } from "../../../src/utils";
import { runtime } from "../../../src/common";
import messageUtils from "../../../src/expect/messageUtils";

let mockDiscord = new MockDiscord();

describe("testing toReturn", () => {
  afterEach(() => {
    mockDiscord = new MockDiscord();
  });

  it("should return a failed test due to invalid parameter (null)", async () => {
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const message = buildReportMessage(
      `expected: expect value to be a primitive value (string, boolean, number) or an MessageEmbedLike\n`,
      `received: null`,
    );

    const reportModel: TestReport = {
      pass: false,
      message,
    };

    const toReturn = new ToReturn(cordeClient, "ping", false);
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

    const reportModel: TestReport = {
      pass: false,
      message,
    };

    const toReturn = new ToReturn(cordeClient, "ping", false);
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

    const reportModel: TestReport = {
      pass: false,
      message,
    };

    const toReturn = new ToReturn(cordeClient, "ping", false);
    const report = await toReturn.action("pong");
    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to timeout but isNot = true", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const reportModel: TestReport = {
      pass: true,
    };

    const toReturn = new ToReturn(cordeClient, "ping", true);
    const report = await toReturn.action("pong");
    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to bot returned equal message", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());
    cordeClient.awaitMessagesFromTestingBot = jest.fn().mockReturnValue(mockDiscord.message);
    const reportModel: TestReport = {
      pass: true,
    };

    const toReturn = new ToReturn(cordeClient, "ping", false);
    const report = await toReturn.action(mockDiscord.message.content);

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to bot returned equal messages (string type)", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());
    cordeClient.awaitMessagesFromTestingBot = jest.fn().mockReturnValue(mockDiscord.message);
    const reportModel: TestReport = {
      pass: true,
    };

    const toReturn = new ToReturn(cordeClient, "ping", false);
    const report = await toReturn.action(mockDiscord.message.content);

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to bot returned equal messages (string number)", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());
    mockDiscord.message.content = "2";
    cordeClient.awaitMessagesFromTestingBot = jest.fn().mockReturnValue(mockDiscord.message);
    const reportModel: TestReport = {
      pass: true,
    };

    const toReturn = new ToReturn(cordeClient, "ping", false);
    const report = await toReturn.action(2);

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to bot returned equal messages (type embed)", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());
    cordeClient.awaitMessagesFromTestingBot = jest.fn().mockReturnValue(mockDiscord.messageEmbed);
    const reportModel: TestReport = {
      pass: true,
    };

    const toReturn = new ToReturn(cordeClient, "ping", false);
    const report = await toReturn.action(mockDiscord.messageEmbedLike);

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get failed test due to bot returned equal messages (isNot true)", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());
    mockDiscord.message.embeds.push(mockDiscord.messageEmbed);
    cordeClient.awaitMessagesFromTestingBot = jest.fn().mockReturnValue(mockDiscord.message);
    const reportModel: TestReport = {
      pass: false,
      message: buildReportMessage(
        `expected: message from bot be different from expectation\n`,
        `received: both returned and expectation are equal`,
      ),
    };

    const toReturn = new ToReturn(cordeClient, "ping", true);
    const report = await toReturn.action(mockDiscord.messageEmbedLike);

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to bot returned different messages (isNot true)", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());
    cordeClient.awaitMessagesFromTestingBot = jest.fn().mockReturnValue(mockDiscord.message);
    const reportModel: TestReport = {
      pass: true,
    };

    const toReturn = new ToReturn(cordeClient, "ping", true);
    const report = await toReturn.action(mockDiscord.messageEmbedLike);

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get fail test due to bot returned different messages (both embed)", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    mockDiscord.message.embeds.push(mockDiscord.messageEmbed);
    cordeClient.awaitMessagesFromTestingBot = jest.fn().mockReturnValue(mockDiscord.message);

    const embedReturned = messageUtils.getMessageByType(mockDiscord.message, "embed");
    const embedLike = {
      author: "Test",
      fields: mockDiscord.messageEmbedLike.fields,
    };

    const embedExpect = messageUtils.embedMessageLikeToMessageEmbed(embedLike);
    const embedExpectedMinified = messageUtils.getMessageByType(embedExpect, "embed");

    const reportModel: TestReport = {
      pass: false,
      message: buildReportMessage(diff(embedReturned, embedExpectedMinified)),
    };

    const toReturn = new ToReturn(cordeClient, "ping", false);
    const report = await toReturn.action(embedLike);

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get fail test due to bot returned different messages (expect primitive and returned embed)", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    mockDiscord.message.embeds.push(mockDiscord.messageEmbed);
    cordeClient.awaitMessagesFromTestingBot = jest.fn().mockReturnValue(mockDiscord.message);

    const expectValue = "expect value";
    const embedReturned = messageUtils.getMessageByType(mockDiscord.message, "embed");

    const reportModel: TestReport = {
      pass: false,
      message: buildReportMessage(
        `expected: '${expectValue}'\n`,
        `received: ${formatObject(embedReturned)}`,
      ),
    };

    const toReturn = new ToReturn(cordeClient, "ping", false);
    const report = await toReturn.action(expectValue);

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get fail test due to bot returned different messages both primitive values", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    cordeClient.awaitMessagesFromTestingBot = jest.fn().mockReturnValue(mockDiscord.message);

    const expectValue = "expect value";
    const embedReturned = messageUtils.getMessageByType(mockDiscord.message, "embed");

    const reportModel: TestReport = {
      pass: false,
      message: buildReportMessage(
        `expected: '${expectValue}'\n`,
        `received: '${mockDiscord.message.content}'`,
      ),
    };

    const toReturn = new ToReturn(cordeClient, "ping", false);
    const report = await toReturn.action(expectValue);

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });
});
