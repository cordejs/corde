import { Client } from "discord.js";
import { ToRenameRole } from "../../../src/expect/matches";
import MockDiscord from "../../mocks/mockDiscord";
import { initCordeClientWithChannel } from "../../testHelper";
import { TestReport } from "../../../src/types";

let mockDiscord = new MockDiscord();
const commandName = "test";

// Mocking wait function
jest.mock("../../../src/utils");

describe("testing ToRenameRole operation", () => {
  afterEach(() => {
    mockDiscord = new MockDiscord();
  });

  it("should find and must return passed report due to renamed role (isNot false)", async () => {
    const corde = initCordeClientWithChannel(mockDiscord, new Client());
    corde.findRole = jest.fn().mockReturnValue(mockDiscord.role);
    corde.fetchRole = jest.fn().mockReturnValue(mockDiscord.role);
    corde.sendTextMessage = jest.fn().mockImplementation(() => {});

    const toRename = new ToRenameRole(corde, "test", false);
    const report = await toRename.action(mockDiscord.role.name, { id: "123" });
    const matchReport: TestReport = {
      commandName,
      hasPassed: true,
      isNot: false,
    };

    expect(report).toEqual(matchReport);
  });

  it("should find and must return passed report due not to renamed role (isNot true)", async () => {
    const corde = initCordeClientWithChannel(mockDiscord, new Client());
    corde.findRole = jest.fn().mockReturnValue(mockDiscord.role);
    corde.fetchRole = jest.fn().mockReturnValue(mockDiscord.role);
    corde.sendTextMessage = jest.fn().mockImplementation(() => {});

    const toRename = new ToRenameRole(corde, "test", true);
    const report = await toRename.action("egg", { id: "123" });
    const matchReport: TestReport = {
      commandName,
      hasPassed: true,
      isNot: true,
    };
    expect(report).toEqual(matchReport);
  });

  it("should not find a role and must return not passed (isNot true)", async () => {
    const corde = initCordeClientWithChannel(mockDiscord, new Client());
    corde.findRole = jest.fn().mockReturnValue(null);
    corde.sendTextMessage = jest.fn().mockImplementation(() => {});

    const toRename = new ToRenameRole(corde, "test", true);
    const report = await toRename.action("egg", { id: "123" });
    const matchReport: TestReport = {
      commandName,
      hasPassed: false,
      isNot: true,

      output: "No role found",
    };
    expect(report).toEqual(matchReport);
  });

  it("should not find a role and must return not passed (isNot false)", async () => {
    const corde = initCordeClientWithChannel(mockDiscord, new Client());
    corde.findRole = jest.fn().mockReturnValue(null);
    corde.sendTextMessage = jest.fn().mockImplementation(() => {});

    const toRename = new ToRenameRole(corde, "test", false);
    const report = await toRename.action("egg", { id: "123" });
    const matchReport: TestReport = {
      commandName,
      hasPassed: false,
      isNot: false,
      output: "No role found",
    };
    expect(report).toEqual(matchReport);
  });

  it("should find a role and return a failed report due", async () => {
    const corde = initCordeClientWithChannel(mockDiscord, new Client());
    corde.findRole = jest.fn().mockImplementation(() => {
      throw new Error();
    });

    const toRename = new ToRenameRole(corde, "test", false);
    const report = await toRename.action("egg", { id: "123" });
    const matchReport: TestReport = {
      commandName,
      hasPassed: false,
      isNot: false,
      output: "",
    };
    expect(report).toEqual(matchReport);
  });
});
