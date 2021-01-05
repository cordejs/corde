import { toReturn } from "../../../src/api/expectMatches/message/toReturn";
import { Client } from "discord.js";
import { TestReport } from "../../../src/api/interfaces";
import MockDiscord from "../../mocks/mockDiscord";
import { createCordeBotWithMockedFunctions, initCordeClientWithChannel } from "../../testHelper";
import { TimeoutError } from "rxjs";
import Utils from "../../../src/utils/utils";

let mockDiscord = new MockDiscord();

Utils.setDelayValue(1);

describe("testing toReturn", () => {
  afterEach(() => {
    mockDiscord = new MockDiscord();
  });

  it("should return a passed test with a string message as content", async () => {
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const reportModel = new TestReport({
      commandName: "hello",
      expectation: mockDiscord.messageCollection.array()[1].content,
      output: mockDiscord.messageCollection.array()[1].content,
      isNot: false,
      hasPassed: true,
      showExpectAndOutputValue: true,
    });

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    jest
      .spyOn(cordeClient, "awaitMessagesFromTestingBot")
      .mockReturnValue(Promise.resolve(mockDiscord.messageCollection.array()[1]));

    const report = await toReturn(
      reportModel.commandName,
      false,
      cordeClient,
      reportModel.expectation,
    );

    expect(report).toEqual(reportModel);
  });

  it("should return a failed test due to timeout with isNot = false", async () => {
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const timeout = new TimeoutError();
    const reportModel = new TestReport({
      commandName: "hello",
      expectation: mockDiscord.messageCollection.array()[1].content,
      output: timeout.message,
      isNot: false,
      hasPassed: false,
      showExpectAndOutputValue: true,
    });

    jest.spyOn(cordeClient, "awaitMessagesFromTestingBot").mockImplementation(() => {
      throw new TimeoutError();
    });

    const report = await toReturn(
      reportModel.commandName,
      false,
      cordeClient,
      reportModel.expectation,
    );

    expect(report).toEqual(reportModel);
  });

  it("should return a failed test due to a not known error with isNot = true", async () => {
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const unknownError = "unknown";
    const reportModel = new TestReport({
      commandName: "hello",
      expectation: mockDiscord.messageCollection.array()[1].content,
      output: unknownError,
      isNot: true,
      hasPassed: false,
      showExpectAndOutputValue: true,
    });

    cordeClient.sendTextMessage = jest.fn().mockImplementation(() => {
      throw new Error(unknownError);
    });

    cordeClient.awaitMessagesFromTestingBot = jest
      .fn()
      .mockReturnValue(mockDiscord.messageCollection.array()[1]);

    const report = await toReturn(
      reportModel.commandName,
      reportModel.isNot,
      cordeClient,
      reportModel.expectation,
    );

    expect(report).toEqual(reportModel);
  });

  it("should return failed test with a string message as content and isNot = true", async () => {
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const reportModel = new TestReport({
      commandName: "hello",
      expectation: mockDiscord.messageCollection.array()[0].content,
      output: mockDiscord.messageCollection.array()[1].content,
      isNot: true,
      hasPassed: true,
      showExpectAndOutputValue: true,
    });

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    jest
      .spyOn(cordeClient, "awaitMessagesFromTestingBot")
      .mockReturnValue(Promise.resolve(mockDiscord.messageCollection.array()[1]));

    const report = await toReturn(
      reportModel.commandName,
      reportModel.isNot,
      cordeClient,
      reportModel.expectation,
    );

    expect(report).toEqual(reportModel);
  });

  it("should return a failed test with a string message as content and isNot = true", async () => {
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const reportModel = new TestReport({
      commandName: "hello",
      expectation: mockDiscord.messageCollection.array()[0].content,
      output: mockDiscord.messageCollection.array()[0].content,
      isNot: true,
      hasPassed: false,
      showExpectAndOutputValue: true,
    });

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    jest
      .spyOn(cordeClient, "awaitMessagesFromTestingBot")
      .mockReturnValue(Promise.resolve(mockDiscord.messageCollection.array()[0]));

    const report = await toReturn(
      reportModel.commandName,
      reportModel.isNot,
      cordeClient,
      reportModel.expectation,
    );

    expect(report).toEqual(reportModel);
  });

  it("should return a failed test with a string message as content", async () => {
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const reportModel = new TestReport({
      commandName: "hello",
      expectation: mockDiscord.messageCollection.array()[1].content,
      output: mockDiscord.messageCollection.array()[0].content,
      isNot: false,
      hasPassed: false,
      showExpectAndOutputValue: true,
    });

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);

    jest
      .spyOn(cordeClient, "awaitMessagesFromTestingBot")
      .mockReturnValue(Promise.resolve(mockDiscord.messageCollection.array()[0]));

    const report = await toReturn(
      reportModel.commandName,
      false,
      cordeClient,
      reportModel.expectation,
    );

    expect(report).toEqual(reportModel);
  });

  it("should return a passed test with embed message as content", async () => {
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const reportModel = new TestReport({
      commandName: "hello",
      expectation: mockDiscord.messageEmbed,
      output: JSON.stringify(mockDiscord.messageEmbed),
      isNot: false,
      hasPassed: true,
      showExpectAndOutputValue: false,
    });

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    mockDiscord.message.embeds.push(mockDiscord.messageEmbed);
    cordeClient.awaitMessagesFromTestingBot = jest.fn().mockReturnValue(mockDiscord.message);

    const report = await toReturn(
      reportModel.commandName,
      false,
      cordeClient,
      reportModel.expectation,
    );

    expect(report).toEqual(reportModel);
  });

  it("should return a failed test with embed message as content", async () => {
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const reportModel = new TestReport({
      commandName: "hello",
      expectation: mockDiscord.messageEmbed,
      output: JSON.stringify(mockDiscord.get(mockDiscord.messageEmbedCollection, 1)),
      isNot: false,
      hasPassed: false,
      showExpectAndOutputValue: false,
    });

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    mockDiscord.message.embeds.push(mockDiscord.get(mockDiscord.messageEmbedCollection, 1));
    cordeClient.awaitMessagesFromTestingBot = jest.fn().mockReturnValue(mockDiscord.message);

    const report = await toReturn(
      reportModel.commandName,
      false,
      cordeClient,
      reportModel.expectation,
    );

    expect(report).toEqual(reportModel);
  });
});
