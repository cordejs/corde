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
import { AllExpectMatches, ExpectMatches } from "../../src/expect/matcher";
import { TestReport } from "../../src/types";
import { ExpectTest } from "../../src/expect/matches/expectTest";
import { ExpectTestBaseParams, ExpectTestParams } from "../../src/expect/types";
import { buildReportMessage } from "../../src/utils";
import { TodoInCascade } from "../../src/expect/matches/todoInCascade";
import { expect as _expect } from "../../src/expect/expect";

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

jest.mock("../../src/expect/matches/todoInCascade.ts");

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
let todoInCascadeSpy: jest.SpyInstance<any, any>;

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
const todoInCascadeActionMock = jest.fn();

const con = "test";

async function createToBeCalledTestFor(actionMock: jest.Mock<any, any>) {
  await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
  expect(actionMock).toBeCalled();
}

async function createDefaultTestFor<T extends ExpectTest>(
  testClass: new (params: ExpectTestParams) => T,
  testClassActionMock: jest.Mock<any, any>,
  isNot: boolean,
  ...callForActionMock: Parameters<T["action"]>
) {
  await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
  const params: ExpectTestBaseParams = {
    command: con,
    cordeBot: runtime.bot,
    isNot: isNot,
    timeout: runtime.timeOut,
    isCascade: false,
  };
  expect(testClass).toBeCalledWith(params);
  expect(testClassActionMock).toBeCalledWith(...callForActionMock);
}

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

    todoInCascadeSpy = TodoInCascade as jest.Mock;
    TodoInCascade.prototype.action = todoInCascadeActionMock;
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
    const matches = initExpectMatch("name");
    expect(matches.not).not.toBe(undefined);
  });

  it("toString should return the name of ExpectMatches", () => {
    expect(new ExpectMatches({} as any).toString()).toEqual("ExpectMatches");
  });

  it("toString should return the name of AllExpectMatches", () => {
    expect(new AllExpectMatches({} as any).toString()).toEqual("AllExpectMatches");
  });

  describe("testing operationFactory", () => {
    it("should return failed test due to null command name", async () => {
      initExpectMatch("").toReturn("");
      const report = await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(report).toEqual<TestReport>({
        pass: false,
        testName: undefined,
        message: buildReportMessage("command can not be null or an empty string"),
      });
    });

    it("should return passed test without trace", async () => {
      initExpectMatch().toReturn("");
      ToReturn.prototype.action = jest.fn().mockReturnValue(Promise.resolve({ pass: true }));
      const report = await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(report.pass).toEqual(true);
      expect(report.trace).toBeFalsy();
    });

    it("should return failed test with trace", async () => {
      initExpectMatch().toReturn("");
      ToReturn.prototype.action = jest.fn().mockReturnValue(Promise.resolve({ pass: false }));
      const report = await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(report.pass).toEqual(false);
      expect(report.trace).toBeTruthy();
    });
  });

  describe("testing toReturn function", () => {
    it("should add a function to hasIsolatedTestFunctions after call toReturn", async () => {
      initExpectMatch().toReturn("empty");
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
      await createDefaultTestFor(ToReturn, toReturnActionMock, false, expectName);
    });

    it("should add a toReturn function with correct values (isNot true)", async () => {
      const expectName = "empty";
      initExpectMatch().not.toReturn(expectName);
      await createDefaultTestFor(ToReturn, toReturnActionMock, true, expectName);
    });
  });

  describe("testing toEditMessage function", () => {
    it("should add a function to hasIsolatedTestFunctions after call toReturn", async () => {
      initExpectMatch().toEditMessage("empty", { id: "123" });
      expect(testCollector.hasIsolatedTestFunctions()).toBe(true);
    });

    it("should add a toEditMessage function", async () => {
      initExpectMatch().toEditMessage("empty", { id: "123" });
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toEditMessageActionMock).toBeCalled();
    });

    it("should add a toEditMessage function with correct values (isNot false)", async () => {
      initExpectMatch().toEditMessage("empty", { id: "123" });
      await createDefaultTestFor(ToEditMessage, toEditMessageActionMock, false, "empty", {
        id: "123",
      });
    });

    it("should add a toEditMessage function with correct values (isNot true)", async () => {
      initExpectMatch().not.toEditMessage("empty", { id: "123" });
      await createDefaultTestFor(ToEditMessage, toEditMessageActionMock, true, "empty", {
        id: "123",
      });
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
      await createDefaultTestFor(
        ToAddReaction,
        toAddReactionActionMock,
        false,
        expectReaction,
        undefined,
      );
    });

    it("should add a toAddReaction function with correct values (isNot true)", async () => {
      const expectReaction = ["😀"];
      initExpectMatch().not.toAddReaction(expectReaction);
      await createDefaultTestFor(
        ToAddReaction,
        toAddReactionActionMock,
        true,
        expectReaction,
        undefined,
      );
    });
  });

  describe("testing toRemoveReaction function", () => {
    it("should add a function to hasIsolatedTestFunctions after call toRemoveReaction", async () => {
      initExpectMatch().toRemoveReaction(["😀"]);
      expect(testCollector.hasIsolatedTestFunctions()).toBe(true);
    });

    it("should add a toRemoveReaction function", async () => {
      initExpectMatch().toRemoveReaction(["😀"]);
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toRemoveReactionActionMock).toBeCalled();
    });

    it("should add a toRemoveReaction function with message data", async () => {
      const expectReaction = ["😀"];
      const messageIdentifier = { id: "12312312" };
      initExpectMatch().toRemoveReaction(expectReaction, messageIdentifier);
      await createDefaultTestFor(
        ToRemoveReaction,
        toRemoveReactionActionMock,
        false,
        expectReaction,
        messageIdentifier,
      );
    });

    it("should add a toRemoveReaction function with array of emojis", async () => {
      const expectReaction = ["😀"];
      const messageIdentifier = { id: "12312312" };
      initExpectMatch().toRemoveReaction(expectReaction, messageIdentifier);
      await createDefaultTestFor(
        ToRemoveReaction,
        toRemoveReactionActionMock,
        false,
        expectReaction,
        messageIdentifier,
      );
    });

    it("should add a toRemoveReaction function with correct values (isNot true)", async () => {
      const expectReaction = ["😀"];
      initExpectMatch().not.toRemoveReaction(expectReaction);
      await createDefaultTestFor(
        ToRemoveReaction,
        toRemoveReactionActionMock,
        true,
        expectReaction,
        undefined,
      );
    });
  });

  describe("testing toSetRoleColor function", () => {
    const color = Colors.DARK_AQUA;
    const roleId = {
      id: "123",
    };

    it("should add a function to hasIsolatedTestFunctions after call toSetRoleColor", async () => {
      initExpectMatch().toSetRoleColor(color, "123");
      expect(testCollector.hasIsolatedTestFunctions()).toBe(true);
    });

    it("should add a toSetRoleColor function", async () => {
      initExpectMatch().toSetRoleColor(color, "123");
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toSetRoleColorSpy).toBeCalled();
    });

    it("should add a toSetRoleColor function with correct values (isNot false)", async () => {
      initExpectMatch().toSetRoleColor(color, "123");
      await createDefaultTestFor(ToSetRoleColor, toSetRoleColorActionMock, false, color, "123");
    });

    it("should add a toSetRoleColor function with message data", async () => {
      initExpectMatch().toSetRoleColor(Colors.DARK_AQUA, "123");
      await createDefaultTestFor(ToSetRoleColor, toSetRoleColorActionMock, false, color, "123");
    });

    it("should add a toSetRoleColor function with correct values (isNot true)", async () => {
      initExpectMatch().not.toSetRoleColor(color, "123");
      await createDefaultTestFor(ToSetRoleColor, toSetRoleColorActionMock, true, color, "123");
    });
  });

  describe("testing toDeleteRole function", () => {
    const roleId = {
      id: "123",
    };

    it("should add a function to hasIsolatedTestFunctions after call toDeleteRole", async () => {
      initExpectMatch().toDeleteRole("123");
      expect(testCollector.hasIsolatedTestFunctions()).toBe(true);
    });

    it("should add a toDeleteRole function", async () => {
      initExpectMatch().toDeleteRole("123");
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toDeleteRoleSpy).toBeCalled();
    });

    it("should add a toDeleteRole function with correct values (isNot false)", async () => {
      initExpectMatch().toDeleteRole("123");
      await createDefaultTestFor(ToDeleteRole, toDeleteRoleMock, false, "123");
    });

    it("should add a toDeleteRole function with id", async () => {
      initExpectMatch().toDeleteRole("123");
      await createDefaultTestFor(ToDeleteRole, toDeleteRoleMock, false, "123");
    });

    it("should add a toDeleteRole function with id in data object", async () => {
      initExpectMatch().toDeleteRole(roleId);
      await createDefaultTestFor(ToDeleteRole, toDeleteRoleMock, false, roleId);
    });

    it("should add a toDeleteRole function with name in data object", async () => {
      initExpectMatch().toDeleteRole({ name: "test" });
      await createDefaultTestFor(ToDeleteRole, toDeleteRoleMock, false, { name: "test" });
    });

    it("should add a toDeleteRole function with correct values (isNot true)", async () => {
      initExpectMatch().not.toDeleteRole("123");
      await createDefaultTestFor(ToDeleteRole, toDeleteRoleMock, true, roleId.id);
    });
  });

  describe("testing toSetRoleMentionable function", () => {
    const roleId = {
      id: "123",
    };
    const mentionableTrue = true;

    it("should add a function to hasIsolatedTestFunctions after call toSetRoleMentionable", async () => {
      initExpectMatch().toSetRoleMentionable(true, roleId.id);
      expect(testCollector.hasIsolatedTestFunctions()).toBe(true);
    });

    it("should add a toSetRoleMentionable function", async () => {
      initExpectMatch().toSetRoleMentionable(true, roleId.id);
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toSetRoleMentionableSpy).toBeCalled();
    });

    it("should add a toSetRoleMentionable function with correct values (isNot false)", async () => {
      initExpectMatch().toSetRoleMentionable(mentionableTrue, roleId.id);
      await createDefaultTestFor(
        ToSetRoleMentionable,
        toSetRoleMentionableActionMock,
        false,
        mentionableTrue,
        roleId.id,
      );
    });

    it("should add a toSetRoleMentionable function with correct values (isNot true)", async () => {
      initExpectMatch().not.toSetRoleMentionable(mentionableTrue, roleId.id);
      await createDefaultTestFor(
        ToSetRoleMentionable,
        toSetRoleMentionableActionMock,
        true,
        mentionableTrue,
        roleId.id,
      );
    });
  });

  describe("testing toSetRoleHoist function", () => {
    const roleId = {
      id: "123",
    };
    const mentionableTrue = true;
    it("should add a function to hasIsolatedTestFunctions after call toSetRoleHoist", async () => {
      initExpectMatch().toSetRoleHoist(mentionableTrue, roleId);
      expect(testCollector.hasIsolatedTestFunctions()).toBe(true);
    });

    it("should add a toSetRoleHoist function", async () => {
      initExpectMatch().toSetRoleHoist(mentionableTrue, roleId);
      await runtime.injectBot(testCollector.cloneIsolatedTestFunctions()[0]);
      expect(toSetHoistSpy).toBeCalled();
    });

    it("should add a toSetRoleHoist function with correct values using id", async () => {
      initExpectMatch().toSetRoleHoist(mentionableTrue, "123");
      await createDefaultTestFor(
        ToSetRoleHoist,
        toSetHoistActionMock,
        false,
        mentionableTrue,
        roleId.id,
      );
    });

    it("should add a toSetRoleHoist function with correct values (isNot false)", async () => {
      initExpectMatch().toSetRoleHoist(mentionableTrue, roleId);
      await createDefaultTestFor(
        ToSetRoleHoist,
        toSetHoistActionMock,
        false,
        mentionableTrue,
        roleId,
      );
    });

    it("should add a toSetRoleHoist function with correct values (isNot true)", async () => {
      initExpectMatch().not.toSetRoleHoist(mentionableTrue, roleId);
      await createDefaultTestFor(
        ToSetRoleHoist,
        toSetHoistActionMock,
        true,
        mentionableTrue,
        roleId,
      );
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
      const newName = "newName";
      const id = "123";
      initExpectMatch().toRenameRole(newName, id);
      await createDefaultTestFor(ToRenameRole, toRenameRoleActionMock, false, newName, id);
    });

    it("should add a toRenameRole function with correct values (isNot false)", async () => {
      const newName = "newName";
      const id = roleId;
      initExpectMatch().toRenameRole(newName, id);
      await createDefaultTestFor(ToRenameRole, toRenameRoleActionMock, false, newName, id);
    });

    it("should add a toRenameRole function with correct values (isNot true)", async () => {
      const newName = "newName";
      const id = roleId;
      initExpectMatch().not.toRenameRole(newName, id);
      await createDefaultTestFor(ToRenameRole, toRenameRoleActionMock, true, newName, id);
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
      await createDefaultTestFor(
        ToSetRolePosition,
        toSetRolePositionActionMock,
        false,
        newPosition,
        roleId,
      );
    });

    it("should add a toSetRolePosition function with correct values (isNot false)", async () => {
      initExpectMatch().toSetRolePosition(newPosition, roleId);
      await createDefaultTestFor(
        ToSetRolePosition,
        toSetRolePositionActionMock,
        false,
        newPosition,
        roleId,
      );
    });

    it("should add a toSetRolePosition function with correct values (isNot true)", async () => {
      initExpectMatch().not.toSetRolePosition(newPosition, roleId);
      await createDefaultTestFor(
        ToSetRolePosition,
        toSetRolePositionActionMock,
        true,
        newPosition,
        roleId,
      );
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
      await createToBeCalledTestFor(toSetRolePermissionActionMock);
    });

    it("should add a toSetRolePermission function with correct values using id", async () => {
      toSetRolePermission();
      await createDefaultTestFor(
        ToSetRolePermission,
        toSetRolePermissionActionMock,
        false,
        roleId,
        ["ADMINISTRATOR"],
      );
    });

    it("should add a toSetRolePermission function with correct values (isNot false)", async () => {
      toSetRolePermission();
      await createDefaultTestFor(
        ToSetRolePermission,
        toSetRolePermissionActionMock,
        false,
        roleId,
        ["ADMINISTRATOR"],
      );
    });

    it("should add a toSetRolePermission function with correct values (isNot true)", async () => {
      initExpectMatch().not.toSetRolePermission(roleId, "ADMINISTRATOR");
      await createDefaultTestFor(ToSetRolePermission, toSetRolePermissionActionMock, true, roleId, [
        "ADMINISTRATOR",
      ]);
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
      await createToBeCalledTestFor(toPinMessageActionMock);
    });

    it("should add a toPin function with correct values using id", async () => {
      initExpectMatch().toPin(messageId);
      await createDefaultTestFor(ToPinMessage, toPinMessageActionMock, false, messageId);
    });

    it("should add a toPin function with correct values using string id", async () => {
      const id = "1323";
      initExpectMatch().toPin(id);
      await createDefaultTestFor(ToPinMessage, toPinMessageActionMock, false, id);
    });

    it("should add a toPin function with correct values (isNot false)", async () => {
      initExpectMatch().toPin(messageId);
      await createDefaultTestFor(ToPinMessage, toPinMessageActionMock, false, messageId);
    });

    it("should add a toPin function with correct values (isNot true)", async () => {
      initExpectMatch().not.toPin(messageId);
      await createDefaultTestFor(ToPinMessage, toPinMessageActionMock, true, messageId);
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
      await createToBeCalledTestFor(toUnpinMessageActionMock);
    });

    it("should add a toUnpin function with correct values using id", async () => {
      initExpectMatch().toUnPin(messageId);
      await createDefaultTestFor(ToUnPinMessage, toUnpinMessageActionMock, false, messageId);
    });

    it("should add a toUnpin function with correct values using string id", async () => {
      const id = "123121";
      initExpectMatch().toUnPin(id);
      await createDefaultTestFor(ToUnPinMessage, toUnpinMessageActionMock, false, id);
    });

    it("should add a toUnpin function with correct values (isNot false)", async () => {
      initExpectMatch().toUnPin(messageId);
      await createDefaultTestFor(ToUnPinMessage, toUnpinMessageActionMock, false, messageId);
    });

    it("should add a toUnpin function with correct values (isNot true)", async () => {
      initExpectMatch().not.toUnPin(messageId);
      await createDefaultTestFor(ToUnPinMessage, toUnpinMessageActionMock, true, messageId);
    });
  });

  describe("testing to todoInCascade", () => {
    it("should add a function to hasIsolatedTestFunctions after call toUnpin", async () => {
      initExpectMatch().todoInCascade();
      expect(testCollector.hasIsolatedTestFunctions()).toBe(true);
    });

    it("should add a todoInCascade function", async () => {
      initExpectMatch().todoInCascade();
      await createToBeCalledTestFor(toUnpinMessageActionMock);
    });

    it("should add a todoInCascade function with correct values using id", async () => {
      const call = _expect.toReturn("test");
      initExpectMatch().todoInCascade(call);
      await createDefaultTestFor(TodoInCascade, todoInCascadeActionMock, false, [call]);
    });

    it("should add a todoInCascade function with correct values using string id", async () => {
      const call = _expect.toReturn("test");
      initExpectMatch().todoInCascade(call);
      await createDefaultTestFor(TodoInCascade, todoInCascadeActionMock, false, [call]);
    });

    it("should add a todoInCascade function with correct values (isNot false)", async () => {
      const call = _expect.toReturn("test");
      initExpectMatch().todoInCascade(call);
      await createDefaultTestFor(TodoInCascade, todoInCascadeActionMock, false, [call]);
    });

    it("should add a todoInCascade function with correct values (isNot true)", async () => {
      const call = _expect.toReturn("test");
      initExpectMatch().todoInCascade(call);
      await createDefaultTestFor(TodoInCascade, todoInCascadeActionMock, true, [call]);
    });
  });
});

function initExpectMatch(value?: any) {
  return new AllExpectMatches(value ?? con);
}
