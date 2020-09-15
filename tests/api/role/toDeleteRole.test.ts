import { Client } from "discord.js";
import MockDiscord from "../../mocks/mockDiscord";
import { initCordeClientWithChannel } from "../../testHelper";
import { toDeleteRole } from "../../../src/api/expectMatches/role/toDeleteRole";
import { TestReportModel } from "../../../src/api";
let mockDiscord = new MockDiscord();

describe("testing toDeleteRole function", () => {
  afterEach(() => {
    mockDiscord = new MockDiscord();
  });
  it("should return a passed report for a deleted role(isNot false)", async () => {
    const corde = initCordeClientWithChannel(mockDiscord, new Client());

    corde.findRole = jest.fn().mockReturnValue(mockDiscord.role);
    corde.sendTextMessage = jest.fn().mockImplementation(() => {});
    corde.fetchRole = jest.fn().mockReturnValue(null);

    const report = await toDeleteRole("test", false, corde, { id: "123" });
    const model: TestReportModel = {
      commandName: "test",
      expectation: "",
      output: "",
      hasPassed: true,
      isNot: false,
      showExpectAndOutputValue: false,
    };
    expect(report).toEqual(model);
  });

  it("should return a passed report for a deleted role(isNot true)", async () => {
    const corde = initCordeClientWithChannel(mockDiscord, new Client());

    corde.findRole = jest.fn().mockReturnValue(mockDiscord.role);
    corde.sendTextMessage = jest.fn().mockImplementation(() => {});
    corde.fetchRole = jest.fn().mockReturnValue(null);

    const report = await toDeleteRole("test", true, corde, { id: "123" });
    const model: TestReportModel = {
      commandName: "test",
      expectation: "",
      output: "",
      hasPassed: false,
      isNot: true,
      showExpectAndOutputValue: false,
    };
    expect(report).toEqual(model);
  });

  it("should return a passed report for a deleted role(isNot true)", async () => {
    const corde = initCordeClientWithChannel(mockDiscord, new Client());

    corde.findRole = jest.fn().mockReturnValue(mockDiscord.role);
    corde.sendTextMessage = jest.fn().mockImplementation(() => {});
    corde.fetchRole = jest.fn().mockReturnValue(null);

    const report = await toDeleteRole("test", true, corde, { id: "123" });
    const model: TestReportModel = {
      commandName: "test",
      expectation: "",
      output: "",
      hasPassed: false,
      isNot: true,
      showExpectAndOutputValue: false,
    };
    expect(report).toEqual(model);
  });

  it("should return a passed report for a deleted role(isNot true)", async () => {
    const corde = initCordeClientWithChannel(mockDiscord, new Client());

    corde.findRole = jest.fn().mockReturnValue(mockDiscord.role);
    corde.sendTextMessage = jest.fn().mockImplementation(() => {});
    corde.fetchRole = jest.fn().mockReturnValue(null);

    const report = await toDeleteRole("test", true, corde, { id: "123" });
    const model: TestReportModel = {
      commandName: "test",
      expectation: "",
      output: "",
      hasPassed: false,
      isNot: true,
      showExpectAndOutputValue: false,
    };
    expect(report).toEqual(model);
  });
});
