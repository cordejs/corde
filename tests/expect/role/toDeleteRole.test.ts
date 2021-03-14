import { Client } from "discord.js";
import MockDiscord from "../../mocks/mockDiscord";
import { initCordeClientWithChannel } from "../../testHelper";
import { MockEvents } from "../../mocks/mockEvents";
import { TestReport } from "../../../src/types";
import { ToDeleteRole } from "../../../src/expect/matches";
import { roleUtils } from "../../../src/expect/roleUtils";
import { buildReportMessage } from "../../../src/utils";

let mockDiscord = new MockDiscord();
let mockEvents: MockEvents;

describe("testing toDeleteRole function", () => {
  afterEach(() => {
    mockDiscord = new MockDiscord();
  });

  describe("isnot true", () => {
    it("should return a failed report for a found role with property role.deleted = true role", async () => {
      const corde = initializeCorde();
      mockEvents.mockOnceRoleDelete();
      const role = mockDiscord.role;
      role.deleted = true;
      corde.fetchRole = jest.fn().mockReturnValue(role);

      const isNot = true;
      const command = "!removeRole 123";
      const toDeleteRole = new ToDeleteRole(corde, command, isNot);
      const report = await toDeleteRole.action({ id: "123" });

      const message = buildReportMessage(
        `expected: role ${role.id} not deleted\n`,
        `received: role was deleted before call the command '${command}'`,
      );

      const model: TestReport = {
        pass: false,
        message,
      };
      expect(report).toMatchObject(model);
      expect(report).toMatchSnapshot();
    });

    it("should return a passed report for a deleted role", async () => {
      const corde = initializeCorde();
      mockEvents.mockOnceRoleDelete();
      corde.fetchRole = jest.fn().mockReturnValue(mockDiscord.role);

      const isNot = true;
      const toDeleteRole = new ToDeleteRole(corde, "test", isNot);
      const report = await toDeleteRole.action({ id: "123" });

      const model: TestReport = {
        pass: true,
      };
      expect(report).toMatchObject(model);
    });

    it("should return a failed report for a deleted role(isNot true)", async () => {
      const corde = initializeCorde();
      mockEvents.mockOnceRoleDelete();

      const isNot = true;
      const toDeleteRole = new ToDeleteRole(corde, "test", isNot);
      const report = await toDeleteRole.action({ id: "123" });

      const model: TestReport = {
        pass: false,
        message: buildReportMessage(`expected: role ${mockDiscord.role.id} to not be deleted`),
      };
      expect(report).toMatchObject(model);
      expect(report).toMatchSnapshot();
    });
  });

  describe("isNot false", () => {
    it("should return a passed report for a deleted role", async () => {
      const corde = initializeCorde();
      mockEvents.mockOnceRoleDelete();

      const isNot = false;
      const toDeleteRole = new ToDeleteRole(corde, "test", isNot);
      const report = await toDeleteRole.action({ id: "123" });

      const model: TestReport = {
        pass: true,
      };

      expect(report).toMatchObject(model);
      expect(report).toMatchSnapshot();
    });

    it("should fail due to roleData null", async () => {
      const corde = initializeCorde();
      mockEvents.mockOnceRoleDelete();

      const isNot = false;
      const toDeleteRole = new ToDeleteRole(corde, "test", isNot);
      const report = await toDeleteRole.action(null);
      const message = buildReportMessage(
        "expected: data to identifier the role (id or name)\n",
        `received: null`,
      );
      const model: TestReport = {
        pass: false,
        message,
      };

      expect(report).toMatchObject(model);
      expect(report).toMatchSnapshot();
    });

    it("should return a failed report for a no deleted role", async () => {
      const corde = initializeCorde();
      mockEvents.mockOnceRoleDelete();
      corde.fetchRole = jest.fn().mockReturnValue(mockDiscord.role);

      const isNot = false;
      const roleData = { id: "123" };
      const toDeleteRole = new ToDeleteRole(corde, "test", isNot);
      const report = await toDeleteRole.action(roleData);

      const message = buildReportMessage(`expected: role ${mockDiscord.role.id} to be deleted`);

      const model: TestReport = {
        pass: false,
        message,
      };
      expect(report).toMatchObject(model);
      expect(report).toMatchSnapshot();
    });

    it("should return a passed report for a found role with property role.deleted = true role", async () => {
      const corde = initializeCorde();
      mockEvents.mockOnceRoleDelete();
      const role = mockDiscord.role;
      role.deleted = true;
      corde.fetchRole = jest.fn().mockReturnValue(role);

      const isNot = false;
      const roleData = { id: "123" };
      const command = "!deleteRole 123";
      const toDeleteRole = new ToDeleteRole(corde, command, isNot);
      const report = await toDeleteRole.action(roleData);

      const message = buildReportMessage(
        `expected: role ${role.id} not deleted\n`,
        `received: role was deleted before call the command '${command}'`,
      );

      const model: TestReport = {
        pass: false,
        message,
      };
      expect(report).toMatchObject(model);
      expect(report).toMatchSnapshot();
    });

    it("should fail due to inexistent role", async () => {
      const corde = initCordeClientWithChannel(mockDiscord, new Client());
      mockEvents = new MockEvents(corde, mockDiscord);
      mockEvents.mockOnceRoleDelete();

      corde.findRole = jest.fn().mockReturnValue(null);

      const isNot = true;
      const roleData = { id: "123" };
      const toDeleteRole = new ToDeleteRole(corde, "test", isNot);
      const report = await toDeleteRole.action(roleData);

      const baseMessage = roleUtils.createExpectedMessageForRoleData(roleData);
      const message = buildReportMessage(`expected: ${baseMessage}\n`, `received: null`);

      const model: TestReport = {
        pass: false,
        message,
      };
      expect(report).toMatchObject(model);
      expect(report).toMatchSnapshot();
    });
  });
});

function initializeCorde() {
  const corde = initCordeClientWithChannel(mockDiscord, mockDiscord.client);

  corde.findRole = jest.fn().mockReturnValue(mockDiscord.role);
  corde.sendTextMessage = jest.fn().mockImplementation(() => {});
  corde.fetchRole = jest.fn().mockReturnValue(null);

  mockEvents = new MockEvents(corde, mockDiscord);
  return corde;
}
