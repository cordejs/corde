import { init } from "../../src/cli/init";
import { FsMockUtils } from "../mockUtils/fs";
import ConfigOptions from "../../src/interfaces";

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
  it("should create corde.js file", () => {
    init("js");
    expect(fs.writeFileSyncArgs).toContain(fs.buildFilePath("corde.js"));
  });

  it("should create corde.ts file", () => {
    init("ts");
    expect(fs.writeFileSyncArgs).toContain(fs.buildFilePath("corde.ts"));
  });

  it("should create corde.json file with directly argument", () => {
    init("json");
    expect(fs.writeFileSyncArgs).toContain(fs.buildFilePath("corde.json"));
  });

  it("should create corde.json file without directly argument", () => {
    init();
    expect(fs.writeFileSyncArgs).toContain(fs.buildFilePath("corde.json"));
  });

  it("should create corde.json file with undefined argument", () => {
    init(undefined);
    expect(fs.writeFileSyncArgs).toContain(fs.buildFilePath("corde.json"));
  });

  it("should print msg error if invalid file extension was informed", () => {
    let outputData = "";
    const storeLog = (inputs: string) => (outputData += inputs);
    console.log = jest.fn(storeLog);
    const invalidExtension = "asdf";
    // @ts-expect-error
    init(invalidExtension);
    expect(outputData).not.toBe("");
  });
});

describe("Testing content of config file in init", () => {
  const configFile: ConfigOptions = {
    botPrefix: "",
    botTestId: "",
    channelId: "",
    cordeTestToken: "",
    guildId: "",
    testFiles: [""],
    botTestToken: "",
    timeOut: 5000,
  };

  it("should js file have same values of configFile", () => {
    init("js");
    expect(configFile).toEqual(fs.convertCreatedFileContentToModule());
  });

  it("should ts file have same values of configFile", () => {
    init("ts");
    expect(configFile).toEqual(fs.convertCreatedFileContentToModule());
  });

  it("should json file have same values of configFile", () => {
    init("json");
    const content = JSON.parse(fs.getCreatedFileContent.toString());
    expect(configFile).toEqual(content);
  });

  it("Should throw exception due to error in write", () => {
    fs.createMockForWriteFileSync(() => {
      throw new Error("testing error");
    });

    expect(() => init("json")).toThrow(Error);
  });
});
