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

  it("should return a passed report for a deleted role(isNot false)", async () => {
    const corde = initializeCorde();
    mockEvents.mockOnceRoleDelete();

    const isNot = false;
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
      pass: true,
      message: "",
    };
    expect(report).toMatchObject(model);
  });

  it("should return a failed report for a no deleted role (isNot false)", async () => {
    const corde = initializeCorde();
    mockEvents.mockOnceRoleDelete();
    corde.fetchRole = jest.fn().mockReturnValue(mockDiscord.role);

    const isNot = false;
    const roleData = { id: "123" };
    const toDeleteRole = new ToDeleteRole(corde, "test", isNot);
    const report = await toDeleteRole.action(roleData);

    const baseMessage = roleUtils.createExpectedMessageForMessageData(roleData);
    const message = buildReportMessage(`expected: ${baseMessage}`, `received: ${roleData}`);

    const model: TestReport = {
      pass: false,
      message,
    };
    expect(report).toMatchObject(model);
  });

  it("should return a passed report for a found role with property role.deleted = true role (isNot false)", async () => {
    const corde = initializeCorde();
    mockEvents.mockOnceRoleDelete();
    const role = mockDiscord.role;
    role.deleted = true;
    corde.fetchRole = jest.fn().mockReturnValue(role);

    const isNot = false;
    const roleData = { id: "123" };
    const toDeleteRole = new ToDeleteRole(corde, "test", isNot);
    const report = await toDeleteRole.action(roleData);

    const message = buildReportMessage(
      "expected: a role not deleted",
      `received: the role with id: ${role.id} and name ${role.name} is already deleted`,
    );

    const model: TestReport = {
      pass: false,
      message,
    };
    expect(report).toMatchObject(model);
  });

  it("should return a failed report for a found role with property role.deleted = true role (isNot true)", async () => {
    const corde = initializeCorde();
    mockEvents.mockOnceRoleDelete();
    const role = mockDiscord.role;
    role.deleted = true;
    corde.fetchRole = jest.fn().mockReturnValue(role);

    const isNot = true;
    const toDeleteRole = new ToDeleteRole(corde, "test", isNot);
    const report = await toDeleteRole.action({ id: "123" });

    const message = buildReportMessage(
      "expected: a role not deleted",
      `received: the role with id: ${role.id} and name ${role.name} is already deleted`,
    );

    const model: TestReport = {
      pass: false,
      message,
    };
    expect(report).toMatchObject(model);
  });

  it("should return a passed report for a deleted role(isNot true)", async () => {
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

  it("should fail due to inexistent role", async () => {
    const corde = initCordeClientWithChannel(mockDiscord, new Client());
    mockEvents = new MockEvents(corde, mockDiscord);
    mockEvents.mockOnceRoleDelete();

    corde.findRole = jest.fn().mockReturnValue(null);

    const isNot = true;
    const roleData = { id: "123" };
    const toDeleteRole = new ToDeleteRole(corde, "test", isNot);
    const report = await toDeleteRole.action(roleData);

    const baseMessage = roleUtils.createExpectedMessageForMessageData(roleData);
    const message = buildReportMessage(`expected: ${baseMessage}`, `received: ${roleData}`);

    const model: TestReport = {
      pass: false,
    };
    expect(report).toMatchObject(model);
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
