import { ICordeBot, ITestReport } from "../../../src/types";
import MockDiscord from "../../mocks/mockDiscord";
import { MockEvents } from "../../mocks/mockEvents";
import { createCordeBotWithMockedFunctions, testHelper } from "../../testHelper";

import { debugCommand } from "../../../src/command";
import { Colors } from "../../../src";

const testName = "setRoleColor";

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

  it("should fail due to undefined roleIdentifier", async () => {
    const report = await debugCon()
      // @ts-ignore
      .should.setRoleColor(Colors.BLUE, undefined);

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should fail due to invalid color", async () => {
    const report = await debugCon()
      // @ts-ignore
      .should.setRoleColor(null, { id: "132" });

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return false due to not found role", async () => {
    cordeClient.findRole = jest.fn().mockReturnValue(null);
    const report = await debugCon().should.setRoleColor(Colors.PURPLE, { id: "123" });
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should fail due to role hadn't color changed", async () => {
    const report = await debugCon().should.setRoleColor(Colors.NAVY, { id: "123" });
    expect(report).toMatchObject(failReport);
    // https://app.circleci.com/pipelines/github/cordejs/corde/3481/workflows/770ba82b-7c05-4f87-8c97-ad7538305bd6/jobs/13282
    //expect(report).toMatchSnapshot();
  });

  it("should return true due to isNot true and no role change", async () => {
    const report = await debugCon().should.not.setRoleColor(Colors.GREY, { id: "123" });
    expect(report).toEqual(passReport);
    expect(report).toMatchSnapshot();
  });

  it("should return true due to role has changed the color (isNot false)", async () => {
    const mockEvent = new MockEvents(cordeClient, mockDiscord);
    mockEvent.mockOnceRoleUpdateColor(mockDiscord.role);
    const report = await debugCon().should.setRoleColor(mockDiscord.role.color, { id: "123" });

    expect(report).toEqual(passReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a not passed test due to color should not change (isNot true)", async () => {
    const mockEvent = new MockEvents(cordeClient, mockDiscord);
    mockEvent.mockOnceRoleUpdateColor(mockDiscord.role);
    const report = await debugCon().should.setRoleColor(Colors.DARK_GOLD, { id: "123" });

    expect(report).toMatchObject(failReport);
    // https://app.circleci.com/pipelines/github/cordejs/corde/3481/workflows/770ba82b-7c05-4f87-8c97-ad7538305bd6/jobs/13282
    //expect(report).toMatchSnapshot();
  });

  it("should return a not passed test due expected name did not match to received", async () => {
    const mockEvent = new MockEvents(cordeClient, mockDiscord);
    mockEvent.mockOnceRoleUpdateColor(mockDiscord.role);
    const report = await debugCon().should.setRoleColor(Colors.AQUA, { id: "123" });

    expect(report).toMatchObject(failReport);
    // https://app.circleci.com/pipelines/github/cordejs/corde/3481/workflows/770ba82b-7c05-4f87-8c97-ad7538305bd6/jobs/13282
    //expect(report).toMatchSnapshot();
  });

  it("should return a failed test due to failure in message sending", async () => {
    cordeClient.findRole = jest.fn().mockReturnValue(mockDiscord.role);
    cordeClient.fetchRole = jest.fn().mockReturnValue(null);

    const errorMessage = "can not send message to channel x";
    cordeClient.sendTextMessage = jest
      .fn()
      .mockImplementation(() => Promise.reject(new Error(errorMessage)));

    const report = await debugCon().should.setRoleColor(Colors.DARK_AQUA, { id: "123" });

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });
});
