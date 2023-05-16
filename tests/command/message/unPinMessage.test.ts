import { ICordeBot, ITestReport } from "../../../src/types";
import MockDiscord from "../../mocks/mockDiscord";
import { MockEvents } from "../../mocks/mockEvents";
import { createCordeBotWithMockedFunctions, testHelper } from "../../testHelper";

import { debugCommand } from "../../../src/command";

const testName = "unPinMessage";

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
    const report = await debugCon().should.unPinMessage(null);
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return error message due to no messageIdentifier (undefined)", async () => {
    const report = await debugCon().should.unPinMessage(undefined);
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a passed test due to isNot true and timeout", async () => {
    const report = await debugCon().should.not.unPinMessage("1233");
    expect(report).toEqual(passReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test due to isNot false and timeout", async () => {
    const report = await debugCon().should.unPinMessage("1233");
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test due to isNot false and timeout (messageIdentifier)", async () => {
    const report = await debugCon().should.unPinMessage({ id: "1233" });
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a passed test due to message unpinned", async () => {
    const events = new MockEvents(cordeClient, mockDiscord);
    events.mockOnceMessageUnPinned();

    const report = await debugCon().should.unPinMessage({ id: "1233" });

    expect(report).toEqual(passReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a passed test due to message unpinned and with 'and' operator", async () => {
    const events = new MockEvents(cordeClient, mockDiscord);
    const mock = events.mockOnceMessageUnPinned();

    const report = await debugCon()
      .should.unPinMessage({ id: "1233" })
      .and.unPinMessage({ id: "1233" });

    expect(report).toEqual(passReport);
    expect(mock).toBeCalledTimes(2);
    expect(report).toMatchSnapshot();
  });

  it("should return a passed test due to message unpinned and with 'and' and 'not' operator", async () => {
    const events = new MockEvents(cordeClient, mockDiscord);
    const mock = events.mockOnceMessageUnPinned();

    const report = await debugCon()
      .should.unPinMessage({ id: "1233" })
      .and.not.unPinMessage({ id: "1233" });

    expect(report).toEqual(passReport);
    expect(mock).toBeCalledTimes(2);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test due to message unpinned but isNot true", async () => {
    const mockEvent = new MockEvents(cordeClient, mockDiscord);
    mockEvent.mockOnceMessageUnPinned();

    const report = await debugCon().should.not.unPinMessage({ id: "1233" });

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

    const report = await debugCon().should.unPinMessage("1");

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });
});
