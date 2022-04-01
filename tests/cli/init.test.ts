/* eslint-disable no-console */
import { init } from "../../src/cli/init";
import { FsMockUtils } from "../mockUtils/fs";

// As there are a local config file for manual tests,
// These files are renamed to avoid remotion after finish
// all tests.

const fs = new FsMockUtils();
jest.mock("fs");

beforeAll(() => {
  fs.createMockForWriteFileSync();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Testing creation of config file in init", () => {
  it("should create corde.config.js file", () => {
    init("js");
    expect(fs.getCreatedFileContent).toMatchSnapshot();
  });

  it("should create corde.config.ts file", () => {
    init("ts");
    expect(fs.getCreatedFileContent).toMatchSnapshot();
  });

  it("should create corde.config.json file", () => {
    init("json");
    expect(fs.getCreatedFileContent).toMatchSnapshot();
  });

  it("should create corde.config.json file with directly argument", () => {
    init("json");
    expect(fs.writeFileSyncArgs).toContain(fs.buildFilePath("corde.config.json"));
  });

  it("should create corde.config.json file without directly argument", () => {
    init();
    expect(fs.writeFileSyncArgs).toContain(fs.buildFilePath("corde.config.json"));
  });

  it("should create corde.config.json file with undefined argument", () => {
    init(undefined);
    expect(fs.writeFileSyncArgs).toContain(fs.buildFilePath("corde.config.json"));
  });
});

describe("Testing content of config file in init", () => {
  it("Should throw exception due to error in write", () => {
    fs.createMockForWriteFileSync(() => {
      throw new Error("testing error");
    });

    expect(() => init("json")).toThrow(Error);
  });
});
