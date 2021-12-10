import * as pack from "../../package.json";
import * as initFunc from "../../src/cli/init";
import * as validateFunc from "../../src/cli/validate";
import * as goFunc from "../../src/cli/exec";

import { program } from "../../src/cli/cli";
import { reader } from "../../src/core/Reader";

describe("testing cli", () => {
  it("should get version", () => {
    program.exitOverride();
    expect(() => {
      program.parse(["node", "test", "-v"]);
    }).toThrow(pack.version);
  });

  it("should call init command", () => {
    program.exitOverride();
    // @ts-expect-error
    const spy = jest.spyOn(initFunc, "init").mockImplementation(null);
    program.parse(["node", "test", "init"]);
    expect(spy).toBeCalled();
  });

  it("should call init command with 'i' alias", () => {
    program.exitOverride();
    // @ts-expect-error
    const spy = jest.spyOn(initFunc, "init").mockImplementation(null);
    program.parse(["node", "test", "i"]);
    expect(spy).toBeCalled();
  });

  it("should call validate command", () => {
    program.exitOverride();
    // @ts-expect-error
    jest.spyOn(reader, "loadConfig").mockImplementation(null);
    // @ts-expect-error
    const spyValidate = jest.spyOn(validateFunc, "validate").mockImplementation(null);
    program.parse(["node", "test", "validate"]);
    expect(spyValidate).toBeCalled();
  });

  it("should call validate command with 'v' alias", () => {
    program.exitOverride();
    // @ts-expect-error
    jest.spyOn(reader, "loadConfig").mockImplementation(() => null);
    // @ts-expect-error
    const spyValidate = jest.spyOn(validateFunc, "validate").mockImplementation(() => null);
    program.parse(["node", "test", "v"]);
    expect(spyValidate).toBeCalled();
  });

  it("should call exec command", () => {
    program.exitOverride();
    // @ts-expect-error
    const spy = jest.spyOn(goFunc, "exec").mockImplementation(null);
    program.parse(["node", "test", ""]);
    expect(spy).toBeCalled();
  });
});
