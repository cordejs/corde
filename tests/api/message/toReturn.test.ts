import { toReturn } from "../../../src/api/expectMatches/message/toReturn";
import { Client } from "discord.js";
import { TestReport } from "../../../src/api/interfaces";
import MockDiscord from "../../mocks/mockDiscord";
import { initCordeClientWithChannel } from "../../testHelper";
import { TimeoutError } from "rxjs";

let mockDiscord = new MockDiscord();

describe("testing toReturn", () => {
  afterEach(() => {
    mockDiscord = new MockDiscord();
  });

  it("should return a passed test with a string message as content", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);

    const reportModel = new TestReport({
      commandName: "hello",
      expectation: mockDiscord.messageCollection.array()[1].content,
      output: mockDiscord.messageCollection.array()[1].content,
      isNot: false,
      hasPassed: true,
      showExpectAndOutputValue: true,
    });

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    cordeClient.awaitMessagesFromTestingBot = jest
      .fn()
      .mockReturnValue(mockDiscord.messageCollection.array()[1]);

    const report = await toReturn(
      reportModel.commandName,
      false,
      cordeClient,
      reportModel.expectation,
    );

    expect(report).toEqual(reportModel);
  });

  it("should return a failed test due to timeout with isNot = false", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);

    const timeout = new TimeoutError();
    const reportModel = new TestReport({
      commandName: "hello",
      expectation: mockDiscord.messageCollection.array()[1].content,
      output: timeout.message,
      isNot: false,
      hasPassed: false,
      showExpectAndOutputValue: true,
    });

    const report = await toReturn(
      reportModel.commandName,
      false,
      cordeClient,
      reportModel.expectation,
    );

    expect(report).toEqual(reportModel);
  });

  it("should return a failed test due to timeout with isNot = true", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);

    const timeout = new TimeoutError();
    const reportModel = new TestReport({
      commandName: "hello",
      expectation: mockDiscord.messageCollection.array()[1].content,
      output: timeout.message,
      isNot: true,
      hasPassed: false,
      showExpectAndOutputValue: true,
    });

    const report = await toReturn(
      reportModel.commandName,
      reportModel.isNot,
      cordeClient,
      reportModel.expectation,
    );

    expect(report).toEqual(reportModel);
  });

  it("should return a failed test due to a not known error with isNot = true", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);

    const unkownError = "unkown";
    const reportModel = new TestReport({
      commandName: "hello",
      expectation: mockDiscord.messageCollection.array()[1].content,
      output: unkownError,
      isNot: true,
      hasPassed: false,
      showExpectAndOutputValue: true,
    });

    cordeClient.sendTextMessage = jest.fn().mockImplementation(() => {
      throw new Error(unkownError);
    });

    const report = await toReturn(
      reportModel.commandName,
      reportModel.isNot,
      cordeClient,
      reportModel.expectation,
    );

    expect(report).toEqual(reportModel);
  });

  it("should return failed test with a string message as content and isNot = true", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);

    const reportModel = new TestReport({
      commandName: "hello",
      expectation: mockDiscord.messageCollection.array()[0].content,
      output: mockDiscord.messageCollection.array()[1].content,
      isNot: true,
      hasPassed: true,
      showExpectAndOutputValue: true,
    });

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
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

  it("should return a failed test with a string message as content and isNot = true", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);

    const reportModel = new TestReport({
      commandName: "hello",
      expectation: mockDiscord.messageCollection.array()[0].content,
      output: mockDiscord.messageCollection.array()[0].content,
      isNot: true,
      hasPassed: false,
      showExpectAndOutputValue: true,
    });

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    cordeClient.awaitMessagesFromTestingBot = jest
      .fn()
      .mockReturnValue(mockDiscord.messageCollection.array()[0]);

    const report = await toReturn(
      reportModel.commandName,
      reportModel.isNot,
      cordeClient,
      reportModel.expectation,
    );

    expect(report).toEqual(reportModel);
  });

  it("should return a failed test with a string message as content", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);

    const reportModel = new TestReport({
      commandName: "hello",
      expectation: mockDiscord.messageCollection.array()[1].content,
      output: mockDiscord.messageCollection.array()[0].content,
      isNot: false,
      hasPassed: false,
      showExpectAndOutputValue: true,
    });

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    cordeClient.awaitMessagesFromTestingBot = jest
      .fn()
      .mockReturnValue(mockDiscord.messageCollection.array()[0]);

    const report = await toReturn(
      reportModel.commandName,
      false,
      cordeClient,
      reportModel.expectation,
    );

    expect(report).toEqual(reportModel);
  });

  it("should return a passed test with embed message as content", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);

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
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);

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
