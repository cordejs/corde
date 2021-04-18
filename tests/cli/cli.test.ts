import * as pack from "../../package.json";
import * as initFunc from "../../src/cli/init";
import * as validateFunc from "../../src/cli/validate";
import * as goFunc from "../../src/cli/exec";

import { program } from "../../src/cli/cli";
import { runtime } from "../../src/common/runtime";
import { reader } from "../../src/core/reader";

describe("testing cli", () => {
  it("should get version", () => {
    program.exitOverride();
    expect(() => {
      program.parse(["node", "test", "-v"]);
    }).toThrow(pack.version);
  });

  it("should call init command", () => {
    program.exitOverride();
    const spy = jest.spyOn(initFunc, "init").mockImplementation(null);
    program.parse(["node", "test", "init"]);
    expect(spy).toBeCalled();
  });

  it("should call init command with 'i' alias", () => {
    program.exitOverride();
    const spy = jest.spyOn(initFunc, "init").mockImplementation(null);
    program.parse(["node", "test", "i"]);
    expect(spy).toBeCalled();
  });

  it("should call go command", () => {
    program.exitOverride();
    const spy = jest.spyOn(goFunc, "exec").mockImplementation(null);
    program.parse(["node", "test", ""]);
    expect(spy).toBeCalled();
  });

  it("should call go command with -c option", () => {
    program.exitOverride();
    const spy = jest.spyOn(goFunc, "exec").mockImplementation(null);
    const testPath = "potatoe";
    program.parse(["node", "test", "-c", testPath]);
    expect(spy).toBeCalled();
    expect(runtime.configFilePath).toBe(testPath);
  });

  it("should call go command with -f option (single file)", () => {
    program.exitOverride();
    const spy = jest.spyOn(goFunc, "exec").mockImplementation(null);
    const testFiles = "./tests";
    program.parse(["node", "test", "-f", testFiles]);
    expect(spy).toBeCalled();
    expect(runtime.testFiles).toEqual(testFiles.split(" "));
  });

  it("should call go command with -f option (multiple files)", () => {
    program.exitOverride();
    const spy = jest.spyOn(goFunc, "exec").mockImplementation(null);
    const testFiles = "./tests ./tests2";
    program.parse(["node", "test", "-f", testFiles]);
    expect(spy).toBeCalled();
    expect(runtime.testFiles).toEqual(testFiles.split(" "));
  });

  it("should call go command with --files option (single file)", () => {
    program.exitOverride();
    const spy = jest.spyOn(goFunc, "exec").mockImplementation(null);
    const testFiles = "./tests";
    program.parse(["node", "test", "--files", testFiles]);
    expect(spy).toBeCalled();
    expect(runtime.testFiles).toEqual(testFiles.split(" "));
  });

  it("should call go command with --files option (multiple files)", () => {
    program.exitOverride();
    const spy = jest.spyOn(goFunc, "exec").mockImplementation(null);
    const testFiles = "./tests ./tests2";
    program.parse(["node", "test", "--files", testFiles]);
    expect(spy).toBeCalled();
    expect(runtime.testFiles).toEqual(testFiles.split(" "));
  });

  it("should call go command with --config option", () => {
    program.exitOverride();
    const spy = jest.spyOn(goFunc, "exec").mockImplementation(null);
    const testPath = "potatoe";
    program.parse(["node", "test", "--config", testPath]);
    expect(spy).toBeCalled();
    expect(runtime.configFilePath).toBe(testPath);
  });

  it("should call validate command", () => {
    program.exitOverride();
    jest.spyOn(reader, "loadConfig").mockImplementation(null);
    const spyValidate = jest.spyOn(validateFunc, "validate").mockImplementation(null);
    program.parse(["node", "test", "validate"]);
    expect(spyValidate).toBeCalled();
  });

  it("should call validate command with 'v' alias", () => {
    program.exitOverride();
    jest.spyOn(reader, "loadConfig").mockImplementation(() => null);
    const spyValidate = jest.spyOn(validateFunc, "validate").mockImplementation(() => {});
    program.parse(["node", "test", "v"]);
    expect(spyValidate).toBeCalled();
  });

  it("should call cli silently", () => {
    program.exitOverride();
    jest.spyOn(reader, "loadConfig").mockImplementation(() => null);
    expect(runtime.silent).not.toBeTruthy();
    program.parse(["node", "test", "--silent"]);
    expect(runtime.silent).toBeTruthy();
  });

  it("should set botPrefix", () => {
    program.exitOverride();
    jest.spyOn(reader, "loadConfig").mockImplementation(() => null);
    expect(runtime.botPrefix).toBeFalsy();
    program.parse(["node", "test", "--botPrefix", "!"]);
    expect(runtime.botPrefix).toEqual("!");
  });

  it("should set timeout", () => {
    program.exitOverride();
    jest.spyOn(reader, "loadConfig").mockImplementation(() => null);
    program.parse(["node", "test", "--timeout", "1000"]);
    expect(runtime.timeout).toEqual(1000);
  });

  it("should set guildId", () => {
    program.exitOverride();
    const param = "12312412421";
    jest.spyOn(reader, "loadConfig").mockImplementation(() => null);
    expect(runtime.guildId).toBeFalsy();
    program.parse(["node", "test", "--guildId", param]);
    expect(runtime.guildId).toEqual(param);
  });

  it("should set channelId", () => {
    program.exitOverride();
    const param = "12312412421";
    jest.spyOn(reader, "loadConfig").mockImplementation(() => null);
    expect(runtime.channelId).toBeFalsy();
    program.parse(["node", "test", "--channelId", param]);
    expect(runtime.channelId).toEqual(param);
  });

  it("should set botTestToken", () => {
    program.exitOverride();
    const param = "asdas1kl2j31lkjlas";
    jest.spyOn(reader, "loadConfig").mockImplementation(() => null);
    expect(runtime.botTestToken).toBeFalsy();
    program.parse(["node", "test", "--botTestToken", param]);
    expect(runtime.botTestToken).toEqual(param);
  });

  it("should set botTestId", () => {
    program.exitOverride();
    const param = "12312412312412312";
    jest.spyOn(reader, "loadConfig").mockImplementation(() => null);
    expect(runtime.botTestId).toBeFalsy();
    program.parse(["node", "test", "--botTestId", param]);
    expect(runtime.botTestId).toEqual(param);
  });

  it("should set cordeTestToken", () => {
    program.exitOverride();
    const param = "alsdj1çlk1j2d1ubça2";
    jest.spyOn(reader, "loadConfig").mockImplementation(() => null);
    expect(runtime.cordeTestToken).toBeFalsy();
    program.parse(["node", "test", "--cordeTestToken", param]);
    expect(runtime.cordeTestToken).toEqual(param);
  });
});
