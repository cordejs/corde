import { Reader, reader } from "../../src/core/reader";
import * as validateFn from "../../src/cli/validate";
import * as execCommand from "../../src/cli/exec";
import { runtime } from "../../src/common/runtime";
import { TestExecutor } from "../../src/core/testExecutor";
import { DEFAULT_TEST_TIMEOUT } from "../../src/consts";
import { IConfigOptions } from "../../src/types";
import { summary } from "../../src/core/summary";
import { mockProcess } from "../mocks";
import { program } from "../../src/cli/cli";

jest.mock("ora", () => {
  const spinner = {
    stop: jest.fn(),
  };
  const start = () => spinner;
  const result = { start };
  return () => result;
});

describe("testing configs load", () => {
  const config: IConfigOptions = {
    botPrefix: "",
    botTestId: "",
    channelId: "",
    cordeBotToken: "",
    guildId: "",
    testMatches: [""],
    botToken: "",
    timeout: DEFAULT_TEST_TIMEOUT,
  };
  it("should load configs overriding timout value", async () => {
    // https://github.com/cordejs/corde/issues/771
    const TIMEOUT = 100000;
    config.timeout = TIMEOUT;
    mockExecProces(config);
    await execCommand.exec(
      {
        files: "",
        config: "",
      },
      [],
    );
    expect(runtime.timeout).toEqual(TIMEOUT);
  });

  it("should call go command with -c option", () => {
    mockExecProces(config);
    const testPath = "potatoe";
    program.parse(["node", "test", "-c", testPath]);
    expect(runtime.configFilePath).toBe(testPath);
  });

  it("should call go command with -f option (single file)", () => {
    mockExecProces(config);
    const testMatches = "./tests";
    program.parse(["node", "test", "-f", testMatches]);
    expect(runtime.testMatches).toEqual(testMatches.split(" "));
  });

  it("should call go command with -f option (multiple files)", () => {
    mockExecProces(config);
    const testMatches = "./tests ./tests2";
    program.parse(["node", "test", "-f", testMatches]);
    expect(runtime.testMatches).toEqual(testMatches.split(" "));
  });

  it("should call go command with --files option (single file)", () => {
    mockExecProces(config);
    const testMatches = "./tests";
    program.parse(["node", "test", "--files", testMatches]);
    expect(runtime.testMatches).toEqual(testMatches.split(" "));
  });

  it("should call go command with --files option (multiple files)", () => {
    mockExecProces(config);
    const testMatches = "./tests ./tests2";
    program.parse(["node", "test", "--files", testMatches]);
    expect(runtime.testMatches).toEqual(testMatches.split(" "));
  });

  it("should call go command with --config option", () => {
    mockExecProces(config);
    const testPath = "potatoe";
    program.parse(["node", "test", "--config", testPath]);
    expect(runtime.configFilePath).toBe(testPath);
  });
});

function mockExecProces(config: IConfigOptions) {
  Reader.prototype.loadConfig = jest.fn().mockReturnValue(config);
  jest.spyOn(validateFn, "validate").mockImplementation(null);
  jest.spyOn(execCommand, "runTests").mockImplementation(null);
  mockProcess.mockProcessExit();
  runtime.loginBot = jest.fn().mockReturnValue(Promise.resolve());
  runtime.events.onceReady = jest.fn().mockReturnValue(Promise.resolve());
  summary.print = jest.fn().mockReturnValue("");
  jest.spyOn(validateFn, "validate");
}
