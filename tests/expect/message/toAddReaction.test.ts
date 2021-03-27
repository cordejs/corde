import MockDiscord from "../../mocks/mockDiscord";
import { initCordeClientWithChannel } from "../../testHelper";
import { Client } from "discord.js";
import { ToAddReaction } from "../../../src/expect/matches";
import { TestReport } from "../../../src/types";
import { buildReportMessage, typeOf } from "../../../src/utils";
import { MockEvents } from "../../mocks/mockEvents";
import * as a from "../../../src/core";
import { runtime } from "../../../src/common";

describe("testing toAddReaction function", () => {
  let mockDiscord = new MockDiscord();
  afterEach(() => {
    mockDiscord = new MockDiscord();
  });

  it("should fail due to invalid messageIdentifier (number)", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);
    const toAddReaction = new ToAddReaction(cordeClient, "add", false);
    // @ts-ignore
    const report = await toAddReaction.action(["1"], 1);

    const expectedReport: TestReport = {
      pass: false,
      message: buildReportMessage(
        `expect: message data to be null, undefined, string or an object with id or text properties\n`,
        `received: ${typeOf(1)}`,
      ),
    };

    expect(report).toEqual(expectedReport);
    expect(report).toMatchSnapshot();
  });

  it("should fail due to invalid emoji (undefined)", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);
    const toAddReaction = new ToAddReaction(cordeClient, "add", false);
    // @ts-ignore
    const report = await toAddReaction.action(undefined);

    const expectedReport: TestReport = {
      pass: false,
      message: buildReportMessage(
        `expected: emojis parameter to be an array with string or objects\n`,
        `received: ${typeOf(undefined)}`,
      ),
    };

    expect(report).toEqual(expectedReport);
    expect(report).toMatchSnapshot();
  });

  it("should fail due to invalid emoji (null)", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);
    const toAddReaction = new ToAddReaction(cordeClient, "add", false);
    // @ts-ignore
    const report = await toAddReaction.action(null);

    const expectedReport: TestReport = {
      pass: false,
      message: buildReportMessage(
        `expected: emojis parameter to be an array with string or objects\n`,
        `received: ${typeOf(null)}`,
      ),
    };

    expect(report).toEqual(expectedReport);
    expect(report).toMatchSnapshot();
  });

  it("should fail due to invalid emoji (object)", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);
    const toAddReaction = new ToAddReaction(cordeClient, "add", false);
    // @ts-ignore
    const report = await toAddReaction.action({});

    const expectedReport: TestReport = {
      pass: false,
      message: buildReportMessage(
        `expected: emojis parameter to be an array with string or objects\n`,
        `received: ${typeOf({})}`,
      ),
    };

    expect(report).toEqual(expectedReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a passed test with isNot = false", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);
    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageReactionsAdd();

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    const toAddReaction = new ToAddReaction(cordeClient, "add", false);

    const reportModel: TestReport = {
      pass: true,
    };

    const report = await toAddReaction.action([mockDiscord.messageReaction.emoji.name]);
    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should return a passed test with isNot = true", async () => {
    runtime.setConfigs({ timeOut: 10 }, true);
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);
    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    const toAddReaction = new ToAddReaction(cordeClient, "add", true);

    const reportModel: TestReport = {
      pass: true,
    };

    const report = await toAddReaction.action([mockDiscord.messageReaction.emoji.name]);
    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test with isNot = false", async () => {
    runtime.setConfigs({ timeOut: 10 }, true);
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);
    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    const toAddReaction = new ToAddReaction(cordeClient, "add", false);

    const reportModel: TestReport = {
      pass: false,
      message: buildReportMessage(
        `expected: to add reactions ${[mockDiscord.messageReaction.emoji.name].join(", ")}\n`,
        `received: no reaction was added to message`,
      ),
    };

    const report = await toAddReaction.action([mockDiscord.messageReaction.emoji.name]);
    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test with isNot = false and timeout", async () => {
    runtime.setConfigs({ timeOut: 10 });
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);
    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageReactionsAddToReject();
    const toAddReaction = new ToAddReaction(cordeClient, "add", false);

    const reportModel: TestReport = {
      pass: false,
      message: buildReportMessage(
        `expected: to add reactions ${[mockDiscord.messageReaction.emoji.name].join(", ")}\n`,
        `received: ${[mockDiscord.messageReaction.emoji.name].join(", ")}`,
      ),
    };

    const report = await toAddReaction.action([mockDiscord.messageReaction.emoji.name]);
    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should return a passed test with isNot = false", async () => {
    runtime.setConfigs({ timeOut: 10 });
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);
    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageReactionsAdd();
    const toAddReaction = new ToAddReaction(cordeClient, "add", false);

    const reportModel: TestReport = {
      pass: true,
    };

    const report = await toAddReaction.action([mockDiscord.messageReaction.emoji.name]);
    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test with isNot = true", async () => {
    runtime.setConfigs({ timeOut: 10 });
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);
    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageReactionsAdd();
    const toAddReaction = new ToAddReaction(cordeClient, "add", true);

    const reportModel: TestReport = {
      pass: false,
      message: buildReportMessage(
        `expected: not to add reactions ${[mockDiscord.messageReaction.emoji.name].join(", ")}\n`,
        `received: ${[mockDiscord.messageReaction.emoji.name].join(", ")}`,
      ),
    };

    const report = await toAddReaction.action([mockDiscord.messageReaction.emoji.name]);
    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test with isNot = false and emoji object with id and other with name", async () => {
    runtime.setConfigs({ timeOut: 10 });
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);
    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageReactionsRemove();
    const toAddReaction = new ToAddReaction(cordeClient, "remove", false);

    const reportModel: TestReport = {
      pass: false,
      message: buildReportMessage(
        `expected: to add reactions ${[
          mockDiscord.messageReaction.emoji.id,
          mockDiscord.messageReaction.emoji.name,
        ].join(", ")}\n`,
        `received: no reaction was added to message`,
      ),
    };

    const report = await toAddReaction.action([
      { id: mockDiscord.messageReaction.emoji.id },
      { name: mockDiscord.messageReaction.emoji.name },
    ]);
    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });
});
