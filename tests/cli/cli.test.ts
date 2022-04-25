import * as pack from "../../package.json";

import { program } from "../../src/cli";
import { Exec, Init, Validate } from "../../src/cli/commands";
import { commandFactory } from "../../src/cli/common";
import { reader } from "../../src/core/Reader";

const init = commandFactory.getCommand(Init);
const validate = commandFactory.getCommand(Validate);
const exec = commandFactory.getCommand(Exec);

describe("testing cli", () => {
  beforeAll(() => {
    validate.dispose = jest.fn();
  });

  it("should get version", () => {
    program.exitOverride();
    expect(() => {
      program.parse(["node", "test", "-v"]);
    }).toThrow(pack.version);
  });

  it("should call init command", () => {
    program.exitOverride();
    jest.spyOn(init, "dispose").mockImplementation(null);
    const spy = jest.spyOn(init, "handler").mockImplementation(null);
    program.parse(["node", "test", "init"]);
    expect(spy).toBeCalled();
  });

  it("should call init command with 'i' alias", () => {
    program.exitOverride();
    jest.spyOn(init, "dispose").mockImplementation(null);
    const spy = jest.spyOn(init, "handler").mockImplementation(null);
    program.parse(["node", "test", "i"]);
    expect(spy).toBeCalled();
  });

  it("should call validate command", () => {
    program.exitOverride();
    jest.spyOn(reader, "loadConfig").mockImplementation(null);
    const spyValidate = jest.spyOn(validate, "handler").mockImplementation(null);
    program.parse(["node", "test", "validate"]);
    expect(spyValidate).toBeCalled();
  });

  it("should call validate command with 'v' alias", () => {
    program.exitOverride();
    jest.spyOn(reader, "loadConfig").mockImplementation(() => null);

    const spyValidate = jest.spyOn(validate, "handler").mockImplementation(() => null);
    program.parse(["node", "test", "v"]);
    expect(spyValidate).toBeCalled();
  });

  it("should call exec command", () => {
    program.exitOverride();
    jest.spyOn(exec, "dispose").mockImplementation(null);
    const spy = jest.spyOn(exec, "handler").mockImplementation(null);
    program.parse(["node", "test", ""]);
    expect(spy).toBeCalled();
  });
});
