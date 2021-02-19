import { initCordeClientWithChannel } from "../../testHelper";
import MockDiscord from "../../mocks/mockDiscord";
import { Client } from "discord.js";
import { TimeoutError } from "rxjs";
import { TestReport } from "../../../src/types";
import { ToRemoveReaction } from "../../../src/expect/matches";

let mockDiscord = new MockDiscord();

// Mocking wait function
jest.mock("../../../src/utils");

describe("testing toRemoveReaction", () => {
  beforeEach(() => {
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

    cordeClient.findMessage = jest.fn().mockReturnValue(mockDiscord.message);
    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    cordeClient.waitForRemovedReactions = jest
      .fn()
      .mockReturnValue(mockDiscord.messageReactionCollection.array());

    const toRemoveReaction = new ToRemoveReaction(
      cordeClient,
      reportModel.commandName,
      reportModel.isNot,
    );
    const report = await toRemoveReaction.action([reportModel.expectation as string]);
    expect(report).toEqual(reportModel);
  });

  it("should return a failed test with isNot = false", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);

    const reportModel: TestReport = {
      commandName: "hello",
      expectation: "🤠",
      output: mockDiscord.messageReaction.emoji.name,
      isNot: false,
      hasPassed: false,
    };

    cordeClient.findMessage = jest.fn().mockReturnValue(mockDiscord.message);
    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    cordeClient.waitForRemovedReactions = jest
      .fn()
      .mockReturnValue(mockDiscord.messageReactionCollection.array());

    const toRemoveReaction = new ToRemoveReaction(
      cordeClient,
      reportModel.commandName,
      reportModel.isNot,
    );
    const report = await toRemoveReaction.action([reportModel.expectation as string]);
    expect(report).toEqual(reportModel);
  });

  it("should return a failed test with isNot = true", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);

    const reportModel: TestReport = {
      commandName: "hello",
      expectation: mockDiscord.messageReaction.emoji.name,
      output: mockDiscord.messageReaction.emoji.name,
      isNot: true,
      hasPassed: false,
    };

    cordeClient.findMessage = jest.fn().mockReturnValue(mockDiscord.message);
    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    cordeClient.waitForRemovedReactions = jest
      .fn()
      .mockReturnValue(mockDiscord.messageReactionCollection.array());

    const toRemoveReaction = new ToRemoveReaction(
      cordeClient,
      reportModel.commandName,
      reportModel.isNot,
    );
    const report = await toRemoveReaction.action([reportModel.expectation as string]);
    expect(report).toEqual(reportModel);
  });

  it("should return a failed test due to timeout and isNot = false", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);
    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    cordeClient.findMessage = jest.fn().mockReturnValue(mockDiscord.message);

    const timeout = new TimeoutError();
    const reportModel: TestReport = {
      commandName: "hello",
      expectation: mockDiscord.messageReaction.emoji.name,
      output: timeout.message,
      isNot: false,
      hasPassed: false,
    };

    const toRemoveReaction = new ToRemoveReaction(
      cordeClient,
      reportModel.commandName,
      reportModel.isNot,
    );
    const report = await toRemoveReaction.action([reportModel.expectation as string]);
    expect(report).toEqual(reportModel);
  });

  it("should return a failed test due to timeout and isNot = true", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);
    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    cordeClient.findMessage = jest.fn().mockReturnValue(mockDiscord.message);

    const timeout = new TimeoutError();
    const reportModel: TestReport = {
      commandName: "hello",
      expectation: mockDiscord.messageReaction.emoji.name,
      output: timeout.message,
      isNot: true,
      hasPassed: false,
    };

    const toRemoveReaction = new ToRemoveReaction(
      cordeClient,
      reportModel.commandName,
      reportModel.isNot,
    );
    const report = await toRemoveReaction.action([reportModel.expectation as string]);
    expect(report).toEqual(reportModel);
  });

  it("should return a failed test due to timeout and isNot = true", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);
    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    cordeClient.findMessage = jest.fn().mockReturnValue(mockDiscord.message);

    const timeout = new TimeoutError();
    const reportModel: TestReport = {
      commandName: "hello",
      expectation: mockDiscord.messageReaction.emoji.name,
      output: timeout.message,
      isNot: true,
      hasPassed: false,
    };

    const toRemoveReaction = new ToRemoveReaction(
      cordeClient,
      reportModel.commandName,
      reportModel.isNot,
    );
    const report = await toRemoveReaction.action([reportModel.expectation as string]);
    expect(report).toEqual(reportModel);
  });

  it("should return a failed test due to timeout and isNot = true", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 500);
    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    cordeClient.findMessage = jest.fn().mockReturnValue(mockDiscord.message);

    const timeout = new TimeoutError();
    const reportModel: TestReport = {
      commandName: "hello",
      expectation: mockDiscord.messageReaction.emoji.name,
      output: timeout.message,
      isNot: true,
      hasPassed: false,
    };

    const toRemoveReaction = new ToRemoveReaction(
      cordeClient,
      reportModel.commandName,
      reportModel.isNot,
    );
    const report = await toRemoveReaction.action([reportModel.expectation as string]);
    expect(report).toEqual(reportModel);
  });

  it("should return a passed test with isNot = false and 2 emojis", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);
    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    cordeClient.findMessage = jest.fn().mockReturnValue(mockDiscord.message);
    cordeClient.waitForRemovedReactions = jest
      .fn()
      .mockReturnValue(mockDiscord.messageReactionCollection.array());

    const reportModel: TestReport = {
      commandName: "hello",
      expectation: mockDiscord.messageReaction.emoji.name,
      output: mockDiscord.messageReaction.emoji.name,
      isNot: true,
      hasPassed: false,
    };

    const toRemoveReaction = new ToRemoveReaction(
      cordeClient,
      reportModel.commandName,
      reportModel.isNot,
    );
    const report = await toRemoveReaction.action([reportModel.expectation as string], {
      id: "123",
    });
    expect(report).toEqual(reportModel);
  });
});
