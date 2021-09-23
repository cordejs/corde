import { Client } from "discord.js";
import MockDiscord from "../../mocks/mockDiscord";
import { createCordeBotWithMockedFunctions, testHelper, testUtils } from "../../testHelper";
import { ICordeBot, IMessageEmbed, ITestReport } from "../../../src/types";
import { runtime } from "../../../src/common/runtime";
import { MockEvents } from "../../mocks/mockEvents";
import { debugCommand } from "../../../src/command";

const testName = "shouldEditMessage";

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

describe(`testing ${testName} function`, () => {
  afterEach(() => {
    [mockDiscord, cordeClient] = testHelper.initCommandTestsFixtures();
  });

  it("should return a failed test due to invalid parameter (null)", async () => {
    const report = await debugCon().shouldEditMessage(null);
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test due to invalid parameter (undefined)", async () => {
    const report = await debugCon().shouldEditMessage(undefined);
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should fail due to message was not edited by the bot (no messageIdentifier)", async () => {
    const report = await debugCon().shouldEditMessage("pong");
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should fail due to message was not edited by the bot (no messageIdentifier as string)", async () => {
    const report = await debugCon().shouldEditMessage("pong", "123");
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should fail due to message was not edited by the bot (no messageIdentifier as object with id)", async () => {
    const report = await debugCon().shouldEditMessage("pong", { id: "123" });
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should fail due to message was not edited by the bot (no messageIdentifier as object with content)", async () => {
    const report = await debugCon().shouldEditMessage("pong", { oldContent: "message test" });
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to timeout but isNot = true", async () => {
    const report = await debugCon().not.shouldEditMessage("pong");
    expect(report).toEqual(passReport);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to bot returned equal message", async () => {
    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageContentOrEmbedChange();

    const report = await debugCon().shouldEditMessage(mockDiscord.message.content);

    expect(report).toEqual(passReport);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to bot returned equal messages (string type)", async () => {
    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageContentOrEmbedChange();

    const report = await debugCon().shouldEditMessage(mockDiscord.message.content);

    expect(report).toEqual(passReport);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to bot returned equal messages (string number)", async () => {
    mockDiscord.message.content = "2";

    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageContentOrEmbedChange();

    const report = await debugCon().shouldEditMessage(2);

    expect(report).toEqual(passReport);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to bot returned equal messages (type embed)", async () => {
    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageContentOrEmbedChange(mockDiscord.messageWithEmbed);

    const report = await debugCon().shouldEditMessage(mockDiscord.messageEmbedSimple);

    expect(report).toEqual(passReport);
    expect(report).toMatchSnapshot();
  });

  it("should get failed test due to bot returned equal messages (isNot true)", async () => {
    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageContentOrEmbedChange(mockDiscord.messageWithEmbed);

    const report = await debugCon().not.shouldEditMessage(mockDiscord.messageEmbedSimple);

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to bot returned different messages (isNot true)", async () => {
    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageContentOrEmbedChange();

    const report = await debugCon().not.shouldEditMessage(mockDiscord.messageEmbedSimple);

    expect(report).toEqual(passReport);
    expect(report).toMatchSnapshot();
  });

  it("should get fail test due to bot returned different messages (both embed)", async () => {
    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageContentOrEmbedChange(mockDiscord.messageWithEmbed);

    const embedInternal: IMessageEmbed = {
      fields: mockDiscord.messageEmbedSimple.fields,
    };

    const report = await debugCon().shouldEditMessage(embedInternal);

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should get fail test due to bot returned different messages (expect primitive and returned embed)", async () => {
    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageContentOrEmbedChange(mockDiscord.messageWithEmbed);

    const expectValue = "expect value";

    const report = await debugCon().shouldEditMessage(expectValue);

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should get fail test due to bot returned different messages both primitive values", async () => {
    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageContentOrEmbedChange();

    const expectValue = "expect value";

    const report = await debugCon().shouldEditMessage(expectValue);

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should get fail test due to bot returned different messages (expect embed and returned primitive)", async () => {
    const mockEvent = new MockEvents(cordeClient, mockDiscord);
    mockEvent.mockOnceMessageContentOrEmbedChange();

    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageContentOrEmbedChange();

    const report = await debugCon().shouldEditMessage(mockDiscord.messageEmbedSimple);

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test due to failure in message sending", async () => {
    cordeClient.getRoles = jest.fn().mockReturnValue(mockDiscord.roleManager.cache);
    cordeClient.findRole = jest.fn().mockReturnValue(mockDiscord.role);

    const erroMessage = "can not send message to channel x";
    cordeClient.sendTextMessage = jest
      .fn()
      .mockImplementation(() => Promise.reject(new Error(erroMessage)));

    const report = await debugCon().shouldEditMessage("value", { id: "123" });

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });
});
