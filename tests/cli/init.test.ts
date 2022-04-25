/* eslint-disable no-console */
import { program } from "../../src/cli";
import { Init } from "../../src/cli/commands";
import { commandFactory } from "../../src/cli/common";
import { FsMockUtils } from "../mockUtils/fs";

// As there are a local config file for manual tests,
// These files are renamed to avoid remotion after finish
// all tests.

const fs = new FsMockUtils();
commandFactory.loadCommands(program);
const init = commandFactory.getCommand(Init);

jest.mock("fs");

beforeAll(() => {
  jest.spyOn(Init.prototype, "dispose").mockImplementation(() => null);
  fs.createMockForWriteFileSync();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Testing creation of config file in init", () => {
  it("should create corde.config.js file", () => {
    init.handler("js");
    expect(fs.getCreatedFileContent).toMatchSnapshot();
  });

  it("should create corde.config.ts file", () => {
    init.handler("ts");
    expect(fs.getCreatedFileContent).toMatchSnapshot();
  });

  it("should create corde.config.json file", () => {
    init.handler("json");
    expect(fs.getCreatedFileContent).toMatchSnapshot();
  });

  it("should create corde.config.json file with directly argument", () => {
    init.handler("json");
    expect(fs.writeFileSyncArgs).toContain(fs.buildFilePath("corde.config.json"));
  });

  it("should create corde.config.json file without directly argument", () => {
    init.handler();
    expect(fs.writeFileSyncArgs).toContain(fs.buildFilePath("corde.config.json"));
  });

  it("should create corde.config.json file with undefined argument", () => {
    init.handler(undefined);
    expect(fs.writeFileSyncArgs).toContain(fs.buildFilePath("corde.config.json"));
  });
});

describe("Testing content of config file in init", () => {
  it("Should throw exception due to error in write", () => {
    fs.createMockForWriteFileSync(() => {
      throw new Error("testing error");
    });

    expect(() => init.handler("json")).toThrow(Error);
  });
});
