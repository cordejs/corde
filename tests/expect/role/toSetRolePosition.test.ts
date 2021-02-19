import { Client } from "discord.js";
import { ToSetRolePosition } from "../../../src/expect/matches";
import { TestReport } from "../../../src/types";
import MockDiscord from "../../mocks/mockDiscord";
import { initCordeClientWithChannel } from "../../testHelper";

let mockDiscord = new MockDiscord();
const commandName = "test";

/**
 * I can not figure out how to mock position of roles.
 * They come as -1 '-'. So I in tests I'm gonna test with -2.
 */
describe("testing ToSetRolePosition operation", () => {
  afterEach(() => {
    mockDiscord = new MockDiscord();
  });
  it("should find and must return passed report due to 'changed position' (isNot false)", async () => {
    const corde = createCordeBotWithMockedFunctions();

    const toSetPosition = new ToSetRolePosition(corde, "test", false);
    const report = await toSetPosition.action(-1, { id: "123" });
    const matchReport: TestReport = {
      commandName,
      hasPassed: true,
      isNot: false,
    };
    expect(report).toEqual(matchReport);
  });

  it("should find and must return passed report due to 'changed position' (isNot true)", async () => {
    const corde = createCordeBotWithMockedFunctions();

    const toSetPosition = new ToSetRolePosition(corde, "test", true);
    const report = await toSetPosition.action(-2, { id: "123" });
    const matchReport: TestReport = {
      commandName,
      hasPassed: true,
      isNot: true,

      customReturnMessage: `expected position: -2, actual position: -1`,
    };

    expect(report).toEqual(matchReport);
  });

  it("should not find a role and must return not passed (isNot true)", async () => {
    const corde = createCordeBotWithMockedFunctions(null);

    const toSetPosition = new ToSetRolePosition(corde, "test", true);
    const report = await toSetPosition.action(1, { id: "123" });
    const matchReport: TestReport = {
      commandName,
      hasPassed: false,
      isNot: true,

      output: "Role not found",
    };
    expect(report).toEqual(matchReport);
  });

  it("should not find a role and must return not passed (isNot false)", async () => {
    const corde = createCordeBotWithMockedFunctions(null);
    const toSetPosition = new ToSetRolePosition(corde, "test", false);
    const report = await toSetPosition.action(2, { id: "123" });
    const matchReport: TestReport = {
      commandName,
      hasPassed: false,
      isNot: false,

      output: "Role not found",
    };
    expect(report).toEqual(matchReport);
  });

  it("should return a not passed test due to new position be higher than the permitted (isNot false)", async () => {
    const corde = createCordeBotWithMockedFunctions();
    const toSetPosition = new ToSetRolePosition(corde, "test", false);
    const report = await toSetPosition.action(2, { id: "123" });
    const matchReport: TestReport = {
      commandName,
      hasPassed: false,
      isNot: false,

      customReturnMessage: `the maximum position possible is -1. Attempted value: 2`,
    };
    expect(report).toEqual(matchReport);
  });

  it("should not find a role and return a failed report", async () => {
    const corde = createCordeBotWithMockedFunctions();

    corde.findRole = jest.fn().mockImplementation(() => {
      throw new Error();
    });
    const toSetPosition = new ToSetRolePosition(corde, "test", false);
    const report = await toSetPosition.action(1, { id: "123" });
    const matchReport: TestReport = {
      commandName,
      hasPassed: false,
      isNot: false,
      output: "",
    };
    expect(report).toEqual(matchReport);
  });
});

function createCordeBotWithMockedFunctions(findRoleMock: any = mockDiscord.role) {
  const corde = initCordeClientWithChannel(mockDiscord, new Client());
  corde.getRoles = jest.fn().mockReturnValue(mockDiscord.roleManager.cache);
  corde.findRole = jest.fn().mockReturnValue(findRoleMock);
  corde.sendTextMessage = jest.fn().mockImplementation(() => {});
  return corde;
}
