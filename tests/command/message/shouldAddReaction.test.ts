import MockDiscord from "../../mocks/mockDiscord";
import { createCordeBotWithMockedFunctions } from "../../testHelper";
import { Client } from "discord.js";
import { ICordeBot, ITestReport } from "../../../src/types";
import { MockEvents } from "../../mocks/mockEvents";
import { runtime } from "../../../src/common/runtime";
import { debugCommand } from "../../../src/command";

const testName = "shouldAddReaction";

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
    mockDiscord = new MockDiscord();
    runtime.setConfigs({ timeout: 100 }, true);
    cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());
  });

  it("should fail due to invalid messageIdentifier (number)", async () => {
    const report = await debugCon()
      // @ts-ignore
      .shouldAddReaction(["1"], 1);
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should fail due to invalid emoji (undefined)", async () => {
    const report = await debugCon().shouldAddReaction(undefined);
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should fail due to invalid emoji (null)", async () => {
    const report = await debugCon().shouldAddReaction(null);
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should fail due to invalid emoji (object)", async () => {
    const report = await debugCon()
      // @ts-ignore
      .shouldAddReaction({});

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a passed test with isNot = false", async () => {
    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageReactionsAdd();

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);

    const report = await debugCon().shouldAddReaction([mockDiscord.messageReaction.emoji.name]);
    expect(report).toEqual(passReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a passed test with isNot = true", async () => {
    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);

    const report = await debugCon().not.shouldAddReaction([mockDiscord.messageReaction.emoji.name]);
    expect(report).toEqual(passReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test with isNot = false", async () => {
    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    const report = await debugCon().shouldAddReaction([mockDiscord.messageReaction.emoji.name]);
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test with isNot = false and timeout", async () => {
    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageReactionsAddToReject();

    const report = await debugCon().shouldAddReaction([mockDiscord.messageReaction.emoji.name]);
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a passed test with isNot = false", async () => {
    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);

    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageReactionsAdd();

    const report = await debugCon().shouldAddReaction([mockDiscord.messageReaction.emoji.name]);
    expect(report).toMatchObject(passReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test with isNot = true", async () => {
    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    const events = new MockEvents(cordeClient, mockDiscord);

    events.mockOnceMessageReactionsAdd();

    const report = await debugCon().not.shouldAddReaction([mockDiscord.messageReaction.emoji.name]);
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test with isNot = false and emoji object with id and other with name", async () => {
    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);

    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageReactionsRemove();

    const report = await debugCon().shouldAddReaction([
      { id: mockDiscord.messageReaction.emoji.id },
      { name: mockDiscord.messageReaction.emoji.name },
    ]);
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

    const report = await debugCon().shouldAddReaction(["😃"], { id: "123" });

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });
});
