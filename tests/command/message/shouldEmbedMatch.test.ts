import { Client } from "discord.js";
import MockDiscord from "../../mocks/mockDiscord";
import { createCordeBotWithMockedFunctions, testHelper } from "../../testHelper";
import { ICordeBot, IMessageEmbed, ITestReport } from "../../../src/types";
import { runtime } from "../../../src/common/runtime";
import { debugCommand } from "../../../src/command";
import { MockEvents } from "../../mocks";
import { isNullOrUndefined } from "../../../src/utils";

const testName = "shouldEmbedMatch";

const failReport: ITestReport = {
  pass: false,
  testName,
};

const passReport: ITestReport = {
  pass: true,
  testName,
};

let mockDiscord = new MockDiscord();
let cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

function debugCon(customCommand?: string, customChannelId?: string, customClient?: ICordeBot) {
  return debugCommand(customCommand ?? "con", customChannelId, customClient ?? cordeClient);
}

function mockEmbedMessage() {
  const events = new MockEvents(cordeClient, mockDiscord);
  mockDiscord.message.embeds.push(mockDiscord.messageEmbed);
  events.mockOnceMessage(mockDiscord.message);
}

describe(`testing ${testName} function`, () => {
  afterEach(() => {
    [mockDiscord, cordeClient] = testHelper.initCommandTestsFixtures();
  });

  it("should return a failed test due to invalid parameter (null)", async () => {
    mockEmbedMessage();
    const report = await debugCon().shouldEmbedMatch(null);

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to bot returned equal messages that matches", async () => {
    mockEmbedMessage();
    const report = await debugCon().shouldEmbedMatch({
      author: mockDiscord.messageEmbedSimple.author,
    });

    expect(report).toEqual(passReport);
    expect(report).toMatchSnapshot();
  });

  it("should get failed test due to bot returned equal messages that matches isnot(true)", async () => {
    mockEmbedMessage();
    const report = await debugCon().not.shouldEmbedMatch({
      author: mockDiscord.messageEmbedSimple.author,
    });

    expect(report).toMatchObject(failReport);
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
        mockEmbedMessage();
        let report: ITestReport = {} as any;

        if (options.isNot) {
          report = await debugCon().not.shouldEmbedMatch(messageEmbed);
        } else {
          report = await debugCon().shouldEmbedMatch(messageEmbed);
        }

        if (isNullOrUndefined(options.pass) || options.pass) {
          expect(report).toEqual(passReport);
        } else {
          expect(report).toMatchObject(failReport);
          expect(report).toMatchSnapshot();
        }
      });
    }

    testProperty(
      "should get passed due to title match",
      {
        title: simpleEmbed.title,
      },
      {
        pass: true,
      },
    );

    testProperty(
      "should get passed due to title not match (isnot true)",
      {
        title: "",
      },
      {
        isNot: true,
      },
    );

    testProperty(
      "should get passed due to color not match",
      {
        color: simpleEmbed.color,
      },
      {
        pass: true,
      },
    );

    testProperty(
      "should get passed due to color not match (isNot true)",
      {
        color: "",
      },
      {
        isNot: true,
      },
    );

    testProperty(
      "should get passed due to description match",
      {
        description: simpleEmbed.description,
      },
      {
        pass: true,
      },
    );

    testProperty(
      "should get passed due to fields match",
      {
        fields: simpleEmbed.fields,
      },
      {
        pass: true,
      },
    );

    testProperty(
      "should get passed due to files match",
      {
        files: simpleEmbed.files,
      },
      {
        pass: true,
      },
    );

    testProperty(
      "should get passed due to footer match",
      {
        footer: simpleEmbed.footer,
      },
      {
        pass: true,
      },
    );

    testProperty(
      "should get passed due to image match",
      {
        image: simpleEmbed.image,
      },
      {
        pass: true,
      },
    );

    testProperty(
      "should get passed due to thumbnailUrl match",
      {
        thumbnailUrl: simpleEmbed.thumbnailUrl,
      },
      {
        pass: true,
      },
    );

    testProperty(
      "should get passed due to timestamp match",
      {
        timestamp: simpleEmbed.timestamp,
      },
      {
        pass: true,
      },
    );

    testProperty(
      "should get passed due to url match",
      {
        url: simpleEmbed.url,
      },
      {
        pass: true,
      },
    );
  });
});
