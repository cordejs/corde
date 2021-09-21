import { Client } from "discord.js";
import MockDiscord from "../../mocks/mockDiscord";
import { createCordeBotWithMockedFunctions } from "../../testHelper";
import { ICordeBot, ITestReport } from "../../../src/types";
import { MockEvents } from "../../mocks/mockEvents";
import { runtime } from "../../../src/common/runtime";
import { debugCommand } from "../../../src/command";

const testName = "shouldSetRoleMentionable";

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

  it("should fail due to undefined roleIdentifier", async () => {
    const report = await debugCon().shouldSetRoleMentionable(true, undefined);

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return false due to invalid mentionable parameter (object)", async () => {
    const report = await debugCon()
      // @ts-ignore
      .shouldSetRoleMentionable({}, { id: "123" });
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return false due to invalid mentionable parameter (undefined)", async () => {
    const report = await debugCon().shouldSetRoleMentionable(undefined, { id: "123" });
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return false due to not found role", async () => {
    cordeClient.findRole = jest.fn().mockReturnValue(null);
    const report = await debugCon().shouldSetRoleMentionable(false, { id: "123" });
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should fail due to no role mentionable was not updated", async () => {
    const report = await debugCon().shouldSetRoleMentionable(false, { id: "123" });
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return true due to isNot true and no role change", async () => {
    const report = await debugCon().not.shouldSetRoleMentionable(false, { id: "123" });
    expect(report).toEqual(passReport);
    expect(report).toMatchSnapshot();
  });

  it("should return true due to role changed the mentionable (isNot false)", async () => {
    const mockEvent = new MockEvents(cordeClient, mockDiscord);
    mockEvent.mockOnceMentionableUpdate(mockDiscord.role);
    const report = await debugCon().shouldSetRoleMentionable(mockDiscord.role.mentionable, {
      id: "123",
    });

    expect(report).toEqual(passReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a not passed test due to mentionable should not change (isNot true)", async () => {
    const mockEvent = new MockEvents(cordeClient, mockDiscord);
    mockEvent.mockOnceMentionableUpdate(mockDiscord.role);
    const report = await debugCon().not.shouldSetRoleMentionable(mockDiscord.role.mentionable, {
      id: "123",
    });

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a not passed test due expected name did not match to received", async () => {
    const mockEvent = new MockEvents(cordeClient, mockDiscord);
    mockEvent.mockOnceMentionableUpdate(mockDiscord.role);
    const report = await debugCon().shouldSetRoleMentionable(true, { id: "123" });

    expect(report).toMatchObject(failReport);
  });

  it("should return a failed test due to failure in message sending", async () => {
    cordeClient.findRole = jest.fn().mockReturnValue(mockDiscord.role);
    cordeClient.fetchRole = jest.fn().mockReturnValue(null);

    const erroMessage = "can not send message to channel x";
    cordeClient.sendTextMessage = jest
      .fn()
      .mockImplementation(() => Promise.reject(new Error(erroMessage)));

    const report = await debugCon().shouldSetRoleMentionable(true, { id: "123" });

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });
});
