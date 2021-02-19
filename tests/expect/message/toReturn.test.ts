import { Client } from "discord.js";
import MockDiscord from "../../mocks/mockDiscord";
import { createCordeBotWithMockedFunctions } from "../../testHelper";
import { TimeoutError } from "rxjs";
import { TestReport } from "../../../src/types";
import { ToReturn } from "../../../src/expect/matches";

let mockDiscord = new MockDiscord();

// Mocking wait function
jest.mock("../../../src/utils");

describe("testing toReturn", () => {
  afterEach(() => {
    mockDiscord = new MockDiscord();
  });

  it("should return a passed test with a string message as content", async () => {
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const reportModel: TestReport = {
      commandName: "hello",
      expectation: mockDiscord.messageCollection.array()[1].content,
      output: mockDiscord.messageCollection.array()[1].content,
      isNot: false,
      hasPassed: true,
      showExpectAndOutputValue: true,
    };

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    cordeClient.awaitMessagesFromTestingBot = jest
      .fn()
      .mockReturnValue(Promise.resolve(mockDiscord.messageCollection.array()[1]));

    const toReturn = new ToReturn(cordeClient, reportModel.commandName, false);
    const report = await toReturn.action(reportModel.expectation);
    expect(report).toMatchObject(reportModel);
  });

  it("should return a failed test due to timeout with isNot = false", async () => {
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const timeout = new TimeoutError();
    const reportModel: TestReport = {
      commandName: "hello",
      expectation: mockDiscord.messageCollection.array()[1].content,
      output: timeout.message,
      isNot: false,
      hasPassed: false,
      showExpectAndOutputValue: true,
    };

    jest.spyOn(cordeClient, "awaitMessagesFromTestingBot").mockImplementation(() => {
      throw new TimeoutError();
    });

    const toReturn = new ToReturn(cordeClient, reportModel.commandName, false);
    const report = await toReturn.action(reportModel.expectation);
    expect(report).toMatchObject(reportModel);
  });

  it("should return a failed test due to a not known error with isNot = true", async () => {
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const unknownError = "unknown";
    const isNot = true;
    const reportModel: TestReport = {
      commandName: "hello",
      expectation: mockDiscord.messageCollection.array()[1].content,
      output: unknownError,
      isNot: isNot,
      hasPassed: false,
      showExpectAndOutputValue: true,
    };

    cordeClient.sendTextMessage = jest.fn().mockImplementation(() => {
      throw new Error(unknownError);
    });

    cordeClient.awaitMessagesFromTestingBot = jest
      .fn()
      .mockReturnValue(mockDiscord.messageCollection.array()[1]);

    const toReturn = new ToReturn(cordeClient, reportModel.commandName, isNot);
    const report = await toReturn.action(reportModel.expectation);
    expect(report).toMatchObject(reportModel);
  });

  it("should return failed test with a string message as content and isNot = true", async () => {
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const isNot = true;
    const reportModel: TestReport = {
      commandName: "hello",
      expectation: mockDiscord.messageCollection.array()[0].content,
      output: mockDiscord.messageCollection.array()[1].content,
      isNot: isNot,
      hasPassed: true,
      showExpectAndOutputValue: true,
    };

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    jest
      .spyOn(cordeClient, "awaitMessagesFromTestingBot")
      .mockReturnValue(Promise.resolve(mockDiscord.messageCollection.array()[1]));

    const toReturn = new ToReturn(cordeClient, reportModel.commandName, isNot);
    const report = await toReturn.action(reportModel.expectation);
    expect(report).toMatchObject(reportModel);
  });

  it("should return a failed test with a string message as content and isNot = true", async () => {
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const isNot = true;
    const reportModel: TestReport = {
      commandName: "hello",
      expectation: mockDiscord.messageCollection.array()[0].content,
      output: mockDiscord.messageCollection.array()[0].content,
      isNot: isNot,
      hasPassed: false,
      showExpectAndOutputValue: true,
    };

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    jest
      .spyOn(cordeClient, "awaitMessagesFromTestingBot")
      .mockReturnValue(Promise.resolve(mockDiscord.messageCollection.array()[0]));

    const toReturn = new ToReturn(cordeClient, reportModel.commandName, isNot);
    const report = await toReturn.action(reportModel.expectation);
    expect(report).toMatchObject(reportModel);
  });

  it("should return a failed test with a string message as content", async () => {
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const reportModel: TestReport = {
      commandName: "hello",
      expectation: mockDiscord.messageCollection.array()[1].content,
      output: mockDiscord.messageCollection.array()[0].content,
      isNot: false,
      hasPassed: false,
      showExpectAndOutputValue: true,
    };

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);

    jest
      .spyOn(cordeClient, "awaitMessagesFromTestingBot")
      .mockReturnValue(Promise.resolve(mockDiscord.messageCollection.array()[0]));

    const toReturn = new ToReturn(cordeClient, reportModel.commandName, false);
    const report = await toReturn.action(reportModel.expectation);
    expect(report).toMatchObject(reportModel);
  });

  it("should return a passed test with embed message as content", async () => {
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const reportModel: TestReport = {
      commandName: "hello",
      expectation: mockDiscord.messageEmbed,
      output: JSON.stringify(mockDiscord.messageEmbed),
      isNot: false,
      hasPassed: true,
      showExpectAndOutputValue: false,
    };

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    mockDiscord.message.embeds.push(mockDiscord.messageEmbed);
    cordeClient.awaitMessagesFromTestingBot = jest.fn().mockReturnValue(mockDiscord.message);

    const toReturn = new ToReturn(cordeClient, reportModel.commandName, false);
    const report = await toReturn.action(reportModel.expectation);
    expect(report).toMatchObject(reportModel);
  });

  it("should return a failed test with embed message as content", async () => {
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const reportModel: TestReport = {
      commandName: "hello",
      expectation: mockDiscord.messageEmbed,
      output: JSON.stringify(mockDiscord.get(mockDiscord.messageEmbedCollection, 1)),
      isNot: false,
      hasPassed: false,
      showExpectAndOutputValue: false,
    };

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    mockDiscord.message.embeds.push(mockDiscord.get(mockDiscord.messageEmbedCollection, 1));
    cordeClient.awaitMessagesFromTestingBot = jest.fn().mockReturnValue(mockDiscord.message);

    const toReturn = new ToReturn(cordeClient, reportModel.commandName, false);
    const report = await toReturn.action(reportModel.expectation);
    expect(report).toMatchObject(reportModel);
  });
});
