import { Client } from "discord.js";
import { runtime } from "../../src/common/runtime";
import { TodoInCascade } from "../../src/expect/matches/todoInCascade";
import { CordeBotLike, TestFunctionType, TestReport } from "../../src/types";
import { buildReportMessage } from "../../src/utils";
import MockDiscord from "../mocks/mockDiscord";
import { MockEvents } from "../mocks/mockEvents";
import {
  createReport,
  initCordeClientWithChannel,
  removeANSIColorStyle,
  testUtils,
} from "../testHelper";
import { expect as _expect } from "../../src/expect";

let mockDiscord = new MockDiscord();
let mockEvents: MockEvents;

function initClient() {
  const corde = initCordeClientWithChannel(mockDiscord, new Client());
  corde.findRole = jest.fn().mockReturnValue(mockDiscord.role);
  corde.fetchRole = jest.fn().mockReturnValue(mockDiscord.role);
  corde.sendTextMessage = jest.fn().mockImplementation(() => {});
  return corde;
}

function matchMessageSnapshot(report: TestReport) {
  if (report.message) {
    expect(removeANSIColorStyle(report.message)).toMatchSnapshot();
  }
}

function initTestClass(cordeBot: CordeBotLike, isNot: boolean, command?: string) {
  return testUtils.initTestClass(TodoInCascade, {
    command: command ?? "toDelete",
    cordeBot: cordeBot,
    isNot: isNot,
    timeout: runtime.timeOut,
  });
}

function injectCordeBotToTests(cordeBot: CordeBotLike, ...tests: TestFunctionType[]) {
  return tests.map((test) => () => test(cordeBot));
}

describe("testing todoInCascade function", () => {
  afterEach(() => {
    mockDiscord = new MockDiscord();
  });

  it("should fail due to no test was passed", async () => {
    const corde = initClient();
    const todoInCascade = initTestClass(corde, false);
    const report = await todoInCascade.action();

    expect(report.pass).toEqual(false);
    matchMessageSnapshot(report);
  });

  it("should return true due to timeout and isNot true", async () => {
    const corde = initClient();
    const todoInCascade = initTestClass(corde, true);

    mockEvents = new MockEvents(corde, mockDiscord);
    const report = await todoInCascade.action(_expect.toReturn(""));

    expect(report.pass).toEqual(true);
  });

  it("should return failed due to timeout and isNot false", async () => {
    const corde = initClient();
    const todoInCascade = initTestClass(corde, false);

    mockEvents = new MockEvents(corde, mockDiscord);
    const report = await todoInCascade.action(_expect.toReturn("123"));

    expect(report.pass).toEqual(false);
    matchMessageSnapshot(report);
  });

  it("should return failed due to timeout and isNot false", async () => {
    runtime.setConfigs({ timeOut: 100 });
    const corde = initClient();
    const todoInCascade = initTestClass(corde, false);

    mockEvents = new MockEvents(corde, mockDiscord);
    const tests = injectCordeBotToTests(
      corde,
      _expect.toReturn("123"),
      _expect.toRenameRole("newName", "1312412"),
    );
    const report = await todoInCascade.action(...tests);

    expect(report.pass).toEqual(false);
    matchMessageSnapshot(report);
  });
});
