import { Reader } from "../../src/core/Reader";
import * as validateFn from "../../src/cli/validate";
import * as execCommand from "../../src/cli/exec";
import runtime from "../../src/core/runtime";
import { DEFAULT_CONFIG } from "../../src/const";
import { summary } from "../../src/core/summary";
import { mockProcess } from "../mocks";
import { program } from "../../src/cli/cli";
import MockDiscord from "../mocks/mockDiscord";

jest.mock("ora", () => {
  const spinner = {
    stop: jest.fn(),
  };
  const start = () => spinner;
  const result = { start };
  return () => result;
});

beforeAll(() => {
  const mockDiscord = new MockDiscord();
  const _client = mockDiscord.mockClient();
  runtime.initBot(_client);
});

describe("testing configs load", () => {
  const config: corde.IConfigOptions = {
    botPrefix: "",
    botTestId: "",
    channelId: "",
    cordeBotToken: "",
    guildId: "",
    testMatches: [""],
    timeout: DEFAULT_CONFIG.timeout,
    loginCordeBotOnStart: false,
  };
  it("should load configs overriding timeout value", async () => {
    // https://github.com/cordejs/corde/issues/771
    const TIMEOUT = 100000;
    config.timeout = TIMEOUT;
    mockExecProcess(config);
    await execCommand.exec({
      files: "",
      config: "",
    });
    expect(runtime.timeout).toEqual(TIMEOUT);
  });

  it("should call go command with -c option", async () => {
    mockExecProcess(config);
    const testPath = "potatoes";
    await program.parseAsync(["node", "test", "-c", testPath]);
    expect(runtime.configFilePath).toBe(testPath);
  });

  it("should call go command with -f option (single file)", async () => {
    mockExecProcess(config);
    const testMatches = "./tests";
    await program.parseAsync(["node", "test", "-f", testMatches]);
    expect(runtime.testMatches).toEqual(testMatches.split(" "));
  });

  it("should call go command with -f option (multiple files)", async () => {
    mockExecProcess(config);
    const testMatches = "./tests ./tests2";
    await program.parseAsync(["node", "test", "-f", testMatches]);
    expect(runtime.testMatches).toEqual(testMatches.split(" "));
  });

  it("should call go command with --files option (single file)", async () => {
    mockExecProcess(config);
    const testMatches = "./tests";
    await program.parseAsync(["node", "test", "--files", testMatches]);
    expect(runtime.testMatches).toEqual(testMatches.split(" "));
  });

  it("should call go command with --files option (multiple files)", async () => {
    mockExecProcess(config);
    const testMatches = "./tests ./tests2";
    await program.parseAsync(["node", "test", "--files", testMatches]);
    expect(runtime.testMatches).toEqual(testMatches.split(" "));
  });

  it.only("should call go command with --config option", async () => {
    mockExecProcess(config);
    const testPath = "potatoes";
    await program.parseAsync(["node", "test", "--config", testPath]);
    expect(runtime.configFilePath).toBe(testPath);
  });
});

function mockExecProcess(config: corde.IConfigOptions) {
  Reader.prototype.loadConfig = jest.fn().mockReturnValue(config);

  jest.spyOn(validateFn, "validate").mockImplementation(() => null);
  jest.spyOn(execCommand, "runTests").mockImplementation(() => null);
  //mockProcess.mockProcessExit();
}
