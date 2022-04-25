import { Reader } from "../../src/core/Reader";
import runtime from "../../src/core/runtime";
import { DEFAULT_CONFIG } from "../../src/const";
import { program } from "../../src/cli";
import MockDiscord from "../mocks/mockDiscord";
import { Exec, Init, Validate } from "../../src/cli/commands";
import { commandFactory } from "../../src/cli/common";

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
    const execCon = commandFactory.getCommand(Exec);
    await execCon.handler({
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

  it("should call go command with --config option", async () => {
    mockExecProcess(config);
    const testPath = "potatoes";
    await program.parseAsync(["node", "test", "--config", testPath]);
    expect(runtime.configFilePath).toBe(testPath);
  });
});

function mockExecProcess(config: corde.IConfigOptions) {
  Reader.prototype.loadConfig = jest.fn().mockReturnValue(config);
  jest.spyOn(Validate.prototype, "handler").mockImplementation(() => null);
  jest.spyOn(Init.prototype, "dispose").mockImplementation(() => null);
  jest.spyOn(Exec.prototype, "dispose").mockImplementation(() => null);
  // @ts-expect-error
  jest.spyOn(Exec.prototype, "runTests").mockImplementation(() => null);
}
