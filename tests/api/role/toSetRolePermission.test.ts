import { exception } from "console";
import { Client } from "discord.js";
import { TestReport } from "../../../src/api";
import { ToSetRolePermission } from "../../../src/api/expectMatches/role";
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
      const report = await new ToSetRolePermission(corde, commandName, false).action(
        [Permission.ADMINISTRATOR],
        { id: "123" },
      );

      expect(report).toEqual(
        new TestReport({
          commandName,
          hasPassed: false,
          isNot: false,
          showExpectAndOutputValue: false,
          output: "Role not found",
        }),
      );
    });

    it("should get a valid report due to correct defined permission ", async () => {
      const corde = createCordeBotWithMockedFunctions(
        mockDiscord.createMockRole("", Permission.ADMINISTRATOR),
      );
      const report = await new ToSetRolePermission(corde, commandName, false).action(
        [Permission.ADMINISTRATOR],
        { id: "123" },
      );

      expect(report).toEqual(
        new TestReport({
          commandName,
          hasPassed: true,
          isNot: false,
          showExpectAndOutputValue: false,
        }),
      );
    });

    it("should return error due to not found role (after send command message)", async () => {
      const corde = initCordeClientWithChannel(mockDiscord, new Client());
      corde.getRoles = jest.fn().mockReturnValue(mockDiscord.roleManager.cache);
      corde.hasRole = jest.fn().mockReturnValue(true);
      corde.findRole = jest.fn().mockReturnValue(null);
      corde.sendTextMessage = jest.fn().mockImplementation(() => {});

      const report = await new ToSetRolePermission(corde, commandName, false).action(
        [Permission.ADMINISTRATOR],
        { id: "123" },
      );

      expect(report).toEqual(
        new TestReport({
          commandName,
          hasPassed: false,
          isNot: false,
          output: "Role not found",
          showExpectAndOutputValue: false,
        }),
      );
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
        [Permission.ADMINISTRATOR],
        { id: "123" },
      );

      expect(report).toEqual(
        new TestReport({
          commandName,
          hasPassed: false,
          isNot: false,
          output: "",
          showExpectAndOutputValue: false,
        }),
      );
    });
  });

  describe("testing with isNot true", () => {
    it("should return error due to not found role (before send command message)", async () => {
      const corde = createCordeBotWithMockedFunctions(
        mockDiscord.createMockRole("", Permission.ADMINISTRATOR),
        false,
      );
      const report = await new ToSetRolePermission(corde, commandName, true).action(
        [Permission.ATTACH_FILES],
        { id: "123" },
      );

      expect(report).toEqual(
        new TestReport({
          commandName,
          hasPassed: false,
          isNot: true,
          showExpectAndOutputValue: false,
          output: "Role not found",
        }),
      );
    });

    it("should get a valid report due to correct defined permission ", async () => {
      const corde = createCordeBotWithMockedFunctions(
        mockDiscord.createMockRole("", Permission.ADMINISTRATOR),
      );
      const report = await new ToSetRolePermission(corde, commandName, true).action(
        [Permission.ATTACH_FILES],
        { id: "123" },
      );

      expect(report).toEqual(
        new TestReport({
          commandName,
          hasPassed: true,
          isNot: true,
          showExpectAndOutputValue: false,
        }),
      );
    });

    it("should return error due to not found role (after send command message)", async () => {
      const corde = initCordeClientWithChannel(mockDiscord, new Client());
      corde.getRoles = jest.fn().mockReturnValue(mockDiscord.roleManager.cache);
      corde.hasRole = jest.fn().mockReturnValue(true);
      corde.findRole = jest.fn().mockReturnValue(null);
      corde.sendTextMessage = jest.fn().mockImplementation(() => {});

      const report = await new ToSetRolePermission(corde, commandName, true).action(
        [Permission.ADMINISTRATOR],
        { id: "123" },
      );

      expect(report).toEqual(
        new TestReport({
          commandName,
          hasPassed: false,
          isNot: true,
          output: "Role not found",
          showExpectAndOutputValue: false,
        }),
      );
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
        [Permission.ADMINISTRATOR],
        { id: "123" },
      );

      expect(report).toEqual(
        new TestReport({
          commandName,
          hasPassed: true,
          isNot: true,
          output: "",
          showExpectAndOutputValue: false,
        }),
      );
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
