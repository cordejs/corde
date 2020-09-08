import { testCollector } from "../../src/common/testColletor";
import { runtime } from "../../src/common/runtime";
import { ExpectMatchesWithNot } from "../../src/api";
import * as toReturnFn from "../../src/api/expectMatches/message/toReturn";
import * as toAddReactionFn from "../../src/api/expectMatches/message/toAddReaction";
import * as toRemoveReactionFn from "../../src/api/expectMatches/message/toRemoveReaction";
import * as toSetRoleColorFn from "../../src/api/expectMatches/role/toSetRoleColor";
import * as toDeleteRoleFn from "../../src/api/expectMatches/role/toDeleteRole";
import { Colors } from "../../src/utils/colors";
import ToSetRoleMentionable from "../../src/api/expectMatches/role/toSetRoleMentionable";

jest.mock("../../src/api/expectMatches/role/toSetRoleMentionable");

let toReturnSpy: jest.SpyInstance;
let toAddReactionSpy: jest.SpyInstance;
let toRemoveReactionSpy: jest.SpyInstance;
let toSetRoleColorSpy: jest.SpyInstance;
let toDeleteRoleSpy: jest.SpyInstance;
let toSetRoleMentionableSpy: jest.SpyInstance<any, any>;
const actionMock = jest.fn();
const con = "test";

describe("Testing describe function", () => {
  beforeEach(() => {
    testCollector.clearIsolatedTestFunctions();
    toReturnSpy = jest.spyOn(toReturnFn, "toReturn").mockReturnValue(null);
    toAddReactionSpy = jest.spyOn(toAddReactionFn, "toAddReaction").mockReturnValue(null);
    toRemoveReactionSpy = jest.spyOn(toRemoveReactionFn, "toRemoveReaction").mockReturnValue(null);
    toSetRoleColorSpy = jest.spyOn(toSetRoleColorFn, "toSetRoleColor").mockReturnValue(null);
    toDeleteRoleSpy = jest.spyOn(toDeleteRoleFn, "toDeleteRole").mockReturnValue(null);

    toSetRoleMentionableSpy = (ToSetRoleMentionable as jest.Mock).mockImplementation(() => {
      return {
        action: actionMock,
      };
    });
  });

  afterEach(() => {
    toSetRoleMentionableSpy.mockClear();
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
      expect(toReturnSpy).toBeCalledWith(con, false, runtime.bot, expectName);
    });

    it("should add a toReturn function with correct values (isNot true)", () => {
      const expectName = "empty";
      new ExpectMatchesWithNot(con).not.toReturn(expectName);
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toReturnSpy).toBeCalledWith(con, true, runtime.bot, expectName);
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
      expect(toAddReactionSpy).toBeCalledWith(con, false, runtime.bot, [expectReaction]);
    });

    it("should add a toAddReaction function with correct values (isNot true)", () => {
      const expectReaction = "😀";
      new ExpectMatchesWithNot(con).not.toAddReaction(expectReaction);
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toAddReactionSpy).toBeCalledWith(con, true, runtime.bot, [expectReaction]);
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

    it("should add a toRemoveReaction function with correct values (isNot false)", () => {
      const expectReaction = "😀";
      new ExpectMatchesWithNot(con).toRemoveReaction(expectReaction);
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toRemoveReactionSpy).toBeCalledWith(
        con,
        false,
        runtime.bot,
        [expectReaction],
        undefined,
      );
    });

    it("should add a toRemoveReaction function with message data", () => {
      const expectReaction = "😀";
      const messageData = { id: "12312312" };
      new ExpectMatchesWithNot(con).toRemoveReaction(expectReaction, messageData);
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toRemoveReactionSpy).toBeCalledWith(
        con,
        false,
        runtime.bot,
        [expectReaction],
        messageData,
      );
    });

    it("should add a toRemoveReaction function with correct values (isNot true)", () => {
      const expectReaction = "😀";
      new ExpectMatchesWithNot(con).not.toRemoveReaction(expectReaction);
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toRemoveReactionSpy).toBeCalledWith(
        con,
        true,
        runtime.bot,
        [expectReaction],
        undefined,
      );
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

    it("should add a toRemoveReaction function", () => {
      new ExpectMatchesWithNot("con").toSetRoleColor(color, "123");
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toSetRoleColorSpy).toBeCalled();
    });

    it("should add a toRemoveReaction function with correct values (isNot false)", () => {
      new ExpectMatchesWithNot(con).toSetRoleColor(color, "123");
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toSetRoleColorSpy).toBeCalledWith(con, false, runtime.bot, color, roleId);
    });

    it("should add a toRemoveReaction function with message data", () => {
      new ExpectMatchesWithNot(con).toSetRoleColor(Colors.DARK_AQUA, "123");
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toSetRoleColorSpy).toBeCalledWith(con, false, runtime.bot, color, roleId);
    });

    it("should add a toRemoveReaction function with correct values (isNot true)", () => {
      new ExpectMatchesWithNot(con).not.toSetRoleColor(color, "123");
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toSetRoleColorSpy).toBeCalledWith(con, true, runtime.bot, color, roleId);
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
      expect(toDeleteRoleSpy).toBeCalledWith(con, false, runtime.bot, roleId);
    });

    it("should add a toDeleteRole function with id", () => {
      new ExpectMatchesWithNot(con).toDeleteRole("123");
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toDeleteRoleSpy).toBeCalledWith(con, false, runtime.bot, roleId);
    });

    it("should add a toDeleteRole function with id in data object", () => {
      new ExpectMatchesWithNot(con).toDeleteRole(roleId);
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toDeleteRoleSpy).toBeCalledWith(con, false, runtime.bot, roleId);
    });

    it("should add a toDeleteRole function with name in data object", () => {
      new ExpectMatchesWithNot(con).toDeleteRole({ name: "test" });
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toDeleteRoleSpy).toBeCalledWith(con, false, runtime.bot, { name: "test" });
    });

    it("should add a toDeleteRole function with correct values (isNot true)", () => {
      new ExpectMatchesWithNot(con).not.toDeleteRole("123");
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toDeleteRoleSpy).toBeCalledWith(con, true, runtime.bot, roleId);
    });
  });

  describe("testing toSetRoleMentionable function", () => {
    const color = Colors.DARK_AQUA;
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
      expect(actionMock).toBeCalledWith(mentionableTrue, roleId, undefined);
    });

    it("should add a toSetRoleMentionable function with correct values (isNot true)", () => {
      new ExpectMatchesWithNot(con).not.toSetRoleMentionable(mentionableTrue, roleId);
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(ToSetRoleMentionable).toBeCalledWith(runtime.bot, con, true);
      expect(actionMock).toBeCalledWith(mentionableTrue, roleId, undefined);
    });
  });
});
