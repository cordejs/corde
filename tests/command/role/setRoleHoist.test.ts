import MockDiscord from "../../mocks/mockDiscord";
import { createCordeBotWithMockedFunctions, testHelper } from "../../testHelper";
import { ICordeBot, ITestReport } from "../../../src/types";
import { MockEvents } from "../../mocks/mockEvents";
import { debugCommand } from "../../../src/command";

const testName = "setRoleHoist";

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
    const report = await debugCon().should.setRoleHoist(
      true,
      // @ts-expect-error
      "",
    );
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return false due to invalid hoist parameter (object)", async () => {
    const report = await debugCon()
      // @ts-ignore
      .should.setRoleHoist({}, { id: "123" });

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return false due to invalid hoist parameter (undefined)", async () => {
    const report = await debugCon()
      // @ts-ignore
      .should.setRoleHoist(undefined, { id: "123" });

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return false due to not found role", async () => {
    cordeClient.findRole = jest.fn().mockReturnValue(null);
    const report = await debugCon().should.setRoleHoist(false, { id: "123" });

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should fail due to no role hoist was not updated", async () => {
    const report = await debugCon().should.setRoleHoist(false, { id: "123" });

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return true due to isNot true and no role change", async () => {
    const report = await debugCon().should.not.setRoleHoist(false, { id: "123" });

    expect(report).toEqual(passReport);
    expect(report).toMatchSnapshot();
  });

  it("should return true due to role changed the hoist (isNot false)", async () => {
    const mockEvent = new MockEvents(cordeClient, mockDiscord);
    mockEvent.mockOnceHoistUpdate(mockDiscord.role);
    const report = await debugCon().should.setRoleHoist(mockDiscord.role.hoist, { id: "123" });

    expect(report).toEqual(passReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test due to hoist should not change (isNot true)", async () => {
    const mockEvent = new MockEvents(cordeClient, mockDiscord);
    mockEvent.mockOnceHoistUpdate(mockDiscord.role);
    const report = await debugCon().should.not.setRoleHoist(mockDiscord.role.hoist, { id: "123" });

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a not passed test due expected name did not match to received", async () => {
    const mockEvent = new MockEvents(cordeClient, mockDiscord);
    mockEvent.mockOnceHoistUpdate(mockDiscord.role);
    const report = await debugCon().should.setRoleHoist(false, { id: "123" });

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test due to failure in message sending", async () => {
    cordeClient.findRole = jest.fn().mockReturnValue(mockDiscord.role);
    cordeClient.fetchRole = jest.fn().mockReturnValue(null);

    const erroMessage = "can not send message to channel x";
    cordeClient.sendTextMessage = jest
      .fn()
      .mockImplementation(() => Promise.reject(new Error(erroMessage)));

    const report = await debugCon().should.setRoleHoist(true, { id: "123" });

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });
});
