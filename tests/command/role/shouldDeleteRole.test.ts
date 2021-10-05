import { Client } from "discord.js";
import MockDiscord from "../../mocks/mockDiscord";
import { createCordeBotWithMockedFunctions, getFullConsoleLog, testHelper } from "../../testHelper";
import { MockEvents } from "../../mocks/mockEvents";
import { ICordeBot, ITestReport } from "../../../src/types";
import { debugCommand } from "../../../src/command";
import { runtime } from "../../../src/core/runtime";
import { testCollector } from "../../../src/core/TestCollector";

const testName = "shouldDeleteRole";

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
  beforeEach(() => {
    [mockDiscord, cordeClient] = testHelper.initCommandTestsFixtures();
  });

  describe("isnot true", () => {
    it("should return a failed report for a found role with property role.deleted = true role", async () => {
      const events = new MockEvents(cordeClient, mockDiscord);
      events.mockOnceRoleDelete();

      const role = mockDiscord.role;
      role.deleted = true;
      cordeClient.fetchRole = jest.fn().mockReturnValue(role);

      const report = await debugCon().not.shouldDeleteRole({ id: "123" });
      delete report.trace;

      expect(report).toMatchObject(failReport);
      expect(report).toMatchSnapshot();
    });

    it("should return a passed report for a deleted role", async () => {
      const events = new MockEvents(cordeClient, mockDiscord);
      events.mockOnceRoleDelete();

      cordeClient.fetchRole = jest.fn().mockReturnValue(mockDiscord.role);

      const report = await debugCon().not.shouldDeleteRole({ id: "123" });
      expect(report).toMatchObject(passReport);
    });

    it("should return a failed report for a deleted role(isNot true)", async () => {
      const events = new MockEvents(cordeClient, mockDiscord);

      mockDiscord.role.deleted = true;

      events.mockOnceRoleDelete(mockDiscord.role);

      cordeClient.fetchRole = jest.fn().mockReturnValue(mockDiscord.role);
      const report = await debugCon().not.shouldDeleteRole({ id: "123" });
      delete report.trace;

      expect(report).toMatchObject(failReport);
      expect(report).toMatchSnapshot();
    });

    it("should get timeout when trying to delete the role, but should pass", async () => {
      cordeClient.fetchRole = jest.fn().mockReturnValue(mockDiscord.role);
      const roleIdentifier = { id: mockDiscord.role.id };
      const report = await debugCon().not.shouldDeleteRole(roleIdentifier);
      delete report.trace;

      expect(report).toMatchObject(passReport);
      expect(report).toMatchSnapshot();
    });
  });

  describe("isNot false", () => {
    it("should return a passed report for a deleted role", async () => {
      const events = new MockEvents(cordeClient, mockDiscord);
      events.mockOnceRoleDelete();

      const report = await debugCon().shouldDeleteRole({ id: "123" });
      expect(report).toMatchObject(failReport);
      expect(report).toMatchSnapshot();
    });

    it("should get timeout when trying to delete the role", async () => {
      cordeClient.fetchRole = jest.fn().mockReturnValue(mockDiscord.role);

      const roleIdentifier = { id: mockDiscord.role.id };
      const report = await debugCon().shouldDeleteRole(roleIdentifier);
      delete report.trace;

      expect(report).toMatchObject(failReport);
      expect(report).toMatchSnapshot();
    });

    it("should fail due to roleIdentifier null", async () => {
      const events = new MockEvents(cordeClient, mockDiscord);
      events.mockOnceRoleDelete();

      const report = await debugCon().shouldDeleteRole(null);
      delete report.trace;

      expect(report).toMatchObject(failReport);
      expect(report).toMatchSnapshot();
    });

    it("should return a failed report for a no deleted role", async () => {
      const events = new MockEvents(cordeClient, mockDiscord);
      events.mockOnceRoleDelete();
      cordeClient.fetchRole = jest.fn().mockReturnValue(mockDiscord.role);

      const roleIdentifier = { id: "123" };
      const report = await debugCon().shouldDeleteRole(roleIdentifier);
      delete report.trace;

      expect(report).toMatchObject(failReport);
      expect(report).toMatchSnapshot();
    });

    it("should return a passed report for a found role with property role.deleted = true role", async () => {
      const events = new MockEvents(cordeClient, mockDiscord);
      events.mockOnceRoleDelete();
      const role = mockDiscord.role;
      role.deleted = true;
      cordeClient.fetchRole = jest.fn().mockReturnValue(role);

      const roleIdentifier = { id: "123" };
      const report = await debugCon().shouldDeleteRole(roleIdentifier);
      delete report.trace;

      expect(report).toMatchObject(passReport);
      expect(report).toMatchSnapshot();
    });

    it("should fail due to inexistent role", async () => {
      const events = new MockEvents(cordeClient, mockDiscord);
      events.mockOnceRoleDelete();

      cordeClient.findRole = jest.fn().mockReturnValue(null);

      const roleIdentifier = { id: "123" };
      const report = await debugCon().not.shouldDeleteRole(roleIdentifier);
      delete report.trace;

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

      const events = new MockEvents(cordeClient, mockDiscord);
      events.mockOnceRoleDelete();

      const role = mockDiscord.role;
      role.deleted = false;
      cordeClient.fetchRole = jest.fn().mockReturnValue(role);

      const roleIdentifier = { id: "123" };
      const report = await debugCon().shouldDeleteRole(roleIdentifier);
      delete report.trace;

      expect(report).toMatchObject(failReport);
      expect(report).toMatchSnapshot();
    });
  });
});
