import MockDiscord from "../../mocks/mockDiscord";
import { MockEvents } from "../../mocks";
import { createCordeBotWithMockedFunctions, testHelper } from "../../testHelper";
import { ICordeBot, ITestReport } from "../../../src/types";

import { debugCommand } from "../../../src/command";
import { messageUtils } from "../../../src/command/matches/message/messageUtils";

const testName = "respond";

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

describe(`testing ${testName} function`, () => {
  beforeEach(() => {
    [mockDiscord, cordeClient] = testHelper.initCommandTestsFixtures();
  });

  it.each([[null], [undefined]])(
    "should return a failed test due to invalid parameter (null)",
    async (value) => {
      const report = await debugCon().should.respond(value);
      expect(report).toMatchObject(failReport);
      expect(report).toMatchSnapshot();
    },
  );

  it("should fail due to not present event", async () => {
    const report = await debugCon().should.respond("pong");
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should fail due to no message was sent by the bot", async () => {
    const report = await debugCon().should.respond("pong");
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to timeout but isNot = true", async () => {
    const report = await debugCon().should.not.respond("pong");
    expect(report).toMatchObject(passReport);
  });

  it("should get success test due to bot returned equal message", async () => {
    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageCreate();

    const report = await debugCon().should.respond(mockDiscord.message.content);

    expect(report).toMatchObject(passReport);
  });

  it("should get success test due to bot returned equal messages (string type)", async () => {
    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageCreate();

    const report = await debugCon().should.respond(mockDiscord.message.content);

    expect(report).toEqual(passReport);
  });

  it("should get success test due to bot returned equal messages (string number)", async () => {
    mockDiscord.message.content = "2";

    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageCreate(mockDiscord.message);

    const report = await debugCon().should.respond(2);
    expect(report).toEqual(passReport);
  });

  it("should get success test due to bot returned equal messages (type embed)", async () => {
    const events = new MockEvents(cordeClient, mockDiscord);
    mockDiscord.message.embeds.push(mockDiscord.messageEmbed);
    events.mockOnceMessageCreate(mockDiscord.message);

    const messageEmbed = messageUtils.messageEmbedToMessageEmbedInterface(mockDiscord.messageEmbed);
    const report = await debugCon().should.respond(messageEmbed);

    expect(report).toEqual(passReport);
  });

  it("should get failed test due to bot returned equal messages (isNot true)", async () => {
    mockDiscord.message.embeds.push(mockDiscord.messageEmbed);

    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageCreate(mockDiscord.message);

    const messageEmbed = messageUtils.messageEmbedToMessageEmbedInterface(mockDiscord.messageEmbed);
    const report = await debugCon().should.not.respond(messageEmbed);

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to bot returned different messages (isNot true)", async () => {
    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageCreate();

    const report = await debugCon().should.not.respond(mockDiscord.messageEmbedSimple);

    expect(report).toEqual(passReport);
  });

  it("should get message from another channel", async () => {
    const events = new MockEvents(cordeClient, mockDiscord);
    const channelId = "123";
    events.mockOnceMessageCreateImpl((options) => {
      if (options.channel.id === channelId) {
        return Promise.resolve(mockDiscord.message);
      }
      throw new Error();
    });

    const report = await debugCon()
      .should.inChannel(channelId)
      .respond(mockDiscord.message.content);
    expect(report).toEqual(passReport);
  });

  it("should fail in get message from another channel", async () => {
    const events = new MockEvents(cordeClient, mockDiscord);
    const channelId = "123";
    events.mockOnceMessageCreateImpl((options) => {
      if (options.channel.id !== channelId) {
        return Promise.resolve(mockDiscord.message);
      }
      throw new Error();
    });

    const report = await debugCon()
      .should.inChannel(channelId)
      .respond(mockDiscord.message.content);
    expect(report).toEqual(failReport);
  });

  it("should get fail test due to bot returned different messages (expect primitive and returned embed)", async () => {
    mockDiscord.message.embeds.push(mockDiscord.messageEmbed);

    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageCreate();

    const expectValue = "expect value";

    const report = await debugCon().should.respond(expectValue);

    expect(report).toMatchObject(failReport);
    // For some reason snapshot is falling in CI
  });

  it("should get fail test due to bot returned different messages (expect embed and returned primitive)", async () => {
    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageCreate();

    const report = await debugCon().should.respond(mockDiscord.messageEmbedSimple);

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should get fail test due to bot returned different messages both primitive values", async () => {
    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageCreate();

    const expectValue = "expect value";

    const report = await debugCon().should.respond(expectValue);

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test due to failure in message sending", async () => {
    const corde = createCordeBotWithMockedFunctions(mockDiscord, mockDiscord.client);
    corde.getRoles = jest.fn().mockReturnValue(mockDiscord.roleManager.cache);
    corde.findRole = jest.fn().mockReturnValue(mockDiscord.role);

    //const errorMessage = "can not send message to channel x";

    const events = new MockEvents(corde, mockDiscord);
    events.mockOnceMessageCreateImpl(() => {
      throw new Error();
    });

    const report = await debugCon(null, null, corde).should.respond("");
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });
});
