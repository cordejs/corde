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
  ToUnPinMessage,
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

const toEditMessageActionMock = jest.fn();
const toSetRoleMentionableActionMock = jest.fn();
const toSetHoistActionMock = jest.fn();
const toReturnActionMock = jest.fn();
const toAddReactionActionMock = jest.fn();
const toRemoveReactionActionMock = jest.fn();
const toRenameRoleActionMock = jest.fn();
const toSetRoleColorActionMock = jest.fn();
const toDeleteRoleMock = jest.fn();
const toSetRolePositionActionMock = jest.fn();
const toSetRolePermissionActionMock = jest.fn();
const toPinMessageActionMock = jest.fn();
const toUnpinMessageActionMock = jest.fn();

const con = "test";

describe("Testing matches class", () => {
  beforeEach(() => {
    testCollector.clearIsolatedTestFunctions();

    toReturnSpy = ToReturn as jest.Mock;
    ToReturn.prototype.action = toReturnActionMock;

    toAddReactionSpy = ToAddReaction as jest.Mock;
    ToAddReaction.prototype.action = toAddReactionActionMock;

    toRemoveReactionSpy = ToRemoveReaction as jest.Mock;
    ToRemoveReaction.prototype.action = toRemoveReactionActionMock;

    toSetRoleColorSpy = ToSetRoleColor as jest.Mock;
    ToSetRoleColor.prototype.action = toSetRoleColorActionMock;

    toEditMessageSpy = ToEditMessage as jest.Mock;
    ToEditMessage.prototype.action = toEditMessageActionMock;

    toDeleteRoleSpy = ToDeleteRole as jest.Mock;
    ToDeleteRole.prototype.action = toDeleteRoleMock;

    toSetRoleMentionableSpy = ToSetRoleMentionable as jest.Mock;
    ToSetRoleMentionable.prototype.action = toSetRoleMentionableActionMock;

    toSetHoistSpy = ToSetRoleHoist as jest.Mock;
    ToSetRoleHoist.prototype.action = toSetHoistActionMock;

    toRenameRoleSpy = ToRenameRole as jest.Mock;
    ToRenameRole.prototype.action = toRenameRoleActionMock;

    toSetRolePositionSpy = ToSetRolePosition as jest.Mock;
    ToSetRolePosition.prototype.action = toSetRolePositionActionMock;

    toSetRolePermissionSpy = ToSetRolePermission as jest.Mock;
    ToSetRolePermission.prototype.action = toSetRolePermissionActionMock;

    toPinMessageSpy = ToPinMessage as jest.Mock;
    ToPinMessage.prototype.action = toPinMessageActionMock;

    toUnpinMessageSpy = ToUnPinMessage as jest.Mock;
    ToUnPinMessage.prototype.action = toUnpinMessageActionMock;
  });

  afterEach(() => {
    toSetRoleMentionableSpy.mockClear();
    toSetRolePermissionSpy.mockClear();
    toPinMessageSpy.mockClear();
    toEditMessageSpy.mockClear();
    toReturnSpy.mockClear();
    toAddReactionSpy.mockClear();
    toRemoveReactionSpy.mockClear();
    toSetRoleColorSpy.mockClear();
    toDeleteRoleSpy.mockClear();
    toSetHoistSpy.mockClear();
    toRenameRoleSpy.mockClear();
    toSetRolePositionSpy.mockClear();
    toUnpinMessageSpy.mockClear();

    toEditMessageActionMock.mockClear();
    toSetRoleMentionableActionMock.mockClear();
    toSetHoistActionMock.mockClear();
    toReturnActionMock.mockClear();
    toAddReactionActionMock.mockClear();
    toRemoveReactionActionMock.mockClear();
    toRenameRoleActionMock.mockClear();
    toSetRoleColorActionMock.mockClear();
    toDeleteRoleMock.mockClear();
    toSetRolePositionActionMock.mockClear();
    toSetRolePermissionActionMock.mockClear();
    toPinMessageActionMock.mockClear();
    toSetRolePositionActionMock.mockClear();
    toSetRolePositionActionMock.mockClear();
    toSetRolePositionActionMock.mockClear();
  });

  it("should not return a function", async () => {
    const matches = new ExpectMatchesWithNot("name");
    expect(matches.not).not.toBe(undefined);
  });

  describe("testing toReturn function", () => {
    it("should add a function to hasIsolatedTestFunctions after call toReturn", async () => {
      new ExpectMatchesWithNot("test").toReturn("empty");
      expect(testCollector.hasIsolatedTestFunctions()).toBe(true);
    });

    it("should add a toReturn function", async () => {
      initExpectMatch().toReturn("expect");
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toReturnActionMock).toBeCalled();
    });

    it("should add a toReturn function with correct values (isNot false)", async () => {
      const expectName = "empty";
      initExpectMatch().toReturn(expectName);
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToReturn).toBeCalledWith(runtime.bot, con, false);
      expect(toReturnActionMock).toBeCalledWith(expectName);
    });

    it("should add a toReturn function with correct values (isNot true)", async () => {
      const expectName = "empty";
      initExpectMatch().not.toReturn(expectName);
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToReturn).toBeCalledWith(runtime.bot, con, true);
      expect(toReturnActionMock).toBeCalledWith(expectName);
    });
  });

  describe("testing toAddReaction function", () => {
    it("should add a function to hasIsolatedTestFunctions after call toAddReaction", async () => {
      initExpectMatch().toAddReaction(["😀"]);
      expect(testCollector.hasIsolatedTestFunctions()).toBe(true);
    });

    it("should add a toAddReaction function", async () => {
      initExpectMatch().toAddReaction(["😀"]);
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toAddReactionActionMock).toBeCalled();
    });

    it("should add a toAddReaction function with correct values (isNot false)", async () => {
      const expectReaction = ["😀"];
      initExpectMatch().toAddReaction(expectReaction);
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToAddReaction).toBeCalledWith(runtime.bot, con, false);
      expect(toAddReactionActionMock).toBeCalledWith(expectReaction, undefined);
    });

    it("should add a toAddReaction function with correct values (isNot true)", async () => {
      const expectReaction = ["😀"];
      initExpectMatch().not.toAddReaction(expectReaction);
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToAddReaction).toBeCalledWith(runtime.bot, con, true);
      expect(toAddReactionActionMock).toBeCalledWith(expectReaction, undefined);
    });
  });

  describe("testing toRemoveReaction function", () => {
    it("should add a function to hasIsolatedTestFunctions after call toRemoveReaction", async () => {
      new ExpectMatchesWithNot("test").toRemoveReaction(["😀"]);
      expect(testCollector.hasIsolatedTestFunctions()).toBe(true);
    });

    it("should add a toRemoveReaction function", async () => {
      new ExpectMatchesWithNot("con").toRemoveReaction(["😀"]);
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toRemoveReactionActionMock).toBeCalled();
    });

    it("should add a toRemoveReaction function with message data", async () => {
      const expectReaction = ["😀"];
      const messageIdentifier = { id: "12312312" };
      initExpectMatch().toRemoveReaction(expectReaction, messageIdentifier);
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToRemoveReaction).toBeCalledWith(runtime.bot, con, false);
      expect(toRemoveReactionActionMock).toBeCalledWith(expectReaction, messageIdentifier);
    });

    it("should add a toRemoveReaction function with array of emojis", async () => {
      const expectReaction = ["😀"];
      const messageIdentifier = { id: "12312312" };
      initExpectMatch().toRemoveReaction(expectReaction, messageIdentifier);
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToRemoveReaction).toBeCalledWith(runtime.bot, con, false);
      expect(toRemoveReactionActionMock).toBeCalledWith(expectReaction, messageIdentifier);
    });

    it("should add a toRemoveReaction function with correct values (isNot true)", async () => {
      const expectReaction = ["😀"];
      initExpectMatch().not.toRemoveReaction(expectReaction);
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToRemoveReaction).toBeCalledWith(runtime.bot, con, true);
      expect(toRemoveReactionActionMock).toBeCalledWith(expectReaction, undefined);
    });
  });

  describe("testing toSetRoleColor function", () => {
    const color = Colors.DARK_AQUA;
    const roleId = {
      id: "123",
    };

    it("should add a function to hasIsolatedTestFunctions after call toSetRoleColor", async () => {
      new ExpectMatchesWithNot("test").toSetRoleColor(color, "123");
      expect(testCollector.hasIsolatedTestFunctions()).toBe(true);
    });

    it("should add a toSetRoleColor function", async () => {
      new ExpectMatchesWithNot("con").toSetRoleColor(color, "123");
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toSetRoleColorSpy).toBeCalled();
    });

    it("should add a toSetRoleColor function with correct values (isNot false)", async () => {
      initExpectMatch().toSetRoleColor(color, "123");
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToSetRoleColor).toBeCalledWith(runtime.bot, con, false);
      expect(toSetRoleColorActionMock).toBeCalledWith(color, roleId.id);
    });

    it("should add a toSetRoleColor function with message data", async () => {
      initExpectMatch().toSetRoleColor(Colors.DARK_AQUA, "123");
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToSetRoleColor).toBeCalledWith(runtime.bot, con, false);
      expect(toSetRoleColorActionMock).toBeCalledWith(color, "123");
    });

    it("should add a toSetRoleColor function with correct values (isNot true)", async () => {
      initExpectMatch().not.toSetRoleColor(color, "123");
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToSetRoleColor).toBeCalledWith(runtime.bot, con, true);
      expect(toSetRoleColorActionMock).toBeCalledWith(color, roleId.id);
    });
  });

  describe("testing toDeleteRole function", () => {
    const roleId = {
      id: "123",
    };

    it("should add a function to hasIsolatedTestFunctions after call toDeleteRole", async () => {
      new ExpectMatchesWithNot("test").toDeleteRole("123");
      expect(testCollector.hasIsolatedTestFunctions()).toBe(true);
    });

    it("should add a toDeleteRole function", async () => {
      new ExpectMatchesWithNot("con").toDeleteRole("123");
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toDeleteRoleSpy).toBeCalled();
    });

    it("should add a toDeleteRole function with correct values (isNot false)", async () => {
      initExpectMatch().toDeleteRole("123");
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToDeleteRole).toBeCalledWith(runtime.bot, con, false);
      expect(toDeleteRoleMock).toBeCalledWith(roleId.id);
    });

    it("should add a toDeleteRole function with id", async () => {
      initExpectMatch().toDeleteRole("123");
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToDeleteRole).toBeCalledWith(runtime.bot, con, false);
      expect(toDeleteRoleMock).toBeCalledWith(roleId.id);
    });

    it("should add a toDeleteRole function with id in data object", async () => {
      initExpectMatch().toDeleteRole(roleId);
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToDeleteRole).toBeCalledWith(runtime.bot, con, false);
      expect(toDeleteRoleMock).toBeCalledWith(roleId);
    });

    it("should add a toDeleteRole function with name in data object", async () => {
      initExpectMatch().toDeleteRole({ name: "test" });
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToDeleteRole).toBeCalledWith(runtime.bot, con, false);
      expect(toDeleteRoleMock).toBeCalledWith({ name: "test" });
    });

    it("should add a toDeleteRole function with correct values (isNot true)", async () => {
      initExpectMatch().not.toDeleteRole("123");
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToDeleteRole).toBeCalledWith(runtime.bot, con, true);
      expect(toDeleteRoleMock).toBeCalledWith(roleId.id);
    });
  });

  describe("testing toSetRoleMentionable function", () => {
    const roleId = {
      id: "123",
    };
    const mentionableTrue = true;

    it("should add a function to hasIsolatedTestFunctions after call toSetRoleMentionable", async () => {
      new ExpectMatchesWithNot("test").toSetRoleMentionable(true, roleId.id);
      expect(testCollector.hasIsolatedTestFunctions()).toBe(true);
    });

    it("should add a toSetRoleMentionable function", async () => {
      new ExpectMatchesWithNot("con").toSetRoleMentionable(true, roleId.id);
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toSetRoleMentionableSpy).toBeCalled();
    });

    it("should add a toSetRoleMentionable function with correct values (isNot false)", async () => {
      initExpectMatch().toSetRoleMentionable(mentionableTrue, roleId.id);
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToSetRoleMentionable).toBeCalledWith(runtime.bot, con, false);
      expect(toSetRoleMentionableActionMock).toBeCalledWith(mentionableTrue, roleId.id);
    });

    it("should add a toSetRoleMentionable function with correct values (isNot true)", async () => {
      initExpectMatch().not.toSetRoleMentionable(mentionableTrue, roleId.id);
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToSetRoleMentionable).toBeCalledWith(runtime.bot, con, true);
      expect(toSetRoleMentionableActionMock).toBeCalledWith(mentionableTrue, roleId.id);
    });
  });

  describe("testing toSetRoleHoist function", () => {
    const roleId = {
      id: "123",
    };
    const mentionableTrue = true;
    it("should add a function to hasIsolatedTestFunctions after call toSetRoleHoist", async () => {
      new ExpectMatchesWithNot("test").toSetRoleHoist(mentionableTrue, roleId);
      expect(testCollector.hasIsolatedTestFunctions()).toBe(true);
    });

    it("should add a toSetRoleHoist function", async () => {
      new ExpectMatchesWithNot("con").toSetRoleHoist(mentionableTrue, roleId);
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toSetHoistSpy).toBeCalled();
    });

    it("should add a toSetRoleHoist function with correct values using id", async () => {
      initExpectMatch().toSetRoleHoist(mentionableTrue, "123");
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToSetRoleHoist).toBeCalledWith(runtime.bot, con, false);
      expect(toSetHoistActionMock).toBeCalledWith(true, roleId.id);
    });

    it("should add a toSetRoleHoist function with correct values (isNot false)", async () => {
      initExpectMatch().toSetRoleHoist(mentionableTrue, roleId);
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToSetRoleHoist).toBeCalledWith(runtime.bot, con, false);
      expect(toSetHoistActionMock).toBeCalledWith(true, roleId);
    });

    it("should add a toSetRoleHoist function with correct values (isNot true)", async () => {
      initExpectMatch().not.toSetRoleHoist(mentionableTrue, roleId);
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToSetRoleHoist).toBeCalledWith(runtime.bot, con, true);
      expect(toSetHoistActionMock).toBeCalledWith(mentionableTrue, roleId);
    });
  });

  describe("testing toRenameRole function", () => {
    const roleId = {
      id: "123",
    };

    it("should add a function to hasIsolatedTestFunctions after call toRenameRole", async () => {
      initExpectMatch().toRenameRole("newName", roleId);
      expect(testCollector.hasIsolatedTestFunctions()).toBe(true);
    });

    it("should add a toRenameRole function", async () => {
      initExpectMatch().toRenameRole("newName", roleId);
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toRenameRoleActionMock).toBeCalled();
    });

    it("should add a toRenameRole function with correct values using id", async () => {
      initExpectMatch().toRenameRole("newName", "123");
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToRenameRole).toBeCalledWith(runtime.bot, con, false);
      expect(toRenameRoleActionMock).toBeCalledWith("newName", "123");
    });

    it("should add a toRenameRole function with correct values (isNot false)", async () => {
      initExpectMatch().toRenameRole("newName", roleId);
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToRenameRole).toBeCalledWith(runtime.bot, con, false);
      expect(toRenameRoleActionMock).toBeCalledWith("newName", roleId);
    });

    it("should add a toRenameRole function with correct values (isNot true)", async () => {
      initExpectMatch().not.toRenameRole("newName", roleId);
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToRenameRole).toBeCalledWith(runtime.bot, con, true);
      expect(toRenameRoleActionMock).toBeCalledWith("newName", roleId);
    });
  });

  describe("testing toSetRolePosition function", () => {
    const roleId = {
      id: "123",
    };

    const newPosition = 1;
    it("should add a function to hasIsolatedTestFunctions after call toSetRolePosition", async () => {
      initExpectMatch().toSetRolePosition(newPosition, roleId);
      expect(testCollector.hasIsolatedTestFunctions()).toBe(true);
    });

    it("should add a toSetRolePosition function", async () => {
      initExpectMatch().toSetRolePosition(newPosition, roleId);
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toSetRolePositionSpy).toBeCalled();
    });

    it("should add a toSetRolePosition function with correct values using id", async () => {
      initExpectMatch().toSetRolePosition(newPosition, roleId);
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToSetRolePosition).toBeCalledWith(runtime.bot, con, false);
      expect(toSetRolePositionActionMock).toBeCalledWith(newPosition, roleId);
    });

    it("should add a toSetRolePosition function with correct values (isNot false)", async () => {
      initExpectMatch().toSetRolePosition(newPosition, roleId);
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToSetRolePosition).toBeCalledWith(runtime.bot, con, false);
      expect(toSetRolePositionActionMock).toBeCalledWith(newPosition, roleId);
    });

    it("should add a toSetRolePosition function with correct values (isNot true)", async () => {
      initExpectMatch().not.toSetRolePosition(newPosition, roleId);
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
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

    it("should add a function to hasIsolatedTestFunctions after call toSetRolePermission", async () => {
      toSetRolePermission();
      expect(testCollector.hasIsolatedTestFunctions()).toBe(true);
    });

    it("should add a toSetRolePermission function", async () => {
      toSetRolePermission();
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toSetRolePermissionActionMock).toBeCalled();
    });

    it("should add a toSetRolePermission function with correct values using id", async () => {
      toSetRolePermission();
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToSetRolePermission).toBeCalledWith(runtime.bot, con, false);
      expect(toSetRolePermissionActionMock).toBeCalledWith(roleId, ["ADMINISTRATOR"]);
    });

    it("should add a toSetRolePermission function with correct values (isNot false)", async () => {
      toSetRolePermission();
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToSetRolePermission).toBeCalledWith(runtime.bot, con, false);
      expect(toSetRolePermissionActionMock).toBeCalledWith(roleId, ["ADMINISTRATOR"]);
    });

    it("should add a toSetRolePermission function with correct values (isNot true)", async () => {
      initExpectMatch().not.toSetRolePermission(roleId, "ADMINISTRATOR");
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToSetRolePermission).toBeCalledWith(runtime.bot, con, true);
      expect(toSetRolePermissionActionMock).toBeCalledWith(roleId, ["ADMINISTRATOR"]);
    });
  });

  describe("testing to pinMessage", () => {
    const messageId = {
      id: "123",
    };

    it("should add a function to hasIsolatedTestFunctions after call toPin", async () => {
      initExpectMatch().toPin(messageId);
      expect(testCollector.hasIsolatedTestFunctions()).toBe(true);
    });

    it("should add a toPin function", async () => {
      initExpectMatch().toPin(messageId);
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toPinMessageActionMock).toBeCalled();
    });

    it("should add a toPin function with correct values using id", async () => {
      initExpectMatch().toPin(messageId);
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToPinMessage).toBeCalledWith(runtime.bot, con, false);
      expect(toPinMessageActionMock).toBeCalledWith(messageId);
    });

    it("should add a toPin function with correct values using string id", async () => {
      const id = "1323";
      initExpectMatch().toPin(id);
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToPinMessage).toBeCalledWith(runtime.bot, con, false);
      expect(toPinMessageActionMock).toBeCalledWith(id);
    });

    it("should add a toPin function with correct values (isNot false)", async () => {
      initExpectMatch().toPin(messageId);
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToPinMessage).toBeCalledWith(runtime.bot, con, false);
      expect(toPinMessageActionMock).toBeCalledWith(messageId);
    });

    it("should add a toPin function with correct values (isNot true)", async () => {
      initExpectMatch().not.toPin(messageId);
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToPinMessage).toBeCalledWith(runtime.bot, con, true);
      expect(toPinMessageActionMock).toBeCalledWith(messageId);
    });
  });

  describe("testing to unPinMessage", () => {
    const messageId = {
      id: "123",
    };

    it("should add a function to hasIsolatedTestFunctions after call toUnpin", async () => {
      initExpectMatch().toUnPin(messageId);
      expect(testCollector.hasIsolatedTestFunctions()).toBe(true);
    });

    it("should add a toUnpin function", async () => {
      initExpectMatch().toUnPin(messageId);
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toUnpinMessageActionMock).toBeCalled();
    });

    it("should add a toUnpin function with correct values using id", async () => {
      initExpectMatch().toUnPin(messageId);
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToUnPinMessage).toBeCalledWith(runtime.bot, con, false);
      expect(toUnpinMessageActionMock).toBeCalledWith(messageId);
    });

    it("should add a toUnpin function with correct values using string id", async () => {
      const id = "123121";
      initExpectMatch().toUnPin(id);
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToUnPinMessage).toBeCalledWith(runtime.bot, con, false);
      expect(toUnpinMessageActionMock).toBeCalledWith(id);
    });

    it("should add a toUnpin function with correct values (isNot false)", async () => {
      initExpectMatch().toUnPin(messageId);
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToUnPinMessage).toBeCalledWith(runtime.bot, con, false);
      expect(toUnpinMessageActionMock).toBeCalledWith(messageId);
    });

    it("should add a toUnpin function with correct values (isNot true)", async () => {
      initExpectMatch().not.toUnPin(messageId);
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToUnPinMessage).toBeCalledWith(runtime.bot, con, true);
      expect(toUnpinMessageActionMock).toBeCalledWith(messageId);
    });
  });
});

function initExpectMatch() {
  return new ExpectMatchesWithNot(con);
}
