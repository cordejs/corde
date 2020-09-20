import { toAddReaction } from "../../../src/api/expectMatches/message";
import MockDiscord from "../../mocks/mockDiscord";
import { initCordeClientWithChannel } from "../../testHelper";
import { Client, Collection, MessageReaction } from "discord.js";
import { TestReport } from "../../../src/api/interfaces";
import { TimeoutError } from "../../../src/errors";

describe("testing toAddReaction function", () => {
  let mockDiscord = new MockDiscord();
  afterEach(() => {
    mockDiscord = new MockDiscord();
  });

  it("should return a passed test with isNot = false", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);

    const reportModel = new TestReport({
      commandName: "hello",
      expectation: mockDiscord.messageReaction.emoji.name,
      output: mockDiscord.messageReaction.emoji.name,
      isNot: false,
      hasPassed: true,
      showExpectAndOutputValue: false,
    });

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    cordeClient.waitForAddedReactions = jest
      .fn()
      .mockReturnValue(mockDiscord.messageReactionCollection);

    mockDiscord.message.reactions.cache = mockDiscord.messageReactionCollection;

    const report = await toAddReaction(reportModel.commandName, reportModel.isNot, cordeClient, [
      mockDiscord.messageReaction.emoji.name,
    ]);

    expect(report).toEqual(reportModel);
  });

  it("should return a passed test with isNot = false and array with 2 reactions", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);

    const reportModel = new TestReport({
      commandName: "hello",
      expectation: ["🥵", "🥶"].join(),
      output: ["🥵", "🥶"].join(),
      isNot: false,
      hasPassed: true,
      showExpectAndOutputValue: false,
    });

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    cordeClient.waitForAddedReactions = jest
      .fn()
      .mockReturnValue(mockDiscord.messageReactionCollection);

    mockDiscord.message.reactions.cache = new Collection<string, MessageReaction>();
    mockDiscord.message.reactions.cache.set("🥵", mockDiscord.createMockMessageReaction("🥵"));
    mockDiscord.message.reactions.cache.set("🥶", mockDiscord.createMockMessageReaction("🥶"));

    const report = await toAddReaction(reportModel.commandName, reportModel.isNot, cordeClient, [
      "🥵",
      "🥶",
    ]);

    expect(report).toEqual(reportModel);
  });

  it("should return a passed test with isNot = true and array with 2 reactions", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);

    const reportModel = new TestReport({
      commandName: "hello",
      expectation: ["🤯", "🥶"].join(),
      output: ["🥵", "🥶"].join(),
      isNot: true,
      hasPassed: true,
      showExpectAndOutputValue: false,
    });

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    cordeClient.waitForAddedReactions = jest
      .fn()
      .mockReturnValue(mockDiscord.messageReactionCollection);

    mockDiscord.message.reactions.cache = new Collection<string, MessageReaction>();
    mockDiscord.message.reactions.cache.set("🥵", mockDiscord.createMockMessageReaction("🥵"));
    mockDiscord.message.reactions.cache.set("🥶", mockDiscord.createMockMessageReaction("🥶"));

    const report = await toAddReaction(reportModel.commandName, reportModel.isNot, cordeClient, [
      "🤯",
      "🥶",
    ]);

    expect(report).toEqual(reportModel);
  });

  it("should return a passed test with isNot = true and array with 2 reactions", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);

    const reportModel = new TestReport({
      commandName: "hello",
      expectation: ["🤯", "🥶"].join(),
      output: ["🥵", "🥶"].join(),
      isNot: true,
      hasPassed: true,
      showExpectAndOutputValue: false,
    });

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    cordeClient.waitForAddedReactions = jest
      .fn()
      .mockReturnValue(mockDiscord.messageReactionCollection);

    mockDiscord.message.reactions.cache = new Collection<string, MessageReaction>();
    mockDiscord.message.reactions.cache.set("🥵", mockDiscord.createMockMessageReaction("🥵"));
    mockDiscord.message.reactions.cache.set("🥶", mockDiscord.createMockMessageReaction("🥶"));

    const report = await toAddReaction(reportModel.commandName, reportModel.isNot, cordeClient, [
      "🤯",
      "🥶",
    ]);

    expect(report).toEqual(reportModel);
  });

  it("should return a failed test with isNot = false and array with 2 reactions", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);

    const reportModel = new TestReport({
      commandName: "hello",
      expectation: ["🤯", "😎"].join(),
      output: ["🥵", "🥶"].join(),
      isNot: false,
      hasPassed: false,
      showExpectAndOutputValue: false,
    });

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    cordeClient.waitForAddedReactions = jest
      .fn()
      .mockReturnValue(mockDiscord.messageReactionCollection);

    mockDiscord.message.reactions.cache = new Collection<string, MessageReaction>();
    mockDiscord.message.reactions.cache.set("🥵", mockDiscord.createMockMessageReaction("🥵"));
    mockDiscord.message.reactions.cache.set("🥶", mockDiscord.createMockMessageReaction("🥶"));

    const report = await toAddReaction(reportModel.commandName, reportModel.isNot, cordeClient, [
      "🤯",
      "😎",
    ]);

    expect(report).toEqual(reportModel);
  });

  it("should return a failed test with isNot = true and array with 2 reactions", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);
    const emojis = ["🥵", "🥶"];
    const reportModel = new TestReport({
      commandName: "hello",
      expectation: emojis.join(),
      output: ["🥵", "🥶"].join(),
      isNot: true,
      hasPassed: false,
      showExpectAndOutputValue: false,
    });

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    cordeClient.waitForAddedReactions = jest
      .fn()
      .mockReturnValue(mockDiscord.messageReactionCollection);

    mockDiscord.message.reactions.cache = new Collection<string, MessageReaction>();
    mockDiscord.message.reactions.cache.set("🥵", mockDiscord.createMockMessageReaction("🥵"));
    mockDiscord.message.reactions.cache.set("🥶", mockDiscord.createMockMessageReaction("🥶"));

    const report = await toAddReaction(
      reportModel.commandName,
      reportModel.isNot,
      cordeClient,
      emojis,
    );

    expect(report).toEqual(reportModel);
  });

  it("should return a failed test with isNot = false", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);

    const reportModel = new TestReport({
      commandName: "hello",
      expectation: "😵",
      output: mockDiscord.messageReaction.emoji.name,
      isNot: false,
      hasPassed: false,
      showExpectAndOutputValue: false,
    });

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    cordeClient.waitForAddedReactions = jest
      .fn()
      .mockReturnValue(mockDiscord.messageReactionCollection);

    mockDiscord.message.reactions.cache = mockDiscord.messageReactionCollection;

    const report = await toAddReaction(reportModel.commandName, reportModel.isNot, cordeClient, [
      reportModel.expectation as string,
    ]);

    expect(report).toEqual(reportModel);
  });

  it("should return a passed test with isNot = true", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);

    const reportModel = new TestReport({
      commandName: "hello",
      expectation: "😵",
      output: "🤐",
      isNot: true,
      hasPassed: true,
      showExpectAndOutputValue: false,
    });

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);

    const collection = new Collection<string, MessageReaction>();
    collection.set(
      mockDiscord.isolatedMessageReaction.emoji.name,
      mockDiscord.isolatedMessageReaction,
    );
    mockDiscord.isolatedMessageReaction.emoji.name = "🤐";

    mockDiscord.message.reactions.cache = collection;

    cordeClient.waitForAddedReactions = jest.fn().mockReturnValue(collection);

    const report = await toAddReaction(reportModel.commandName, reportModel.isNot, cordeClient, [
      reportModel.expectation as string,
    ]);

    expect(report).toEqual(reportModel);
  });

  it("should return a failed test with isNot = true", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);

    const reportModel = new TestReport({
      commandName: "hello",
      expectation: "🤐",
      output: "🤐",
      isNot: true,
      hasPassed: true,
      showExpectAndOutputValue: false,
    });

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);

    const collection = new Collection<string, MessageReaction>();
    collection.set(
      mockDiscord.isolatedMessageReaction.emoji.name,
      mockDiscord.isolatedMessageReaction,
    );
    mockDiscord.isolatedMessageReaction.emoji.name = "🤐";

    mockDiscord.message.reactions.cache = collection;

    cordeClient.waitForAddedReactions = jest.fn().mockReturnValue(collection);

    const report = await toAddReaction(reportModel.commandName, reportModel.isNot, cordeClient, [
      reportModel.expectation as string,
    ]);

    expect(report).toEqual(reportModel);
  });

  it("should return a failed test due to timeout and isNot = false", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);

    const timeout = new TimeoutError();
    const reportModel = new TestReport({
      commandName: "hello",
      expectation: "🤐",
      output: timeout.message,
      isNot: false,
      hasPassed: false,
      showExpectAndOutputValue: false,
    });

    const report = await toAddReaction(reportModel.commandName, reportModel.isNot, cordeClient, [
      reportModel.expectation as string,
    ]);

    expect(report).toEqual(reportModel);
  });

  it("should return a failed test due to unkown error and isNot = false", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);

    const unkownError = "unknown";
    const reportModel = new TestReport({
      commandName: "hello",
      expectation: "🤐",
      output: unkownError,
      isNot: false,
      hasPassed: false,
      showExpectAndOutputValue: false,
    });

    cordeClient.sendTextMessage = jest.fn().mockImplementation(() => {
      throw new Error(unkownError);
    });

    const report = await toAddReaction(reportModel.commandName, reportModel.isNot, cordeClient, [
      reportModel.expectation as string,
    ]);

    expect(report).toEqual(reportModel);
  });

  it("should return a failed test due to timeout and isNot = true", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);

    const timeout = new TimeoutError();
    const reportModel = new TestReport({
      commandName: "hello",
      expectation: "🤐",
      output: timeout.message,
      isNot: true,
      hasPassed: false,
      showExpectAndOutputValue: false,
    });

    const report = await toAddReaction(reportModel.commandName, reportModel.isNot, cordeClient, [
      reportModel.expectation as string,
    ]);

    expect(report).toEqual(reportModel);
  });
});
