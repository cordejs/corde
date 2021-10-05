import path from "path";
import fs from "fs";
import MockDiscord from "./mocks/mockDiscord";
import { Client } from "discord.js";
import { CordeBot } from "../src/core/CordeBot";
import { ICordeBot, ITestReport } from "../src/types";
import { IExpectTestBaseParams } from "../src/types";
import { runtime } from "../src/core/runtime";
import { buildReportMessage } from "../src/utils";
import { testCollector } from "../src/core/TestCollector";
import { CommandState } from "../src/command/matches/commandstate";

export const normalTsPath = path.resolve(process.cwd(), "corde.ts");
export const tempTsPath = path.resolve(process.cwd(), "__corde.ts");

export const normalJsPath = path.resolve(process.cwd(), "corde.js");
export const tempJsPath = path.resolve(process.cwd(), "__corde.js");

export const normalJsonPath = path.resolve(process.cwd(), "corde.json");
export const tempJsonPath = path.resolve(process.cwd(), "__corde.json");

export function getConsoleSpyStder(spy: jest.SpyInstance<void, any>) {
  return getFullConsoleLog(spy.mock.calls);
}

export function getFullConsoleLog(log: [any?, ...any[]][]) {
  let stringValue = "";
  for (const value1 of log) {
    for (const value2 of value1) {
      stringValue += `${value2}\n`;
    }
  }
  return stringValue;
}

export function renameConfigFilesToTempNames() {
  if (fs.existsSync(normalTsPath)) {
    fs.renameSync(normalTsPath, tempTsPath);
  }

  if (fs.existsSync(normalJsPath)) {
    fs.renameSync(normalJsPath, tempJsPath);
  }

  if (fs.existsSync(normalJsonPath)) {
    fs.renameSync(normalJsonPath, tempJsonPath);
  }
}

export function renameConfigTempFileNamesToNormal() {
  if (fs.existsSync(tempTsPath)) {
    fs.renameSync(tempTsPath, normalTsPath);
  }

  if (fs.existsSync(tempJsPath)) {
    fs.renameSync(tempJsPath, normalJsPath);
  }

  if (fs.existsSync(tempJsonPath)) {
    fs.renameSync(tempJsonPath, normalJsonPath);
  }
}

/**
 * Define a new value for a property. Useful for readonly properties
 *
 * @param object Object that contains the property
 * @param property Object property to be mocked
 * @param value New value to property
 */
export function mockProperty<T extends {}, K extends keyof T>(object: T, property: K, value: T[K]) {
  Object.defineProperty(object, property, { get: () => value });
}

export function createCordeBotWithMockedFunctions(
  mockDiscord: MockDiscord,
  findRoleMock: any = mockDiscord.role,
) {
  const corde = initCordeClientWithChannel(mockDiscord, new Client());
  corde.getRoles = jest.fn().mockReturnValue(mockDiscord.roleManager.cache);
  corde.findRole = jest.fn().mockReturnValue(findRoleMock);
  corde.sendTextMessage = jest.fn().mockImplementation(() => {});
  return corde;
}

export function initCordeClientWithChannel(
  mockDiscord: MockDiscord,
  client: Client,
  timeout = 500,
) {
  client.guilds.cache.has = jest.fn().mockReturnValueOnce(true);
  client.guilds.cache.find = jest.fn().mockReturnValueOnce(mockDiscord.guild);

  mockDiscord.guild.channels.cache.has = jest.fn().mockReturnValueOnce(true);
  mockDiscord.guild.channels.cache.find = jest.fn().mockReturnValueOnce(mockDiscord.textChannel);
  return initCordeClient(mockDiscord, client, timeout);
}

export const DEFAULT_PREFIX = "!";

export function initCordeClient(
  mockDiscord: MockDiscord,
  clientInstance: Client,
  timeout = 500,
): ICordeBot {
  return new CordeBot(
    DEFAULT_PREFIX,
    mockDiscord.guild.id,
    mockDiscord.channel.id,
    mockDiscord.userBotId,
    clientInstance,
  );
}

export function executeWithDelay(fn: () => void, delay: number) {
  setTimeout(() => {
    fn();
  }, delay);
}

export function removeANSIColorStyle(value: string) {
  return value.replace(
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    "",
  );
}

export interface TestFileGeneratorInfo {
  amountOfTests: number;
  amountOfTestFunctions?: number;
  testFunctionsReport?: ITestReport[];
  amountOfTestFiles: number;
}

export const testFileNames = [
  "/tests/file1.test.ts",
  "/tests/file2.test.ts",
  "/tests/file3.test.ts",
  "/tests/file4.test.ts",
];

export const testNames = ["test case1", "test case2", "test case3", "test case4"];

export function _initTestSimpleInstance<T extends CommandState>(
  type: new (params: IExpectTestBaseParams) => T,
  params: IExpectTestBaseParams,
) {
  return new type({
    command: params.command ?? "",
    cordeBot: params.cordeBot,
    channelId: params.channelId,
    guildId: params.guildId ?? runtime.guildId,
    isNot: params.isNot ?? false,
    timeout: params.timeout ?? runtime.timeout,
    isCascade: params.isCascade ?? false,
  });
}

export namespace testUtils {
  export function initTestClass<T extends CommandState>(
    type: new (params: IExpectTestBaseParams) => T,
    params: Partial<IExpectTestBaseParams>,
  ) {
    return new type({
      command: params.command ?? "",
      cordeBot: params.cordeBot ?? ({} as any),
      isNot: params.isNot ?? false,
      channelId: params.channelId ?? runtime.channelId,
      guildId: params.guildId ?? runtime.guildId,
      timeout: params.timeout ?? runtime.timeout,
      isCascade: params.isCascade ?? false,
    });
  }

  export function createPassReport(): ITestReport {
    return {
      pass: true,
      testName: "",
    };
  }

  export function createResolvedPassReport() {
    return Promise.resolve(testUtils.createPassReport());
  }

  export function createResolvedFailedReport(message: string[], trace?: string) {
    return Promise.resolve(testUtils.createFailedITestReport(message, trace));
  }

  export function createFailedITestReport(message: string[], trace?: string) {
    return {
      pass: false,
      testName: "",
      message: buildReportMessage(...message),
      trace: trace,
    };
  }
}

export function createReport(entity: Object, pass: boolean, message?: string): ITestReport {
  const obj: ITestReport = {
    pass,
    testName: entity.toString(),
  };

  if (message) {
    obj.message = message;
  }
  return obj;
}

export namespace testHelper {
  export function initCommandTestsFixtures(): [MockDiscord, ICordeBot] {
    const file = testCollector.createTestFile("");
    file.isInsideTestClausure = true;
    const mockDiscord = new MockDiscord();
    runtime.setConfigs({ timeout: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());
    return [mockDiscord, cordeClient];
  }
}
