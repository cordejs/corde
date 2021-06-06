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
      author: mockDiscord.messageEmbedSimple.author,
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
      author: mockDiscord.messageEmbedSimple.author,
    });

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  interface TestOption {
    only?: boolean;
    isNot?: boolean;
    pass?: boolean;
  }

  describe("testing each property of messageEmbed", () => {
    const simpleEmbed = mockDiscord.messageEmbedSimple;
    function testProperty(testName: string, messageEmbed: IMessageEmbed, options?: TestOption) {
      const itFn = options?.only ? it.only : it;

      itFn(testName, async () => {
        const toEmbedMatch = mockEmbedMessageAndInitClass(options?.isNot);
        const reportModel: ITestReport = {
          pass: options?.pass ?? true,
          testName: toEmbedMatch.toString(),
        };

        const report = await toEmbedMatch.action(messageEmbed);

        expect(report).toEqual(reportModel);
        expect(report).toMatchSnapshot();
      });
    }

    testProperty("should get passed due to title match", {
      title: simpleEmbed.title,
    });

    testProperty(
      "should get passed due to title not match (isnot true)",
      {
        title: "",
      },
      {
        isNot: true,
      },
    );

    testProperty("should get passed due to color not match", {
      color: simpleEmbed.color,
    });

    testProperty(
      "should get passed due to color not match (isNot true)",
      {
        color: "",
      },
      {
        isNot: true,
      },
    );

    testProperty("should get passed due to description match", {
      description: simpleEmbed.description,
    });

    testProperty("should get passed due to fields match", {
      fields: simpleEmbed.fields,
    });

    testProperty("should get passed due to files match", {
      files: simpleEmbed.files,
    });

    testProperty("should get passed due to footer match", {
      footer: simpleEmbed.footer,
    });

    testProperty("should get passed due to image match", {
      image: simpleEmbed.image,
    });

    testProperty("should get passed due to thumbnailUrl match", {
      thumbnailUrl: simpleEmbed.thumbnailUrl,
    });

    testProperty("should get passed due to timestamp match", {
      timestamp: simpleEmbed.timestamp,
    });

    testProperty("should get passed due to url match", {
      url: simpleEmbed.url,
    });
  });
});
