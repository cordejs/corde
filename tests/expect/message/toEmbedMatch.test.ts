import { Client } from "discord.js";
import MockDiscord from "../../mocks/mockDiscord";
import { createCordeBotWithMockedFunctions, testUtils } from "../../testHelper";
import { MockEvents } from "../../mocks/mockEvents";
import { ICordeBot, IMessageEmbed, ITestReport } from "../../../src/types";
import { ToEmbedMatch } from "../../../src/expect/matches";
import { buildReportMessage, diff, formatObject, typeOf } from "../../../src/utils";
import { runtime } from "../../../src/common/runtime";

let mockDiscord = new MockDiscord();

describe("testing toEmbedMatch", () => {
  afterEach(() => {
    mockDiscord = new MockDiscord();
  });

  function initTestClass(cordeBot: ICordeBot, isNot: boolean) {
    return testUtils.initTestClass(ToEmbedMatch, {
      isCascade: false,
      command: "toEmbedMatch",
      cordeBot: cordeBot,
      isNot: isNot,
    });
  }

  function mockEmbedMessageAndInitClass(isnot = false) {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const events = new MockEvents(cordeClient, mockDiscord);
    mockDiscord.message.embeds.push(mockDiscord.messageEmbed);
    events.mockOnceMessage(mockDiscord.message);

    return initTestClass(cordeClient, isnot);
  }

  it("should return a failed test due to invalid parameter (null)", async () => {
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const parameter = null;

    const message = buildReportMessage(
      "expected: parameter to be an object of type IMesageEmbed \n",
      `received: ${typeOf(parameter)}`,
    );

    const toEmbedMatch = initTestClass(cordeClient, false);

    const report = await toEmbedMatch.action(parameter);

    const reportModel: ITestReport = {
      pass: false,
      testName: toEmbedMatch.toString(),
      message,
    };

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to bot returned equal messages that matches", async () => {
    const toEmbedMatch = mockEmbedMessageAndInitClass();

    const reportModel: ITestReport = {
      pass: true,
      testName: toEmbedMatch.toString(),
    };

    const report = await toEmbedMatch.action({
      author: mockDiscord.messageEmbedLike.author,
    });

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get failed test due to bot returned equal messages that matches isnot(true)", async () => {
    const toEmbedMatch = mockEmbedMessageAndInitClass(true);

    const reportModel: ITestReport = {
      pass: false,
      testName: toEmbedMatch.toString(),
      message: buildReportMessage(
        "expected: embed message from bot do not match with expectation\n",
        "received: both returned and expectation embed messages matches",
      ),
    };

    const report = await toEmbedMatch.action({
      author: mockDiscord.messageEmbedLike.author,
    });

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });
});
