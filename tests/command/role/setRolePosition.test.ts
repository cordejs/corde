import { Client } from "discord.js";
import { debugCommand } from "../../../src/command";
import { ICordeBot, ITestReport } from "../../../src/types";
import MockDiscord from "../../mocks/mockDiscord";
import { MockEvents } from "../../mocks/mockEvents";
import {
  createCordeBotWithMockedFunctions,
  initCordeClientWithChannel,
  testHelper,
} from "../../testHelper";

const testName = "shouldSetRolePosition";

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

/**
 * I can not figure out how to mock position of roles.
 * They come as -1 '-'. So I in tests I'm gonna test with -2.
 */
describe("testing ToSetRolePosition operation", () => {
  beforeEach(() => {
    [mockDiscord, cordeClient] = testHelper.initCommandTestsFixtures();
  });

  it("should fail due to undefined roleIdentifier", async () => {
    const report = await debugCon().shouldSetRolePosition(1, "");
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should fail due to newPosition is not a number", async () => {
    const report = await debugCon()
      // @ts-ignore
      .shouldSetRolePosition("batata", { id: "1231231" });

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should find and must return passed report due to 'changed position' (isNot false)", async () => {
    const mockEvent = new MockEvents(cordeClient, mockDiscord);
    mockEvent.mockOnceRolePositionUpdate();
    const report = await debugCon().shouldSetRolePosition(-1, { id: "123" });
    expect(report).toEqual(passReport);
  });

  it("should find and must return passed report due to 'changed position' (isNot true)", async () => {
    const mockEvent = new MockEvents(cordeClient, mockDiscord);
    mockEvent.mockOnceRolePositionUpdate();

    const report = await debugCon().not.shouldSetRolePosition(-2, { id: "123" });

    expect(report).toEqual(passReport);
    expect(report).toMatchSnapshot();
  });

  it("should not find a role and must return a failed test (isNot true)", async () => {
    const report = await debugCon().shouldSetRolePosition(1, { id: "123" });
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should not find a role and must return a failed test (isNot false)", async () => {
    const report = await debugCon().shouldSetRolePosition(2, { id: "123" });
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a not passed test due to new position be higher than the permitted (isNot false)", async () => {
    const report = await debugCon().shouldSetRolePosition(2, { id: "123" });
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should not find a role and return a failed report", async () => {
    cordeClient.findRole = jest
      .fn()
      // @ts-expect-error
      .mockImplementation(null);
    const report = await debugCon().shouldSetRolePosition(1, { id: "123" });
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a passed report due to timeout and isNot true", async () => {
    cordeClient.findRole = jest.fn().mockReturnValue(mockDiscord.role);
    const report = await debugCon().not.shouldSetRolePosition(-2, { id: "123" });
    expect(report).toEqual(passReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed report due to timeout and isNot false", async () => {
    cordeClient.findRole = jest.fn().mockReturnValue(mockDiscord.role);
    const report = await debugCon().shouldSetRolePosition(-2, { id: "123" });

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed report position setted was different than expected", async () => {
    cordeClient.findRole = jest.fn().mockReturnValue(mockDiscord.role);

    const mockEvent = new MockEvents(cordeClient, mockDiscord);
    mockEvent.mockOnceRolePositionUpdate();
    const report = await debugCon().shouldSetRolePosition(-2, { id: "123" });

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test due to failure in message sending", async () => {
    const corde = initCordeClientWithChannel(mockDiscord, new Client());
    corde.getRoles = jest.fn().mockReturnValue(mockDiscord.roleManager.cache);
    corde.findRole = jest.fn().mockReturnValue(mockDiscord.role);

    const erroMessage = "can not send message to channel x";
    corde.sendTextMessage = jest
      .fn()
      .mockImplementation(() => Promise.reject(new Error(erroMessage)));

    const report = await debugCon().shouldSetRolePosition(-1, { id: "123" });

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });
});
