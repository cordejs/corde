import { testCollector } from "../../src/common/testColletor";
import { runtime } from "../../src/common/runtime";
import { ExpectMatchesWithNot } from "../../src/api";
import * as toReturnFn from "../../src/api/expectMatches/message/toReturn";
import * as toAddReactionFn from "../../src/api/expectMatches/message/toAddReaction";
import * as toRemoveReactionFn from "../../src/api/expectMatches/message/toRemoveReaction";
import * as toSetRoleColorFn from "../../src/api/expectMatches/role/toSetRoleColor";

let toReturnSpy: jest.SpyInstance;
let toAddReactionSpy: jest.SpyInstance;
let toRemoveReactionSpy: jest.SpyInstance;
let toSetRoleColorSpy: jest.SpyInstance;

describe("Testing describe function", () => {
  beforeEach(() => {
    testCollector.clearIsolatedTestFunctions();
    toReturnSpy = jest.spyOn(toReturnFn, "toReturn").mockReturnValue(null);
    toAddReactionSpy = jest.spyOn(toAddReactionFn, "toAddReaction").mockReturnValue(null);
    toRemoveReactionSpy = jest.spyOn(toRemoveReactionFn, "toRemoveReaction").mockReturnValue(null);
    toSetRoleColorSpy = jest.spyOn(toSetRoleColorFn, "toSetRoleColor").mockReturnValue(null);
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
      new ExpectMatchesWithNot("con").toReturn("expect");
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toReturnSpy).toBeCalled();
    });

    it("should add a toReturn function with correct values (isNot false)", () => {
      const expectName = "empty";
      const con = "test";
      new ExpectMatchesWithNot(con).toReturn(expectName);
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toReturnSpy).toBeCalledWith(con, false, runtime.bot, expectName);
    });

    it("should add a toReturn function with correct values (isNot true)", () => {
      const expectName = "empty";
      const con = "test";
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
      const con = "test";
      new ExpectMatchesWithNot(con).toAddReaction(expectReaction);
      runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toAddReactionSpy).toBeCalledWith(con, false, runtime.bot, [expectReaction]);
    });

    it("should add a toAddReaction function with correct values (isNot true)", () => {
      const expectReaction = "😀";
      const con = "test";
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
      const con = "test";
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
      const con = "test";
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
      const con = "test";
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
});
