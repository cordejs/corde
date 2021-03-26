import * as pack from "../../package.json";
import * as initFunc from "../../src/cli/init";
import * as validateFunc from "../../src/cli/validate";
import * as goFunc from "../../src/cli/default";

import { program } from "../../src/cli/cli";
import { runtime } from "../../src/common";
import { reader } from "../../src/core";

describe("testing cli", () => {
  it("should get version", () => {
    expect(() => {
      program.parse(["node", "test", "-v"]);
    }).toThrow(pack.version);
  });

  it("should call init command", () => {
    const spy = jest.spyOn(initFunc, "init").mockImplementation(null);
    program.parse(["node", "test", "init"]);
    expect(spy).toBeCalled();
  });

  it("should call init command with 'i' alias", () => {
    const spy = jest.spyOn(initFunc, "init").mockImplementation(null);
    program.parse(["node", "test", "i"]);
    expect(spy).toBeCalled();
  });

  it("should call go command", () => {
    const spy = jest.spyOn(goFunc, "_default").mockImplementation(null);
    program.parse(["node", "test", ""]);
    expect(spy).toBeCalled();
  });

  it("should call go command with -c option", () => {
    const spy = jest.spyOn(goFunc, "_default").mockImplementation(null);
    const testPath = "potatoe";
    program.parse(["node", "test", "-c", testPath]);
    expect(spy).toBeCalled();
    expect(runtime.configFilePath).toBe(testPath);
  });

  it("should call go command with -f option (single file)", () => {
    const spy = jest.spyOn(goFunc, "_default").mockImplementation(null);
    const testFiles = "./tests";
    program.parse(["node", "test", "-f", testFiles]);
    expect(spy).toBeCalled();
    expect(runtime.testFiles).toEqual(testFiles.split(" "));
  });

  it("should call go command with -f option (multiple files)", () => {
    const spy = jest.spyOn(goFunc, "_default").mockImplementation(null);
    const testFiles = "./tests ./tests2";
    program.parse(["node", "test", "-f", testFiles]);
    expect(spy).toBeCalled();
    expect(runtime.testFiles).toEqual(testFiles.split(" "));
  });

  it("should call go command with --files option (single file)", () => {
    const spy = jest.spyOn(goFunc, "_default").mockImplementation(null);
    const testFiles = "./tests";
    program.parse(["node", "test", "--files", testFiles]);
    expect(spy).toBeCalled();
    expect(runtime.testFiles).toEqual(testFiles.split(" "));
  });

  it("should call go command with --files option (multiple files)", () => {
    const spy = jest.spyOn(goFunc, "_default").mockImplementation(null);
    const testFiles = "./tests ./tests2";
    program.parse(["node", "test", "--files", testFiles]);
    expect(spy).toBeCalled();
    expect(runtime.testFiles).toEqual(testFiles.split(" "));
  });

  it("should call go command with --config option", () => {
    const spy = jest.spyOn(goFunc, "_default").mockImplementation(null);
    const testPath = "potatoe";
    program.parse(["node", "test", "--config", testPath]);
    expect(spy).toBeCalled();
    expect(runtime.configFilePath).toBe(testPath);
  });

  it("should call validate command", () => {
    jest.spyOn(reader, "loadConfig").mockImplementation(null);
    const spyValidate = jest.spyOn(validateFunc, "validate").mockImplementation(null);
    program.parse(["node", "test", "validate"]);
    expect(spyValidate).toBeCalled();
  });

  it("should call validate command with 'v' alias", () => {
    jest.spyOn(reader, "loadConfig").mockImplementation(null);
    const spyValidate = jest.spyOn(validateFunc, "validate").mockImplementation(null);
    program.parse(["node", "test", "v"]);
    expect(spyValidate).toBeCalled();
  });
});
