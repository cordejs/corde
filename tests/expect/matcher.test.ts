import { testCollector } from "../../src/common/testCollector";
import { runtime } from "../../src/common/runtime";
import { Colors } from "../../src/utils/colors";
import {
  ToSetRolePosition,
  ToRenameRole,
  ToSetRoleHoist,
  ToSetRoleMentionable,
  ToSetRolePermission,
  ToPinMessage,
  ToUnpinMessage,
  ToAddReaction,
  ToDeleteRole,
  ToEditMessage,
  ToRemoveReaction,
  ToReturn,
  ToSetRoleColor,
} from "../../src/expect/matches";
import { TestReport } from "../../src/types";
import { ExpectMatchesWithNot } from "../../src/expect/matcher";

jest.mock("../../src/expect/matches/message/toReturn.ts");
jest.mock("../../src/expect/matches/message/toRemoveReaction.ts");
jest.mock("../../src/expect/matches/message/toEditMessage.ts");
jest.mock("../../src/expect/matches/message/toAddReaction.ts");
jest.mock("../../src/expect/matches/message/toPinMessage.ts");
jest.mock("../../src/expect/matches/message/toUnpinMessage.ts");

jest.mock("../../src/expect/matches/role/toDeleteRole.ts");
jest.mock("../../src/expect/matches/role/toSetRoleColor.ts");
jest.mock("../../src/expect/matches/role/toSetRoleMentionable");
jest.mock("../../src/expect/matches/role/toSetRoleHoist");
jest.mock("../../src/expect/matches/role/toRenameRole");
jest.mock("../../src/expect/matches/role/toSetRolePosition");
jest.mock("../../src/expect/matches/role/toSetRolePermission.ts");

let toEditMessageSpy: jest.SpyInstance;
let toReturnSpy: jest.SpyInstance;
let toAddReactionSpy: jest.SpyInstance;
let toRemoveReactionSpy: jest.SpyInstance;
let toSetRoleColorSpy: jest.SpyInstance;
let toDeleteRoleSpy: jest.SpyInstance;
let toSetRoleMentionableSpy: jest.SpyInstance<any, any>;
let toSetHoistSpy: jest.SpyInstance<any, any>;
let toRenameRoleSpy: jest.SpyInstance<any, any>;
let toSetRolePositionSpy: jest.SpyInstance<any, any>;
let toSetRolePermissionSpy: jest.SpyInstance<any, any>;
let toPinMessageSpy: jest.SpyInstance<any, any>;
let toUnpinMessageSpy: jest.SpyInstance<any, any>;

const toEditMessageMock = jest.fn();
const toSetRoleMentionableActionMock = jest.fn();
const toSetHoistActionMock = jest.fn();
const toReturnMock = jest.fn();
const toAddReactionMock = jest.fn();
const toRemoveReactionMock = jest.fn();
const toRenameRoleActionMock = jest.fn();
const toSetRoleColorMock = jest.fn();
const toDeleteRoleMock = jest.fn();
const toSetRolePositionActionMock = jest.fn();
const toSetRolePermissionMock = jest.fn();
const toPinMessageMock = jest.fn();
const toUnpinMessageMock = jest.fn();

const con = "test";

