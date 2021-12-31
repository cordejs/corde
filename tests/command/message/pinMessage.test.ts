import { debugCommand } from "../../../src/command";
import { ICordeBot, ITestReport } from "../../../src/types";
import MockDiscord from "../../mocks/mockDiscord";
import { MockEvents } from "../../mocks/mockEvents";
import { createCordeBotWithMockedFunctions, testHelper } from "../../testHelper";

const testName = "pinMessage";

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

  it("should return error message due to no messageIdentifier (null)", async () => {
    const report = await debugCon()
      // @ts-expect-error
      .should.pinMessage(null);
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return error message due to no messageIdentifier (undefined)", async () => {
    const report = await debugCon()
      // @ts-expect-error
      .should.pinMessage(undefined);
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a passed test due to isNot true and timeout", async () => {
    const report = await debugCon()
      .should.not// @ts-expect-error
      .pinMessage("");
    expect(report).toEqual(passReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test due to isNot false and timeout", async () => {
    const report = await debugCon()
      .should// @ts-expect-error
      .pinMessage("1233");
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test due to isNot false and timeout (messageIdentifier)", async () => {
    const report = await debugCon().should.pinMessage({ id: "1233" });
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a passed test due to message pinned", async () => {
    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessagePinned(mockDiscord.pinnedMessage);

    const report = await debugCon().should.pinMessage({ id: "1233" });

    expect(report).toEqual(passReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test due to message pinned but isNot true", async () => {
    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessagePinned(mockDiscord.pinnedMessage);

    const report = await debugCon().should.not.pinMessage({ id: "1233" });

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

    const report = await debugCon().should.pinMessage({ id: "123" });

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });
});
