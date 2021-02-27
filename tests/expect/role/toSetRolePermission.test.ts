import { Client } from "discord.js";
import { ToSetRolePermission } from "../../../src/expect/matches";
import { TestReport } from "../../../src/types";
import { Permission } from "../../../src/utils/permission";
import MockDiscord from "../../mocks/mockDiscord";
import { initCordeClientWithChannel } from "../../testHelper";

let mockDiscord = new MockDiscord();
const commandName = "test";

describe("testing ToSetRolePosition operation", () => {
  afterEach(() => {
    mockDiscord = new MockDiscord();
  });

  describe("testing with isNot false", () => {
    it("should return error due to not found role (before send command message)", async () => {
      const corde = createCordeBotWithMockedFunctions(
        mockDiscord.createMockRole("", Permission.ADMINISTRATOR),
        false,
      );

      corde.events.waitRolePermissionUpdate = jest.fn().mockReturnValue(mockDiscord.role);
      const toSetRolePermission = new ToSetRolePermission(corde, commandName, false);
      const report = await toSetRolePermission.action(["ADMINISTRATOR"], { id: "123" });

      const expectReport: TestReport = {
        commandName,
        hasPassed: false,
        isNot: false,

        output: "Role not found",
      };

      expect(report).toMatchObject(expectReport);
    });

    it("should get a valid report due to correct defined permission ", async () => {
      const corde = createCordeBotWithMockedFunctions(
        mockDiscord.createMockRole("", Permission.ADMINISTRATOR),
      );

      const role = mockDiscord.createMockRole("", Permission.ADMINISTRATOR);
      corde.events.waitRolePermissionUpdate = jest.fn().mockReturnValue(role);

      const report = await new ToSetRolePermission(corde, commandName, false).action(
        ["ADMINISTRATOR"],
        { id: "123" },
      );

      const expectReport: TestReport = {
        commandName,
        hasPassed: true,
        isNot: false,
      };

      expect(report).toMatchObject(expectReport);
    });

    it("should return error due to not found role (after send command message)", async () => {
      const corde = initCordeClientWithChannel(mockDiscord, new Client());
      corde.getRoles = jest.fn().mockReturnValue(mockDiscord.roleManager.cache);
      corde.hasRole = jest.fn().mockReturnValue(true);
      corde.findRole = jest.fn().mockReturnValue(null);
      corde.sendTextMessage = jest.fn().mockImplementation(() => {});

      corde.events.waitRolePermissionUpdate = jest.fn().mockImplementation();

      const report = await new ToSetRolePermission(corde, commandName, false).action(
        ["ADMINISTRATOR"],
        { id: "123" },
      );

      const expectReport: TestReport = {
        commandName,
        hasPassed: false,
        isNot: false,
        output: "Role not found",
      };

      expect(report).toMatchObject(expectReport);
    });

    it("should return error a exception thrown in function", async () => {
      const corde = initCordeClientWithChannel(mockDiscord, new Client());
      corde.getRoles = jest.fn().mockReturnValue(mockDiscord.roleManager.cache);
      corde.hasRole = jest.fn().mockImplementation(() => {
        throw new Error("");
      });
      corde.findRole = jest.fn().mockReturnValue(null);
      corde.sendTextMessage = jest.fn().mockImplementation(() => {});

      const report = await new ToSetRolePermission(corde, commandName, false).action(
        ["ADMINISTRATOR"],
        { id: "123" },
      );

      const expectReport: TestReport = {
        commandName,
        hasPassed: false,
        isNot: false,
        output: "",
      };

      expect(report).toMatchObject(expectReport);
    });
  });

  describe("testing with isNot true", () => {
    it("should return error due to not found role (before send command message)", async () => {
      const corde = createCordeBotWithMockedFunctions(
        mockDiscord.createMockRole("", Permission.ADMINISTRATOR),
        false,
      );
      const report = await new ToSetRolePermission(corde, commandName, true).action(
        ["ATTACH_FILES"],
        { id: "123" },
      );

      const expectReport: TestReport = {
        commandName,
        hasPassed: false,
        isNot: true,

        output: "Role not found",
      };
      expect(report).toMatchObject(expectReport);
    });

    it("should get a valid report due to correct defined permission ", async () => {
      const corde = createCordeBotWithMockedFunctions(
        mockDiscord.createMockRole("", Permission.ADMINISTRATOR),
      );
      corde.events.waitRolePermissionUpdate = jest.fn().mockReturnValue(mockDiscord.role);

      const report = await new ToSetRolePermission(corde, commandName, true).action(
        ["ATTACH_FILES"],
        { id: "123" },
      );

      const expectReport: TestReport = {
        commandName,
        hasPassed: true,
        isNot: true,
      };

      expect(report).toMatchObject(expectReport);
    });

    it("should return error due to not found role (after send command message)", async () => {
      const corde = initCordeClientWithChannel(mockDiscord, new Client());
      corde.getRoles = jest.fn().mockReturnValue(mockDiscord.roleManager.cache);
      corde.hasRole = jest.fn().mockReturnValue(true);
      corde.findRole = jest.fn().mockReturnValue(null);
      corde.sendTextMessage = jest.fn().mockImplementation(() => {});

      corde.events.waitRolePermissionUpdate = jest.fn().mockImplementation();

      const report = await new ToSetRolePermission(corde, commandName, true).action(
        ["ADMINISTRATOR"],
        { id: "123" },
      );

      const expectReport: TestReport = {
        commandName,
        hasPassed: false,
        isNot: true,
        output: "Role not found",
      };

      expect(report).toMatchObject(expectReport);
    });

    it("should return error a exception thrown in function", async () => {
      const corde = initCordeClientWithChannel(mockDiscord, new Client());
      corde.getRoles = jest.fn().mockReturnValue(mockDiscord.roleManager.cache);
      corde.hasRole = jest.fn().mockImplementation(() => {
        throw new Error("");
      });
      corde.findRole = jest.fn().mockReturnValue(null);
      corde.sendTextMessage = jest.fn().mockImplementation(() => {});

      const report = await new ToSetRolePermission(corde, commandName, true).action(
        ["ADMINISTRATOR"],
        { id: "123" },
      );

      const expectReport: TestReport = {
        commandName,
        hasPassed: false,
        isNot: true,
        output: "",
      };

      expect(report).toMatchObject(expectReport);
    });
  });
});

function createCordeBotWithMockedFunctions(findRoleMock: any = mockDiscord.role, hasRole = true) {
  const corde = initCordeClientWithChannel(mockDiscord, new Client());
  corde.getRoles = jest.fn().mockReturnValue(mockDiscord.roleManager.cache);
  corde.hasRole = jest.fn().mockReturnValue(hasRole);
  corde.findRole = jest.fn().mockReturnValue(findRoleMock);
  corde.sendTextMessage = jest.fn().mockImplementation(() => {});
  return corde;
}
