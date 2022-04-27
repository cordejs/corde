import MockDiscord from "../../mocks/mockDiscord";
import { createCordeBotWithMockedFunctions, testHelper } from "../../testHelper";
import { MockEvents } from "../../mocks/mockEvents";
import { ICordeBot, ITestReport } from "../../../src/types";
import { debugCommand } from "../../../src/command";
import runtime from "../../../src/core/runtime";

const testName = "messageContentContains";

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

  it("should return a failed test due to invalid parameter (null)", async () => {
    const report = await debugCon()
      .should // @ts-ignore
      .messageContentContains(null);
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test due to invalid parameter (undefined)", async () => {
    const report = await debugCon()
      .should // @ts-ignore
      .messageContentContains(undefined);
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should fail due to no message was sent by the bot", async () => {
    const report = await debugCon().should.messageContentContains("pong");
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to timeout but isNot = true", async () => {
    const report = await debugCon().should.not.messageContentContains("pong");
    expect(report).toEqual(passReport);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to bot returned equal message", async () => {
    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessage();

    const report = await debugCon().should.messageContentContains(mockDiscord.message.content);

    expect(report).toEqual(passReport);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to bot returned a contained message", async () => {
    const events = new MockEvents(cordeClient, mockDiscord);
    mockDiscord.message.content = "message to contain";
    events.mockOnceMessage();

    const report = await debugCon().should.messageContentContains("message");

    expect(report).toEqual(passReport);
    expect(report).toMatchSnapshot();
  });

  it("should get fail test due to bot returned different messages both primitive values", async () => {
    runtime.setConfigs({ timeout: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, mockDiscord.client);

    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageCreate();

    const report = await debugCon().should.messageContentContains("expect value");
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

    const report = await debugCon().should.messageContentContains("abc");

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });
});