describe("Testing matches class", () => {
  beforeEach(() => {
    testCollector.clearIsolatedTestFunctions();
    const testReportPromiseResponse = Promise.resolve({} as TestReport);
    toReturnSpy = (ToReturn as jest.Mock).mockImplementation(() => {
      return {
        action: toReturnMock,
      };
    });

    toAddReactionSpy = (ToAddReaction as jest.Mock).mockImplementation(() => {
      return {
        action: toAddReactionMock,
      };
    });

    toRemoveReactionSpy = (ToRemoveReaction as jest.Mock).mockImplementation(() => {
      return {
        action: toRemoveReactionMock,
      };
    });

    toSetRoleColorSpy = (ToSetRoleColor as jest.Mock).mockImplementation(() => {
      return {
        action: toSetRoleColorMock,
      };
    });

    toEditMessageSpy = (ToEditMessage as jest.Mock).mockImplementation(() => {
      return {
        action: toEditMessageMock,
      };
    });

    toDeleteRoleSpy = (ToDeleteRole as jest.Mock).mockImplementation(() => {
      return {
        action: toDeleteRoleMock,
      };
    });

    toSetRoleMentionableSpy = (ToSetRoleMentionable as jest.Mock).mockImplementation(() => {
      return {
        action: toSetRoleMentionableActionMock,
      };
    });

    toSetHoistSpy = (ToSetRoleHoist as jest.Mock).mockImplementation(() => {
      return {
        action: toSetHoistActionMock,
      };
    });

    toRenameRoleSpy = (ToRenameRole as jest.Mock).mockImplementation(() => {
      return {
        action: toRenameRoleActionMock,
      };
    });

    toSetRolePositionSpy = (ToSetRolePosition as jest.Mock).mockImplementation(() => {
      return {
        action: toSetRolePositionActionMock,
      };
    });

    toSetRolePermissionSpy = (ToSetRolePermission as jest.Mock).mockImplementation(() => {
      return {
        action: toSetRolePermissionMock,
      };
    });

    toPinMessageSpy = (ToPinMessage as jest.Mock).mockImplementation(() => {
      return {
        action: toPinMessageMock,
      };
    });

    toUnpinMessageSpy = (ToUnpinMessage as jest.Mock).mockImplementation(() => {
      return {
        action: toUnpinMessageMock,
      };
    });
  });

  afterEach(() => {
    toSetRoleMentionableSpy.mockClear();
    toSetRolePermissionSpy.mockClear();
    toPinMessageSpy.mockClear();
  });

  it("should not return a function", () => {
    const matches = new ExpectMatchesWithNot("name");
    expect(matches.not).not.toBe(undefined);
  });

  describe("testing toReturn function", () => {
    it("should add a function to hasIsolatedTestFunctions after call toReturn", () => {
      new ExpectMatchesWithNot("test").toReturn("empty");
      expect(testCollector.hasIsolatedTestFunctions()).toBe(true);
    });

    it("should add a toReturn function", () => {
      new ExpectMatchesWithNot(con).toReturn("expect");
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toReturnSpy).toBeCalled();
    });

    it("should add a toReturn function with correct values (isNot false)", () => {
      const expectName = "empty";
      new ExpectMatchesWithNot(con).toReturn(expectName);
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToReturn).toBeCalledWith(runtime.bot, con, false);
      expect(toReturnMock).toBeCalledWith(expectName);
    });

    it("should add a toReturn function with correct values (isNot true)", () => {
      const expectName = "empty";
      new ExpectMatchesWithNot(con).not.toReturn(expectName);
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToReturn).toBeCalledWith(runtime.bot, con, true);
      expect(toReturnMock).toBeCalledWith(expectName);
    });
  });

  describe("testing toAddReaction function", () => {
    it("should add a function to hasIsolatedTestFunctions after call toAddReaction", () => {
      new ExpectMatchesWithNot("test").toAddReaction("😀");
      expect(testCollector.hasIsolatedTestFunctions()).toBe(true);
    });

    it("should add a toAddReaction function", () => {
      new ExpectMatchesWithNot("con").toAddReaction("😀");
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toAddReactionSpy).toBeCalled();
    });

    it("should add a toAddReaction function with correct values (isNot false)", () => {
      const expectReaction = "😀";
      new ExpectMatchesWithNot(con).toAddReaction(expectReaction);
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToAddReaction).toBeCalledWith(runtime.bot, con, false);
      expect(toAddReactionMock).toBeCalledWith([expectReaction]);
    });

    it("should add a toAddReaction function with correct values (isNot true)", () => {
      const expectReaction = "😀";
      new ExpectMatchesWithNot(con).not.toAddReaction(expectReaction);
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToAddReaction).toBeCalledWith(runtime.bot, con, true);
      expect(toAddReactionMock).toBeCalledWith([expectReaction]);
    });
  });

  describe("testing toRemoveReaction function", () => {
    it("should add a function to hasIsolatedTestFunctions after call toRemoveReaction", () => {
      new ExpectMatchesWithNot("test").toRemoveReaction("😀");
      expect(testCollector.hasIsolatedTestFunctions()).toBe(true);
    });

    it("should add a toRemoveReaction function", () => {
      new ExpectMatchesWithNot("con").toRemoveReaction("😀");
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toRemoveReactionSpy).toBeCalled();
    });

    it("should add a toRemoveReaction function with message data", () => {
      const expectReaction = "😀";
      const messageIdentifier = { id: "12312312" };
      new ExpectMatchesWithNot(con).toRemoveReaction(expectReaction, messageIdentifier);
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToRemoveReaction).toBeCalledWith(runtime.bot, con, false);
      expect(toRemoveReactionMock).toBeCalledWith([expectReaction], messageIdentifier);
    });

    it("should add a toRemoveReaction function with array of emojis", () => {
      const expectReaction = ["😀"];
      const messageIdentifier = { id: "12312312" };
      new ExpectMatchesWithNot(con).toRemoveReaction(expectReaction, messageIdentifier);
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToRemoveReaction).toBeCalledWith(runtime.bot, con, false);
      expect(toRemoveReactionMock).toBeCalledWith(expectReaction, messageIdentifier);
    });

    it("should add a toRemoveReaction function with correct values (isNot true)", () => {
      const expectReaction = "😀";
      new ExpectMatchesWithNot(con).not.toRemoveReaction(expectReaction);
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToRemoveReaction).toBeCalledWith(runtime.bot, con, true);
      expect(toRemoveReactionMock).toBeCalledWith([expectReaction], undefined);
    });
  });

  describe("testing toSetRoleColor function", () => {
    const color = Colors.DARK_AQUA;
    const roleId = {
      id: "123",
    };

    it("should add a function to hasIsolatedTestFunctions after call toSetRoleColor", () => {
      new ExpectMatchesWithNot("test").toSetRoleColor(color, "123");
      expect(testCollector.hasIsolatedTestFunctions()).toBe(true);
    });

    it("should add a toSetRoleColor function", () => {
      new ExpectMatchesWithNot("con").toSetRoleColor(color, "123");
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toSetRoleColorSpy).toBeCalled();
    });

    it("should add a toSetRoleColor function with correct values (isNot false)", () => {
      new ExpectMatchesWithNot(con).toSetRoleColor(color, "123");
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToSetRoleColor).toBeCalledWith(runtime.bot, con, false);
      expect(toSetRoleColorMock).toBeCalledWith(color, roleId);
    });

    it("should add a toSetRoleColor function with message data", () => {
      new ExpectMatchesWithNot(con).toSetRoleColor(Colors.DARK_AQUA, { id: "123" });
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToSetRoleColor).toBeCalledWith(runtime.bot, con, false);
      expect(toSetRoleColorMock).toBeCalledWith(color, { id: "123" });
    });

    it("should add a toSetRoleColor function with correct values (isNot true)", () => {
      new ExpectMatchesWithNot(con).not.toSetRoleColor(color, "123");
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToSetRoleColor).toBeCalledWith(runtime.bot, con, true);
      expect(toSetRoleColorMock).toBeCalledWith(color, roleId);
    });
  });

  describe("testing toDeleteRole function", () => {
    const roleId = {
      id: "123",
    };

    it("should add a function to hasIsolatedTestFunctions after call toDeleteRole", () => {
      new ExpectMatchesWithNot("test").toDeleteRole("123");
      expect(testCollector.hasIsolatedTestFunctions()).toBe(true);
    });

    it("should add a toDeleteRole function", () => {
      new ExpectMatchesWithNot("con").toDeleteRole("123");
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toDeleteRoleSpy).toBeCalled();
    });

    it("should add a toDeleteRole function with correct values (isNot false)", () => {
      new ExpectMatchesWithNot(con).toDeleteRole("123");
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToDeleteRole).toBeCalledWith(runtime.bot, con, false);
      expect(toDeleteRoleMock).toBeCalledWith(roleId);
    });

    it("should add a toDeleteRole function with id", () => {
      new ExpectMatchesWithNot(con).toDeleteRole("123");
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToDeleteRole).toBeCalledWith(runtime.bot, con, false);
      expect(toDeleteRoleMock).toBeCalledWith(roleId);
    });

    it("should add a toDeleteRole function with id in data object", () => {
      new ExpectMatchesWithNot(con).toDeleteRole(roleId);
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToDeleteRole).toBeCalledWith(runtime.bot, con, false);
      expect(toDeleteRoleMock).toBeCalledWith(roleId);
    });

    it("should add a toDeleteRole function with name in data object", () => {
      new ExpectMatchesWithNot(con).toDeleteRole({ name: "test" });
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToDeleteRole).toBeCalledWith(runtime.bot, con, false);
      expect(toDeleteRoleMock).toBeCalledWith({ name: "test" });
    });

    it("should add a toDeleteRole function with correct values (isNot true)", () => {
      new ExpectMatchesWithNot(con).not.toDeleteRole("123");
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToDeleteRole).toBeCalledWith(runtime.bot, con, false);
      expect(toDeleteRoleMock).toBeCalledWith(roleId);
    });
  });

  describe("testing toSetRoleMentionable function", () => {
    const roleId = {
      id: "123",
    };
    const mentionableTrue = true;

    it("should add a function to hasIsolatedTestFunctions after call toSetRoleMentionable", () => {
      new ExpectMatchesWithNot("test").toSetRoleMentionable(true, roleId);
      expect(testCollector.hasIsolatedTestFunctions()).toBe(true);
    });

    it("should add a toSetRoleMentionable function", () => {
      new ExpectMatchesWithNot("con").toSetRoleMentionable(true, roleId);
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toSetRoleMentionableSpy).toBeCalled();
    });

    it("should add a toSetRoleMentionable function with correct values (isNot false)", () => {
      new ExpectMatchesWithNot(con).toSetRoleMentionable(mentionableTrue, roleId);
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToSetRoleMentionable).toBeCalledWith(runtime.bot, con, false);
      expect(toSetRoleMentionableActionMock).toBeCalledWith(mentionableTrue, roleId);
    });

    it("should add a toSetRoleMentionable function with correct values (isNot true)", () => {
      new ExpectMatchesWithNot(con).not.toSetRoleMentionable(mentionableTrue, roleId);
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToSetRoleMentionable).toBeCalledWith(runtime.bot, con, true);
      expect(toSetRoleMentionableActionMock).toBeCalledWith(mentionableTrue, roleId);
    });
  });

  describe("testing toSetRoleHoist function", () => {
    const roleId = {
      id: "123",
    };
    const mentionableTrue = true;
    it("should add a function to hasIsolatedTestFunctions after call toSetRoleHoist", () => {
      new ExpectMatchesWithNot("test").toSetRoleHoist(mentionableTrue, roleId);
      expect(testCollector.hasIsolatedTestFunctions()).toBe(true);
    });

    it("should add a toSetRoleHoist function", () => {
      new ExpectMatchesWithNot("con").toSetRoleHoist(mentionableTrue, roleId);
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toSetHoistSpy).toBeCalled();
    });

    it("should add a toSetRoleHoist function with correct values using id", () => {
      new ExpectMatchesWithNot(con).toSetRoleHoist(mentionableTrue, "123");
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToSetRoleHoist).toBeCalledWith(runtime.bot, con, false);
      expect(toSetHoistActionMock).toBeCalledWith(true, roleId);
    });

    it("should add a toSetRoleHoist function with correct values (isNot false)", () => {
      new ExpectMatchesWithNot(con).toSetRoleHoist(mentionableTrue, roleId);
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToSetRoleHoist).toBeCalledWith(runtime.bot, con, false);
      expect(toSetHoistActionMock).toBeCalledWith(true, roleId);
    });

    it("should add a toSetRoleHoist function with correct values (isNot true)", () => {
      new ExpectMatchesWithNot(con).not.toSetRoleHoist(mentionableTrue, roleId);
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToSetRoleHoist).toBeCalledWith(runtime.bot, con, true);
      expect(toSetHoistActionMock).toBeCalledWith(mentionableTrue, roleId);
    });
  });

  describe("testing toRenameRole function", () => {
    const roleId = {
      id: "123",
    };

    it("should add a function to hasIsolatedTestFunctions after call toRenameRole", () => {
      initExpectMatch().toRenameRole("newName", roleId);
      expect(testCollector.hasIsolatedTestFunctions()).toBe(true);
    });

    it("should add a toRenameRole function", () => {
      initExpectMatch().toRenameRole("newName", roleId);
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toSetHoistSpy).toBeCalled();
    });

    it("should add a toRenameRole function with correct values using id", () => {
      initExpectMatch().toRenameRole("newName", "123");
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToRenameRole).toBeCalledWith(runtime.bot, con, false);
      expect(toRenameRoleActionMock).toBeCalledWith("newName", { id: "123" });
    });

    it("should add a toRenameRole function with correct values (isNot false)", () => {
      initExpectMatch().toRenameRole("newName", roleId);
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToRenameRole).toBeCalledWith(runtime.bot, con, false);
      expect(toRenameRoleActionMock).toBeCalledWith("newName", roleId);
    });

    it("should add a toRenameRole function with correct values (isNot true)", () => {
      initExpectMatch().not.toRenameRole("newName", roleId);
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToRenameRole).toBeCalledWith(runtime.bot, con, true);
      expect(toRenameRoleActionMock).toBeCalledWith("newName", roleId);
    });
  });

  describe("testing toSetRolePosition function", () => {
    const roleId = {
      id: "123",
    };

    const newPosition = 1;
    it("should add a function to hasIsolatedTestFunctions after call toSetRolePosition", () => {
      initExpectMatch().toSetRolePosition(newPosition, roleId);
      expect(testCollector.hasIsolatedTestFunctions()).toBe(true);
    });

    it("should add a toSetRolePosition function", () => {
      initExpectMatch().toSetRolePosition(newPosition, roleId);
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toSetRolePositionSpy).toBeCalled();
    });

    it("should add a toSetRolePosition function with correct values using id", () => {
      initExpectMatch().toSetRolePosition(newPosition, roleId);
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToSetRolePosition).toBeCalledWith(runtime.bot, con, false);
      expect(toSetRolePositionActionMock).toBeCalledWith(newPosition, { id: "123" });
    });

    it("should add a toSetRolePosition function with correct values (isNot false)", () => {
      initExpectMatch().toSetRolePosition(newPosition, roleId);
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToSetRolePosition).toBeCalledWith(runtime.bot, con, false);
      expect(toSetRolePositionActionMock).toBeCalledWith(newPosition, roleId);
    });

    it("should add a toSetRolePosition function with correct values (isNot true)", () => {
      initExpectMatch().not.toSetRolePosition(newPosition, roleId);
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToSetRolePosition).toBeCalledWith(runtime.bot, con, true);
      expect(toSetRolePositionActionMock).toBeCalledWith(newPosition, roleId);
    });
  });

  describe("testing toSetRolePermission function", () => {
    const roleId = {
      id: "123",
    };

    function toSetRolePermission() {
      initExpectMatch().toSetRolePermission(roleId, "ADMINISTRATOR");
    }

    it("should add a function to hasIsolatedTestFunctions after call toSetRolePermission", () => {
      toSetRolePermission();
      expect(testCollector.hasIsolatedTestFunctions()).toBe(true);
    });

    it("should add a toSetRolePermission function", () => {
      toSetRolePermission();
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toSetRolePermissionSpy).toBeCalled();
    });

    it("should add a toSetRolePermission function with correct values using id", () => {
      toSetRolePermission();
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToSetRolePermission).toBeCalledWith(runtime.bot, con, false);
      expect(toSetRolePermissionMock).toBeCalledWith(["ADMINISTRATOR"], roleId);
    });

    it("should add a toSetRolePermission function with correct values (isNot false)", () => {
      toSetRolePermission();
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToSetRolePermission).toBeCalledWith(runtime.bot, con, false);
      expect(toSetRolePermissionMock).toBeCalledWith(["ADMINISTRATOR"], roleId);
    });

    it("should add a toSetRolePermission function with correct values (isNot true)", () => {
      initExpectMatch().not.toSetRolePermission(roleId, "ADMINISTRATOR");
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToSetRolePermission).toBeCalledWith(runtime.bot, con, true);
      expect(toSetRolePermissionMock).toBeCalledWith(["ADMINISTRATOR"], roleId);
    });
  });

  describe("testing to pinMessage", () => {
    const messageId = {
      id: "123",
    };

    it("should add a function to hasIsolatedTestFunctions after call toPin", () => {
      initExpectMatch().toPin(messageId);
      expect(testCollector.hasIsolatedTestFunctions()).toBe(true);
    });

    it("should add a toPin function", () => {
      initExpectMatch().toPin(messageId);
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toPinMessageSpy).toBeCalled();
    });

    it("should add a toPin function with correct values using id", () => {
      initExpectMatch().toPin(messageId);
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToPinMessage).toBeCalledWith(runtime.bot, con, false);
      expect(toPinMessageMock).toBeCalledWith(messageId);
    });

    it("should add a toPin function with correct values using string id", () => {
      const id = "1323";
      initExpectMatch().toPin(id);
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToPinMessage).toBeCalledWith(runtime.bot, con, false);
      expect(toPinMessageMock).toBeCalledWith({ id: id });
    });

    it("should add a toPin function with correct values (isNot false)", () => {
      initExpectMatch().toPin(messageId);
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToPinMessage).toBeCalledWith(runtime.bot, con, false);
      expect(toPinMessageMock).toBeCalledWith(messageId);
    });

    it("should add a toPin function with correct values (isNot true)", () => {
      initExpectMatch().not.toPin(messageId);
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToPinMessage).toBeCalledWith(runtime.bot, con, true);
      expect(toPinMessageMock).toBeCalledWith(messageId);
    });
  });

  describe("testing to unPinMessage", () => {
    const messageId = {
      id: "123",
    };

    it("should add a function to hasIsolatedTestFunctions after call toUnpin", () => {
      initExpectMatch().toUnPin(messageId);
      expect(testCollector.hasIsolatedTestFunctions()).toBe(true);
    });

    it("should add a toUnpin function", () => {
      initExpectMatch().toUnPin(messageId);
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toUnpinMessageSpy).toBeCalled();
    });

    it("should add a toUnpin function with correct values using id", () => {
      initExpectMatch().toUnPin(messageId);
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToUnpinMessage).toBeCalledWith(runtime.bot, con, false);
      expect(toUnpinMessageMock).toBeCalledWith(messageId);
    });

    it("should add a toUnpin function with correct values using string id", () => {
      const id = "123121";
      initExpectMatch().toUnPin(id);
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToUnpinMessage).toBeCalledWith(runtime.bot, con, false);
      expect(toUnpinMessageMock).toBeCalledWith({ id: id });
    });

    it("should add a toUnpin function with correct values (isNot false)", () => {
      initExpectMatch().toUnPin(messageId);
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToUnpinMessage).toBeCalledWith(runtime.bot, con, false);
      expect(toUnpinMessageMock).toBeCalledWith(messageId);
    });

    it("should add a toUnpin function with correct values (isNot true)", () => {
      initExpectMatch().not.toUnPin(messageId);
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToUnpinMessage).toBeCalledWith(runtime.bot, con, true);
      expect(toUnpinMessageMock).toBeCalledWith(messageId);
    });
  });
});

function initExpectMatch() {
  return new ExpectMatchesWithNot(con);
}
