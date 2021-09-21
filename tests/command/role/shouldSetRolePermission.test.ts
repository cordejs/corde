import { Client } from "discord.js";
import MockDiscord from "../../mocks/mockDiscord";
import { createCordeBotWithMockedFunctions } from "../../testHelper";
import { ICordeBot, ITestReport, Permission } from "../../../src/types";
import { calcPermissionsValue } from "../../../src/utils";
import { MockEvents } from "../../mocks/mockEvents";
import { runtime } from "../../../src/common/runtime";
import { debugCommand } from "../../../src/command";

const testName = "shouldSetRolePermission";

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
  afterEach(() => {
    mockDiscord = new MockDiscord();
    runtime.setConfigs({ timeout: 100 }, true);
    cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());
  });

  it("should fail due to undefined roleIdentifier", async () => {
    const report = await debugCon().shouldSetRolePermission(undefined, ["ADD_REACTIONS"]);
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return false due to invalid permission parameter (object)", async () => {
    const report = await debugCon()
      // @ts-ignore
      .shouldSetRolePermission({ id: "123" }, {});
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should fail due to invalid permission value", async () => {
    const report = await debugCon()
      // @ts-ignore
      .shouldSetRolePermission({ id: "123" }, ["BANANA"]);
    expect(report).toMatchObject(failReport);
  });

  it("should return false due to invalid permission parameter (undefined)", async () => {
    const report = await debugCon()
      // @ts-ignore
      .shouldSetRolePermission({ id: "123" }, {});

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return false due to not found role", async () => {
    cordeClient.findRole = jest.fn().mockReturnValue(null);
    const report = await debugCon().shouldSetRolePermission({ id: "123" }, ["ATTACH_FILES"]);

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should fail due to role permissions was not updated", async () => {
    const report = await debugCon().shouldSetRolePermission({ id: "123" }, ["ATTACH_FILES"]);
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return true due to isNot true and no role change", async () => {
    const report = await debugCon().not.shouldSetRolePermission({ id: "123" }, ["ATTACH_FILES"]);
    expect(report).toEqual(passReport);
    expect(report).toMatchSnapshot();
  });

  it("should return true due to role changed permissions (isNot false)", async () => {
    const mockEvent = new MockEvents(cordeClient, mockDiscord);
    const mockRole = mockDiscord.createMockRole(
      "test role",
      calcPermissionsValue(...mockDiscord.role.permissions.toArray().map((p) => Permission[p])),
    );

    mockEvent.mockOnceRolePermissionsUpdate(mockRole);
    const report = await debugCon().shouldSetRolePermission(
      { id: "123" },
      mockRole.permissions.toArray(),
    );
    expect(report).toEqual(passReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test due to permissions should not change (isNot true)", async () => {
    const mockRole = mockDiscord.createMockRole(
      "test role",
      calcPermissionsValue(Permission.ADMINISTRATOR),
    );
    const mockEvent = new MockEvents(cordeClient, mockDiscord);

    mockEvent.mockOnceRolePermissionsUpdate(mockRole);
    const report = await debugCon().not.shouldSetRolePermission({ id: "123" }, ["ADMINISTRATOR"]);
    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a not passed test due to permissions should not change (isNot true)", async () => {
    const mockRole = mockDiscord.createMockRole(
      "test role",
      calcPermissionsValue(Permission.ADMINISTRATOR, Permission.BAN_MEMBERS),
    );
    const mockEvent = new MockEvents(cordeClient, mockDiscord);

    mockEvent.mockOnceRolePermissionsUpdate(mockRole);
    const report = await debugCon().not.shouldSetRolePermission({ id: "123" }, [
      "ADMINISTRATOR",
      "BAN_MEMBERS",
    ]);

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a not passed test due to permissions should not change (isNot true)", async () => {
    const mockRole = mockDiscord.createMockRole(
      "test role",
      calcPermissionsValue(Permission.ADMINISTRATOR, Permission.BAN_MEMBERS, Permission.CONNECT),
    );

    const mockEvent = new MockEvents(cordeClient, mockDiscord);

    mockEvent.mockOnceRolePermissionsUpdate(mockRole);

    const report = await debugCon().not.shouldSetRolePermission({ id: "123" }, [
      "ADMINISTRATOR",
      "BAN_MEMBERS",
      "CONNECT",
    ]);

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a not passed test due expected name did not match to received", async () => {
    const mockEvent = new MockEvents(cordeClient, mockDiscord);
    mockEvent.mockOnceRolePermissionsUpdate(mockDiscord.role);
    const report = await debugCon().shouldSetRolePermission({ id: "123" }, ["ATTACH_FILES"]);

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a not passed test due expected name did not match to received", async () => {
    const mockEvent = new MockEvents(cordeClient, mockDiscord);
    mockEvent.mockOnceRolePermissionsUpdate(mockDiscord.role);
    const report = await debugCon().shouldSetRolePermission({ id: "123" }, null);

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

    const report = await debugCon().shouldSetRolePermission({ id: "123" }, ["ATTACH_FILES"]);

    expect(report).toMatchObject(failReport);
    expect(report).toMatchSnapshot();
  });
});
