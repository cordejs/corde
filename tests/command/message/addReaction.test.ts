import MockDiscord from "../../mocks/mockDiscord";
import { createCordeBotWithMockedFunctions, testHelper } from "../../testHelper";
import { ICordeBot, ITestReport } from "../../../src/types";
import { MockEvents } from "../../mocks/mockEvents";
import { debugCommand } from "../../../src/command";

const testName = "addReaction";

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

  it("should fail due to invalid messageIdentifier (number)", async () => {
    const report = await debugCon()
      // @ts-ignore
      .should.addReaction(["1"], 1);
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should fail due to invalid emoji (undefined)", async () => {
    const report = await debugCon().should.addReaction(undefined);
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should fail due to invalid emoji (null)", async () => {
    const report = await debugCon().should.addReaction(null);
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should fail due to invalid emoji (object)", async () => {
    const report = await debugCon()
      // @ts-ignore
      .should.addReaction({});

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a passed test with isNot = false", async () => {
    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageReactionsAdd();

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);

    const report = await debugCon().should.addReaction([mockDiscord.messageReaction.emoji.name]);
    expect(report).toEqual(passReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a passed test with isNot = false using 'and' keyword ", async () => {
    const events = new MockEvents(cordeClient, mockDiscord);
    const mock = events.mockOnceMessageReactionsAdd();

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);

    const report = await debugCon()
      .should.addReaction([mockDiscord.messageReaction.emoji.name])
      .and.addReaction([mockDiscord.messageReaction.emoji.name]);

    expect(report).toEqual(passReport);
    expect(mock).toBeCalledTimes(2);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test with isNot = false using 'and' keyword and 'not' keyword", async () => {
    const events = new MockEvents(cordeClient, mockDiscord);
    const mock = events.mockOnceMessageReactionsAdd();

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);

    const report = await debugCon()
      .should.addReaction([mockDiscord.messageReaction.emoji.name])
      .and.not.addReaction([mockDiscord.messageReaction.emoji.name]);

    expect(report).toMatchObject(failReport);
    expect(mock).toBeCalledTimes(2);
    expect(report).toMatchSnapshot();
  });

  it("should return a passed test with isNot = true", async () => {
    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageReactionsAddToReject();

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);

    const report = await debugCon().should.not.addReaction([
      mockDiscord.messageReaction.emoji.name,
    ]);

    expect(report).toEqual(passReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test with isNot = false", async () => {
    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageReactionsAddToReject(new Error());

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);

    const report = await debugCon().should.addReaction([mockDiscord.messageReaction.emoji.name]);

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test with isNot = false and timeout", async () => {
    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageReactionsAddToReject();

    const report = await debugCon().should.addReaction([mockDiscord.messageReaction.emoji.name]);
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a passed test with isNot = false", async () => {
    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);

    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageReactionsAdd();

    const report = await debugCon().should.addReaction([mockDiscord.messageReaction.emoji.name]);
    expect(report).toMatchObject(passReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test with isNot = true", async () => {
    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    const events = new MockEvents(cordeClient, mockDiscord);

    events.mockOnceMessageReactionsAdd();

    const report = await debugCon().should.not.addReaction([
      mockDiscord.messageReaction.emoji.name,
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

    const report = await debugCon().should.addReaction(["😃"], { id: "123" });

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });
});
