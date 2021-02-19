import MockDiscord from "../../mocks/mockDiscord";
import { initCordeClientWithChannel } from "../../testHelper";
import { Client, Collection, MessageReaction } from "discord.js";
import { TimeoutError } from "../../../src/errors";
import { ToAddReaction } from "../../../src/expect/matches";
import { TestReport } from "../../../src/types";

describe("testing toAddReaction function", () => {
  let mockDiscord = new MockDiscord();
  afterEach(() => {
    mockDiscord = new MockDiscord();
  });

  it("should return a passed test with isNot = false", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);

    const reportModel: TestReport = {
      commandName: "hello",
      expectation: mockDiscord.messageReaction.emoji.name,
      output: mockDiscord.messageReaction.emoji.name,
      isNot: false,
      hasPassed: true,
    };

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    cordeClient.waitForAddedReactions = jest
      .fn()
      .mockReturnValue(mockDiscord.messageReactionCollection);

    mockDiscord.message.reactions.cache = mockDiscord.messageReactionCollection;

    const toAddReaction = new ToAddReaction(
      cordeClient,
      reportModel.commandName,
      reportModel.isNot,
    );
    const report = await toAddReaction.action([mockDiscord.messageReaction.emoji.name]);
    expect(report).toMatchObject(reportModel);
  });

  it("should return a passed test with isNot = false and array with 2 reactions", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);

    const reportModel: TestReport = {
      commandName: "hello",
      expectation: ["🥵", "🥶"].join(),
      output: ["🥵", "🥶"].join(),
      isNot: false,
      hasPassed: true,
    };

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    cordeClient.waitForAddedReactions = jest
      .fn()
      .mockReturnValue(mockDiscord.messageReactionCollection);

    mockDiscord.message.reactions.cache = new Collection<string, MessageReaction>();
    mockDiscord.message.reactions.cache.set("🥵", mockDiscord.createMockMessageReaction("🥵"));
    mockDiscord.message.reactions.cache.set("🥶", mockDiscord.createMockMessageReaction("🥶"));

    const toAddReaction = new ToAddReaction(
      cordeClient,
      reportModel.commandName,
      reportModel.isNot,
    );
    const report = await toAddReaction.action(["🥵", "🥶"]);
    expect(report).toMatchObject(reportModel);
  });

  it("should return a passed test with isNot = true and array with 2 reactions", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);

    const reportModel: TestReport = {
      commandName: "hello",
      expectation: ["🤯", "🥶"].join(),
      output: ["🥵", "🥶"].join(),
      isNot: true,
      hasPassed: true,
    };

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    cordeClient.waitForAddedReactions = jest
      .fn()
      .mockReturnValue(mockDiscord.messageReactionCollection);

    mockDiscord.message.reactions.cache = new Collection<string, MessageReaction>();
    mockDiscord.message.reactions.cache.set("🥵", mockDiscord.createMockMessageReaction("🥵"));
    mockDiscord.message.reactions.cache.set("🥶", mockDiscord.createMockMessageReaction("🥶"));

    const toAddReaction = new ToAddReaction(
      cordeClient,
      reportModel.commandName,
      reportModel.isNot,
    );
    const report = await toAddReaction.action(["🤯", "🥶"]);

    expect(report).toMatchObject(reportModel);
  });

  it("should return a passed test with isNot = true and array with 2 reactions", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);

    const reportModel: TestReport = {
      commandName: "hello",
      expectation: ["🤯", "🥶"].join(),
      output: ["🥵", "🥶"].join(),
      isNot: true,
      hasPassed: true,
    };

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    cordeClient.waitForAddedReactions = jest
      .fn()
      .mockReturnValue(mockDiscord.messageReactionCollection);

    mockDiscord.message.reactions.cache = new Collection<string, MessageReaction>();
    mockDiscord.message.reactions.cache.set("🥵", mockDiscord.createMockMessageReaction("🥵"));
    mockDiscord.message.reactions.cache.set("🥶", mockDiscord.createMockMessageReaction("🥶"));

    const toAddReaction = new ToAddReaction(
      cordeClient,
      reportModel.commandName,
      reportModel.isNot,
    );
    const report = await toAddReaction.action(["🤯", "🥶"]);

    expect(report).toMatchObject(reportModel);
  });

  it("should return a failed test with isNot = false and array with 2 reactions", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);

    const reportModel: TestReport = {
      commandName: "hello",
      expectation: ["🤯", "😎"].join(),
      output: ["🥵", "🥶"].join(),
      isNot: false,
      hasPassed: false,
    };

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    cordeClient.waitForAddedReactions = jest
      .fn()
      .mockReturnValue(mockDiscord.messageReactionCollection);

    mockDiscord.message.reactions.cache = new Collection<string, MessageReaction>();
    mockDiscord.message.reactions.cache.set("🥵", mockDiscord.createMockMessageReaction("🥵"));
    mockDiscord.message.reactions.cache.set("🥶", mockDiscord.createMockMessageReaction("🥶"));

    const toAddReaction = new ToAddReaction(
      cordeClient,
      reportModel.commandName,
      reportModel.isNot,
    );
    const report = await toAddReaction.action(["🤯", "😎"]);

    expect(report).toMatchObject(reportModel);
  });

  it("should return a failed test with isNot = true and array with 2 reactions", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);
    const emojis = ["🥵", "🥶"];
    const reportModel: TestReport = {
      commandName: "hello",
      expectation: emojis.join(),
      output: ["🥵", "🥶"].join(),
      isNot: true,
      hasPassed: false,
    };

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    cordeClient.waitForAddedReactions = jest
      .fn()
      .mockReturnValue(mockDiscord.messageReactionCollection);

    mockDiscord.message.reactions.cache = new Collection<string, MessageReaction>();
    mockDiscord.message.reactions.cache.set("🥵", mockDiscord.createMockMessageReaction("🥵"));
    mockDiscord.message.reactions.cache.set("🥶", mockDiscord.createMockMessageReaction("🥶"));

    const toAddReaction = new ToAddReaction(
      cordeClient,
      reportModel.commandName,
      reportModel.isNot,
    );

    const report = await toAddReaction.action(emojis);

    expect(report).toMatchObject(reportModel);
  });

  it("should return a failed test with isNot = false", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);

    const reportModel: TestReport = {
      commandName: "hello",
      expectation: "😵",
      output: mockDiscord.messageReaction.emoji.name,
      isNot: false,
      hasPassed: false,
    };

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    cordeClient.waitForAddedReactions = jest
      .fn()
      .mockReturnValue(mockDiscord.messageReactionCollection);

    mockDiscord.message.reactions.cache = mockDiscord.messageReactionCollection;

    const toAddReaction = new ToAddReaction(
      cordeClient,
      reportModel.commandName,
      reportModel.isNot,
    );
    const report = await toAddReaction.action([reportModel.expectation as string]);

    expect(report).toMatchObject(reportModel);
  });

  it("should return a passed test with isNot = true", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);

    const reportModel: TestReport = {
      commandName: "hello",
      expectation: "😵",
      output: "🤐",
      isNot: true,
      hasPassed: true,
    };

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);

    const collection = new Collection<string, MessageReaction>();
    collection.set(
      mockDiscord.isolatedMessageReaction.emoji.name,
      mockDiscord.isolatedMessageReaction,
    );

    mockDiscord.isolatedMessageReaction.emoji.name = "🤐";
    mockDiscord.message.reactions.cache = collection;

    cordeClient.waitForAddedReactions = jest.fn().mockReturnValue(collection);

    const toAddReaction = new ToAddReaction(
      cordeClient,
      reportModel.commandName,
      reportModel.isNot,
    );
    const report = await toAddReaction.action([reportModel.expectation as string]);
    expect(report).toMatchObject(reportModel);
  });

  it("should return a failed test with isNot = true", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);

    const reportModel: TestReport = {
      commandName: "hello",
      expectation: "🤐",
      output: "🤐",
      isNot: true,
      hasPassed: true,
    };

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);

    const collection = new Collection<string, MessageReaction>();
    collection.set(
      mockDiscord.isolatedMessageReaction.emoji.name,
      mockDiscord.isolatedMessageReaction,
    );

    mockDiscord.isolatedMessageReaction.emoji.name = "🤐";
    mockDiscord.message.reactions.cache = collection;

    cordeClient.waitForAddedReactions = jest.fn().mockReturnValue(collection);

    const toAddReaction = new ToAddReaction(
      cordeClient,
      reportModel.commandName,
      reportModel.isNot,
    );
    const report = await toAddReaction.action([reportModel.expectation as string]);
    expect(report).toMatchObject(reportModel);
  });

  it("should return a failed test due to timeout and isNot = false", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 100);
    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);

    const timeout = new TimeoutError();
    const reportModel: TestReport = {
      commandName: "hello",
      expectation: "🤐",
      output: timeout.message,
      isNot: false,
      hasPassed: false,
    };

    const toAddReaction = new ToAddReaction(
      cordeClient,
      reportModel.commandName,
      reportModel.isNot,
    );
    const report = await toAddReaction.action([reportModel.expectation as string]);

    expect(report).toMatchObject(reportModel);
  });

  it("should return a failed test due to unkown error and isNot = false", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);

    const unkownError = "unknown";
    const reportModel: TestReport = {
      commandName: "hello",
      expectation: "🤐",
      output: unkownError,
      isNot: false,
      hasPassed: false,
    };

    cordeClient.sendTextMessage = jest.fn().mockImplementation(() => {
      throw new Error(unkownError);
    });

    const toAddReaction = new ToAddReaction(
      cordeClient,
      reportModel.commandName,
      reportModel.isNot,
    );
    const report = await toAddReaction.action([reportModel.expectation as string]);
    expect(report).toMatchObject(reportModel);
  });

  it("should return a failed test due to timeout and isNot = true", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);
    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);

    const timeout = new TimeoutError();
    const reportModel: TestReport = {
      commandName: "hello",
      expectation: "🤐",
      output: timeout.message,
      isNot: true,
      hasPassed: false,
    };

    const toAddReaction = new ToAddReaction(
      cordeClient,
      reportModel.commandName,
      reportModel.isNot,
    );
    const report = await toAddReaction.action([reportModel.expectation as string]);

    expect(report).toMatchObject(reportModel);
  });
});
