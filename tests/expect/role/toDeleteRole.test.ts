import { Client } from "discord.js";
import MockDiscord from "../../mocks/mockDiscord";
import { initCordeClientWithChannel } from "../../testHelper";
import { MockEvents } from "../../mocks/mockEvents";
import { TestReport } from "../../../src/types";
import { ToDeleteRole } from "../../../src/expect/matches";

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
      commandName: "test",
      hasPassed: true,
      isNot: isNot,
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
      commandName: "test",
      hasPassed: false,
      isNot: isNot,
    };
    expect(report).toMatchObject(model);
  });

  it("should return a failed report for a no deleted role (isNot false)", async () => {
    const corde = initializeCorde();
    mockEvents.mockOnceRoleDelete();
    corde.fetchRole = jest.fn().mockReturnValue(mockDiscord.role);

    const isNot = false;
    const toDeleteRole = new ToDeleteRole(corde, "test", isNot);
    const report = await toDeleteRole.action({ id: "123" });

    const model: TestReport = {
      commandName: "test",
      hasPassed: false,
      isNot: isNot,
    };
    expect(report).toMatchObject(model);
  });

  it("should return a passed report for a found role with property role.deleted = true role (isNot false)", async () => {
    const corde = initializeCorde();
    mockEvents.mockOnceRoleDelete();
    mockDiscord.role.deleted = true;
    corde.fetchRole = jest.fn().mockReturnValue(mockDiscord.role);

    const isNot = false;
    const toDeleteRole = new ToDeleteRole(corde, "test", isNot);
    const report = await toDeleteRole.action({ id: "123" });

    const model: TestReport = {
      commandName: "test",
      hasPassed: true,
      isNot: isNot,
    };
    expect(report).toMatchObject(model);
  });

  it("should return a failed report for a found role with property role.deleted = true role (isNot true)", async () => {
    const corde = initializeCorde();
    mockEvents.mockOnceRoleDelete();
    mockDiscord.role.deleted = true;
    corde.fetchRole = jest.fn().mockReturnValue(mockDiscord.role);

    const isNot = true;
    const toDeleteRole = new ToDeleteRole(corde, "test", isNot);
    const report = await toDeleteRole.action({ id: "123" });

    const model: TestReport = {
      commandName: "test",
      hasPassed: false,
      isNot: isNot,
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
      commandName: "test",
      hasPassed: true,
      isNot: isNot,
    };
    expect(report).toMatchObject(model);
  });

  it("should fail due to inexistent role", async () => {
    const corde = initCordeClientWithChannel(mockDiscord, new Client());
    mockEvents = new MockEvents(corde, mockDiscord);
    mockEvents.mockOnceRoleDelete();

    corde.findRole = jest.fn().mockReturnValue(null);

    const isNot = true;
    const toDeleteRole = new ToDeleteRole(corde, "test", isNot);
    const report = await toDeleteRole.action({ id: "123" });

    const model: TestReport = {
      commandName: "test",
      output: "No role found",
      hasPassed: false,
      isNot: isNot,
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
