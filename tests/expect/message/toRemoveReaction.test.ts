import MockDiscord from "../../mocks/mockDiscord";
import { initCordeClientWithChannel } from "../../testHelper";
import { Client } from "discord.js";
import { ToRemoveReaction } from "../../../src/expect/matches";
import { TestReport } from "../../../src/types";
import { buildReportMessage, typeOf } from "../../../src/utils";
import { MockEvents } from "../../mocks/mockEvents";
import { runtime } from "../../../src/common";
import { TimeoutError } from "../../../src/errors";

describe("testing toRemoveReaction function", () => {
  let mockDiscord = new MockDiscord();
  afterEach(() => {
    mockDiscord = new MockDiscord();
  });

  it("should fail due to invalid messageData (number)", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);
    const toRemoveReaction = new ToRemoveReaction(cordeClient, "remove", false);
    // @ts-ignore
    const report = await toRemoveReaction.action(["1"], 1);

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
    const toRemoveReaction = new ToRemoveReaction(cordeClient, "remove", false);
    // @ts-ignore
    const report = await toRemoveReaction.action(undefined);

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
    const toRemoveReaction = new ToRemoveReaction(cordeClient, "remove", false);
    // @ts-ignore
    const report = await toRemoveReaction.action(null);

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
    const toRemoveReaction = new ToRemoveReaction(cordeClient, "remove", false);
    // @ts-ignore
    const report = await toRemoveReaction.action({});

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
    events.mockOnceMessageReactionsRemove();

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    const toRemoveReaction = new ToRemoveReaction(cordeClient, "remove", false);

    const reportModel: TestReport = {
      pass: true,
    };

    const report = await toRemoveReaction.action([mockDiscord.messageReaction.emoji.name]);
    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should return a passed test with isNot = true", async () => {
    runtime.setConfigs({ timeOut: 10 }, true);
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);
    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    const toRemoveReaction = new ToRemoveReaction(cordeClient, "remove", true);

    const reportModel: TestReport = {
      pass: true,
    };

    const report = await toRemoveReaction.action([mockDiscord.messageReaction.emoji.name]);
    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test with isNot = false", async () => {
    runtime.setConfigs({ timeOut: 10 }, true);
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);
    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    const toRemoveReaction = new ToRemoveReaction(cordeClient, "remove", false);

    const reportModel: TestReport = {
      pass: false,
      message: buildReportMessage(
        `expected: to remove reactions ${[mockDiscord.messageReaction.emoji.name].join(", ")}\n`,
        `received: no reaction was removed to message`,
      ),
    };

    const report = await toRemoveReaction.action([mockDiscord.messageReaction.emoji.name]);
    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test with isNot = false and timeout", async () => {
    runtime.setConfigs({ timeOut: 10 });
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);
    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageReactionsRemoveToReject();
    const toRemoveReaction = new ToRemoveReaction(cordeClient, "remove", false);

    const reportModel: TestReport = {
      pass: false,
      message: buildReportMessage(
        `expected: to remove reactions ${[mockDiscord.messageReaction.emoji.name].join(", ")}\n`,
        `received: ${[mockDiscord.messageReaction.emoji.name].join(", ")}`,
      ),
    };

    const report = await toRemoveReaction.action([mockDiscord.messageReaction.emoji.name]);
    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should return a passed test with isNot = false", async () => {
    runtime.setConfigs({ timeOut: 10 });
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);
    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageReactionsRemove();
    const toRemoveReaction = new ToRemoveReaction(cordeClient, "remove", false);

    const reportModel: TestReport = {
      pass: true,
    };

    const report = await toRemoveReaction.action([mockDiscord.messageReaction.emoji.name]);
    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test with isNot = true", async () => {
    runtime.setConfigs({ timeOut: 10 });
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);
    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageReactionsRemove();
    const toRemoveReaction = new ToRemoveReaction(cordeClient, "remove", true);

    const reportModel: TestReport = {
      pass: false,
      message: buildReportMessage(
        `expected: not to remove reactions ${[mockDiscord.messageReaction.emoji.name].join(
          ", ",
        )}\n`,
        `received: ${[mockDiscord.messageReaction.emoji.name].join(", ")}`,
      ),
    };

    const report = await toRemoveReaction.action([mockDiscord.messageReaction.emoji.name]);
    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });
});
