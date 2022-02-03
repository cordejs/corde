import { Reader } from "../../src/core/Reader";
import * as validateFn from "../../src/cli/validate";
import * as execCommand from "../../src/cli/exec";
import runtime from "../../src/core";
import { DEFAULT_TEST_TIMEOUT } from "../../src/const";
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
    await execCommand.exec({
      files: "",
      config: "",
    });
    expect(runtime.timeout).toEqual(TIMEOUT);
  });

  it("should call go command with -c option", async () => {
    mockExecProces(config);
    const testPath = "potatoe";
    await program.parseAsync(["node", "test", "-c", testPath]);
    expect(runtime.configFilePath).toBe(testPath);
  });

  it("should call go command with -f option (single file)", async () => {
    mockExecProces(config);
    const testMatches = "./tests";
    await program.parseAsync(["node", "test", "-f", testMatches]);
    expect(runtime.testMatches).toEqual(testMatches.split(" "));
  });

  it("should call go command with -f option (multiple files)", async () => {
    mockExecProces(config);
    const testMatches = "./tests ./tests2";
    await program.parseAsync(["node", "test", "-f", testMatches]);
    expect(runtime.testMatches).toEqual(testMatches.split(" "));
  });

  it("should call go command with --files option (single file)", async () => {
    mockExecProces(config);
    const testMatches = "./tests";
    await program.parseAsync(["node", "test", "--files", testMatches]);
    expect(runtime.testMatches).toEqual(testMatches.split(" "));
  });

  it("should call go command with --files option (multiple files)", async () => {
    mockExecProces(config);
    const testMatches = "./tests ./tests2";
    await program.parseAsync(["node", "test", "--files", testMatches]);
    expect(runtime.testMatches).toEqual(testMatches.split(" "));
  });

  it("should call go command with --config option", async () => {
    mockExecProces(config);
    const testPath = "potatoe";
    await program.parseAsync(["node", "test", "--config", testPath]);
    expect(runtime.configFilePath).toBe(testPath);
  });
});

function mockExecProces(config: IConfigOptions) {
  Reader.prototype.loadConfig = jest.fn().mockReturnValue(config);
  jest.spyOn(validateFn, "validate").mockImplementation(undefined);
  jest.spyOn(execCommand, "runTests").mockImplementation(undefined);
  mockProcess.mockProcessExit();
  runtime.loginBot = jest.fn().mockReturnValue(Promise.resolve());
  runtime.events.onceReady = jest.fn().mockReturnValue(Promise.resolve());
  summary.print = jest.fn().mockReturnValue("");
  jest.spyOn(validateFn, "validate");
}
