import MockDiscord from "../../mocks/mockDiscord";
import { createCordeBotWithMockedFunctions, testHelper } from "../../testHelper";
import { ICordeBot, ITestReport } from "../../../src/types";
import { MockEvents } from "../../mocks/mockEvents";
import { debugCommand } from "../../../src/command";

const testName = "removeReaction";

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
      .should.removeReaction(["1"], 1);

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should fail due to invalid emoji (undefined)", async () => {
    const report = await debugCon()
      // @ts-expect-error
      .should.removeReaction(undefined);
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should fail due to invalid emoji (null)", async () => {
    const report = await debugCon()
      // @ts-expect-error
      .should.removeReaction(null);
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should fail due to invalid emoji (object)", async () => {
    // @ts-ignore
    const report = await debugCon().should.removeReaction({});
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a passed test with isNot = true", async () => {
    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    const report = await debugCon().should.not.removeReaction([
      mockDiscord.messageReaction.emoji.name,
    ]);
    expect(report).toEqual(passReport);
  });

  it("should return a failed test with isNot = false", async () => {
    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    const report = await debugCon().should.removeReaction([mockDiscord.messageReaction.emoji.name]);
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test with isNot = false and timeout", async () => {
    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageReactionsRemoveToReject();

    const report = await debugCon().should.removeReaction([mockDiscord.messageReaction.emoji.name]);
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test with isNot = true and emoji object with id and other with name", async () => {
    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageReactionsRemove();

    const report = await debugCon().should.not.removeReaction([
      { id: mockDiscord.messageReaction.emoji.id ?? "" },
      { name: mockDiscord.messageReaction.emoji.name },
    ]);

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test due to failure in message sending", async () => {
    cordeClient.getRoles = jest.fn().mockReturnValue(mockDiscord.roleManager.cache);
    cordeClient.findRole = jest.fn().mockReturnValue(mockDiscord.role);

    const errorMessage = "can not send message to channel x";
    cordeClient.sendTextMessage = jest
      .fn()
      .mockImplementation(() => Promise.reject(new Error(errorMessage)));

    const report = await debugCon().should.removeReaction(["😀"], { id: "123" });

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });
});
