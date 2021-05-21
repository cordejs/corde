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
    const testMatches = "./tests";
    program.parse(["node", "test", "-f", testMatches]);
    expect(spy).toBeCalled();
    expect(runtime.testMatches).toEqual(testMatches.split(" "));
  });

  it("should call go command with -f option (multiple files)", () => {
    program.exitOverride();
    const spy = jest.spyOn(goFunc, "exec").mockImplementation(null);
    const testMatches = "./tests ./tests2";
    program.parse(["node", "test", "-f", testMatches]);
    expect(spy).toBeCalled();
    expect(runtime.testMatches).toEqual(testMatches.split(" "));
  });

  it("should call go command with --files option (single file)", () => {
    program.exitOverride();
    const spy = jest.spyOn(goFunc, "exec").mockImplementation(null);
    const testMatches = "./tests";
    program.parse(["node", "test", "--files", testMatches]);
    expect(spy).toBeCalled();
    expect(runtime.testMatches).toEqual(testMatches.split(" "));
  });

  it("should call go command with --files option (multiple files)", () => {
    program.exitOverride();
    const spy = jest.spyOn(goFunc, "exec").mockImplementation(null);
    const testMatches = "./tests ./tests2";
    program.parse(["node", "test", "--files", testMatches]);
    expect(spy).toBeCalled();
    expect(runtime.testMatches).toEqual(testMatches.split(" "));
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
    const spyValidate = jest.spyOn(validateFunc, "validate").mockImplementation(() => null);
    program.parse(["node", "test", "v"]);
    expect(spyValidate).toBeCalled();
  });
});
