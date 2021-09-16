import { Client } from "discord.js";
import MockDiscord from "../../mocks/mockDiscord";
import { MockEvents } from "../../mocks";
import { createCordeBotWithMockedFunctions } from "../../testHelper";
import { ICordeBot, ITestReport } from "../../../src/types";
import { runtime } from "../../../src/common/runtime";

import { debugCommand } from "../../../src/command";

const testName = "shouldReturn";

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

describe("testing shouldReturn", () => {
  beforeEach(() => {
    runtime.setConfigs({ timeout: 100 }, true);
    cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());
  });

  afterEach(() => {
    mockDiscord = new MockDiscord();
  });

  it.each([[null], [undefined]])(
    "should return a failed test due to invalid parameter (null)",
    async (value) => {
      const report = await debugCon().shouldReturn(value);
      expect(report).toMatchObject(failReport);
      expect(report).toMatchSnapshot();
    },
  );

  it("should fail due to no message was sent by the bot", async () => {
    const report = await debugCon().shouldReturn("pong");
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to timeout but isNot = true", async () => {
    const report = await debugCon("").not.shouldReturn("pong");
    expect(report).toMatchObject(passReport);
  });

  it("should get success test due to bot returned equal message", async () => {
    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessage();

    const report = await debugCon().shouldReturn(mockDiscord.message.content);

    expect(report).toMatchObject(passReport);
  });

  it("should get success test due to bot returned equal messages (string type)", async () => {
    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessage();

    const report = await debugCon().shouldReturn(mockDiscord.message.content);

    expect(report).toEqual(passReport);
  });

  it("should get success test due to bot returned equal messages (string number)", async () => {
    mockDiscord.message.content = "2";

    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessage();

    const report = await debugCon().shouldReturn(2);

    expect(report).toEqual(passReport);
  });

  it("should get success test due to bot returned equal messages (type embed)", async () => {
    const events = new MockEvents(cordeClient, mockDiscord);
    mockDiscord.message.embeds.push(mockDiscord.messageEmbed);
    events.mockOnceMessage(mockDiscord.message);

    const report = await debugCon().shouldReturn(mockDiscord.messageEmbedSimple);

    expect(report).toEqual(passReport);
  });

  it("should get failed test due to bot returned equal messages (isNot true)", async () => {
    mockDiscord.message.embeds.push(mockDiscord.messageEmbed);

    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessage();

    const report = await debugCon().not.shouldReturn(mockDiscord.messageEmbedSimple);

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to bot returned different messages (isNot true)", async () => {
    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessage();

    const report = await debugCon().not.shouldReturn(mockDiscord.messageEmbedSimple);

    expect(report).toEqual(passReport);
  });

  it("should get fail test due to bot returned different messages (expect primitive and returned embed)", async () => {
    mockDiscord.message.embeds.push(mockDiscord.messageEmbed);

    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessage();

    const expectValue = "expect value";

    const report = await debugCon().shouldReturn(expectValue);

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should get fail test due to bot returned different messages (expect embed and returned primitive)", async () => {
    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessage();

    const report = await debugCon().shouldReturn(mockDiscord.messageEmbedSimple);

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should get fail test due to bot returned different messages both primitive values", async () => {
    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessage();

    const expectValue = "expect value";

    const report = await debugCon().shouldReturn(expectValue);

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test due to failure in message sending", async () => {
    const corde = createCordeBotWithMockedFunctions(mockDiscord, new Client());
    corde.getRoles = jest.fn().mockReturnValue(mockDiscord.roleManager.cache);
    corde.findRole = jest.fn().mockReturnValue(mockDiscord.role);

    const erroMessage = "can not send message to channel x";

    corde.sendTextMessage = jest
      .fn()
      .mockImplementation(() => Promise.reject(new Error(erroMessage)));

    const report = await debugCon().shouldReturn("");

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });
});
