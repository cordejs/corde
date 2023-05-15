import MockDiscord from "../../mocks/mockDiscord";
import { createCordeBotWithMockedFunctions, testHelper } from "../../testHelper";
import { ICordeBot, ITestReport } from "../../../src/types";
import { debugCommand } from "../../../src/command";
import { MockEvents } from "../../mocks";
import { isNullOrUndefined } from "../../../src/utils/isNullOrUndefined";

const testName = "matchEmbed";

const failReport: ITestReport = {
  pass: false,
  testName,
};

const passReport: ITestReport = {
  pass: true,
  testName,
};

let mockDiscord = new MockDiscord();
let cordeClient = createCordeBotWithMockedFunctions(mockDiscord, mockDiscord.client);

function debugCon(customCommand?: string, customChannelId?: string, customClient?: ICordeBot) {
  return debugCommand(customCommand ?? "con", customChannelId, customClient ?? cordeClient);
}

function mockEmbedMessage() {
  const mockEvents = new MockEvents(cordeClient, mockDiscord);
  mockDiscord.message.embeds.push(mockDiscord.messageEmbed);
  return mockEvents.mockOnceMessage(mockDiscord.message);
}

describe(`testing ${testName} function`, () => {
  beforeEach(() => {
    [mockDiscord, cordeClient] = testHelper.initCommandTestsFixtures();
  });

  it("should return a failed test due to invalid parameter (null)", async () => {
    mockEmbedMessage();
    const report = await debugCon().should.matchEmbed(null);

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to bot returned equal messages that matches", async () => {
    mockEmbedMessage();
    const report = await debugCon().should.matchEmbed({
      author: mockDiscord.messageEmbed.author,
    });

    expect(report).toEqual(passReport);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to bot returned equal messages that matches with 'and' keyword", async () => {
    const mock = mockEmbedMessage();
    const report = await debugCon()
      .should.matchEmbed({
        author: mockDiscord.messageEmbed.author,
      })
      .and.matchEmbed({
        author: mockDiscord.messageEmbed.author,
      });

    expect(report).toEqual(passReport);
    expect(mock).toBeCalledTimes(2);
    expect(report).toMatchSnapshot();
  });

  it("should get failed test due to bot returned equal messages that matches with 'and' and 'not' keywords", async () => {
    const mock = mockEmbedMessage();
    const report = await debugCon()
      .should.matchEmbed({
        author: mockDiscord.messageEmbed.author,
      })
      .and.not.matchEmbed({
        author: mockDiscord.messageEmbed.author,
      });

    expect(report).toMatchObject(failReport);
    expect(mock).toBeCalledTimes(2);
    expect(report).toMatchSnapshot();
  });

  it("should get failed test due to bot returned equal messages that matches isNot(true)", async () => {
    mockEmbedMessage();
    const report = await debugCon().should.not.matchEmbed({
      author: mockDiscord.messageEmbed.author,
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
    const simpleEmbed = mockDiscord.messageEmbed;

    it.each([
      [
        "should get passed due to title match",
        {
          title: simpleEmbed.title,
        },
        {
          pass: true,
        },
      ],
      [
        "should get passed due to title not match (isNot true)",
        {
          title: "",
        },
        {
          isNot: true,
        },
      ],
      [
        "should get passed due to color not match",
        {
          color: simpleEmbed.color,
        },
        {
          pass: true,
        },
      ],
      [
        "should get passed due to description match",
        {
          description: simpleEmbed.description,
        },
        {
          pass: true,
        },
      ],
      [
        "should get passed due to fields match",
        {
          fields: simpleEmbed.fields,
        },
        {
          pass: true,
        },
      ],
      [
        "should get passed due to footer match",
        {
          footer: simpleEmbed.footer,
        },
        {
          pass: true,
        },
      ],
      [
        "should get passed due to image match",
        {
          image: simpleEmbed.image,
        },
        {
          pass: true,
        },
      ],
      [
        "should get passed due to url match",
        {
          url: simpleEmbed.url,
        },
        {
          pass: true,
        },
      ],
      [
        "should get passed due to timestamp match",
        {
          timestamp: simpleEmbed.timestamp,
        },
        {
          pass: true,
        },
      ],
      [
        "should get passed due to thumbnailUrl match",
        {
          thumbnailUrl: simpleEmbed.thumbnail,
        },
        {
          pass: true,
        },
      ],
    ])("%s", async (_: string, messageEmbed: any, options: TestOption) => {
      mockEmbedMessage();
      let report: ITestReport = {} as any;

      if (options?.isNot) {
        report = await debugCon().should.not.matchEmbed(messageEmbed);
      } else {
        report = await debugCon().should.matchEmbed(messageEmbed);
      }

      if (isNullOrUndefined(options?.pass) || options?.pass) {
        expect(report).toEqual(passReport);
      } else {
        expect(report).toMatchObject(failReport);
        expect(report).toMatchSnapshot();
      }
    });
  });
});
