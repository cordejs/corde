import { toReturn } from "../../../src/api/expectMatches/message/toReturn";
import { Client, CollectorFilter } from "discord.js";
import { TestReport } from "../../../src/api/interfaces";
import MockDiscord from "../../mocks/mockDiscord";
import { initCordeClientWithChannel } from "../../testHelper";

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

    expect(report.hasPassed()).toBeTruthy();
    expect(report).toEqual(reportModel);
  });

  it("should return a passed test with a string message as content and isNot = true", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);

    const reportModel = new TestReport({
      commandName: "hello",
      expectation: mockDiscord.messageCollection.array()[0].content,
      output: mockDiscord.messageCollection.array()[1].content,
      isNot: true,
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

    expect(report.hasPassed()).toBeTruthy();
    expect(report).toEqual(reportModel);
  });

  it("should return a failed test with a string message as content and isNot = true", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);

    const reportModel = new TestReport({
      commandName: "hello",
      expectation: mockDiscord.messageCollection.array()[0].content,
      output: mockDiscord.messageCollection.array()[0].content,
      isNot: true,
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

    expect(report.hasPassed()).toBeFalsy();
    expect(report).toEqual(reportModel);
  });

  it("should return a failed test with a string message as content", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);

    const reportModel = new TestReport({
      commandName: "hello",
      expectation: mockDiscord.messageCollection.array()[1].content,
      output: mockDiscord.messageCollection.array()[0].content,
      isNot: false,
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

    expect(report.hasPassed()).toBeFalsy();
    expect(report).toEqual(reportModel);
  });

  it("should return a passed test with embed message as content", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);

    const reportModel = new TestReport({
      commandName: "hello",
      expectation: mockDiscord.messageEmbed,
      output: JSON.stringify(mockDiscord.messageEmbed),
      isNot: false,
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

    // In this case, the mocked value has not the same treatment that
    // messages of type 'embed'
    expect(report.hasPassed()).toBeFalsy();
    expect(report).toEqual(reportModel);
  });

  it("should return a failed test with embed message as content", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);

    const reportModel = new TestReport({
      commandName: "hello",
      expectation: mockDiscord.messageEmbed,
      output: JSON.stringify(mockDiscord.get(mockDiscord.messageEmbedCollection, 1)),
      isNot: false,
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

    // In this case, the mocked value has not the same treatment that
    // messages of type 'embed'
    expect(report.hasPassed()).toBeFalsy();
    expect(report).toEqual(reportModel);
  });
});
