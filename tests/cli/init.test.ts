import init from "../../src/cli/init";
import fs from "fs";
import path from "path";
import ConfigOptions from "../../src/interfaces";
import { renameConfigFilesToTempNames, renameConfigTempFileNamesToNormal } from "../testHelper";

// As there are a local config file for manual tests,
// These files are renamed to avoid remotion after finish
// all tests.

beforeAll(() => {
  renameConfigFilesToTempNames();
});

afterAll(() => {
  renameConfigTempFileNamesToNormal();
});

describe("Testing creation of config file in init", () => {
  it("should create corde.js file", () => {
    init("js");
    const filePath = path.resolve(process.cwd(), "corde.js");
    const jsFileExists = fs.existsSync(filePath);
    expect(jsFileExists).toBe(true);
    fs.unlinkSync(filePath);
  });

  it("should create corde.ts file", () => {
    init("ts");
    const filePath = path.resolve(process.cwd(), "corde.ts");
    const tsFileExists = fs.existsSync(filePath);
    expect(tsFileExists).toBe(true);
    fs.unlinkSync(filePath);
  });

  it("should create corde.json file with directly argument", () => {
    init("json");
    const filePath = path.resolve(process.cwd(), "corde.json");
    const tsFileExists = fs.existsSync(filePath);
    expect(tsFileExists).toBe(true);
    fs.unlinkSync(filePath);
  });

  it("should create corde.json file without directly argument", () => {
    init();
    const filePath = path.resolve(process.cwd(), "corde.json");
    const tsFileExists = fs.existsSync(filePath);
    expect(tsFileExists).toBe(true);
    fs.unlinkSync(filePath);
  });

  it("should create corde.json file with undefined argument", () => {
    init(undefined);
    const filePath = path.resolve(process.cwd(), "corde.json");
    const tsFileExists = fs.existsSync(filePath);
    expect(tsFileExists).toBe(true);
    fs.unlinkSync(filePath);
  });

  it("should print msg error if invalid file extension was informed", () => {
    let outputData = "";
    const storeLog = (inputs: string) => (outputData += inputs);
    console.log = jest.fn(storeLog);
    const invalidExtension = "asdf";
    // @ts-expect-error
    init(invalidExtension);
    expect(outputData).not.toBe("");
    const filePath = path.resolve(process.cwd(), `corde.${invalidExtension}`);
    fs.unlinkSync(filePath);
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
    const filePath = path.resolve(process.cwd(), "corde.js");
    if (filePath) {
      const content = require(filePath);
      expect(configFile).toEqual(content);
      fs.unlinkSync(filePath);
    } else {
      fail();
    }
  });

  it("should ts file have same values of configFile", () => {
    init("ts");
    const filePath = path.resolve(process.cwd(), "corde.ts");
    try {
      const content = require(filePath);
      expect(configFile).toEqual(content);
    } catch (error) {
      fail();
    } finally {
      fs.unlinkSync(filePath);
    }
  });

  it("should json file have same values of configFile", () => {
    init("json");
    const filePath = path.resolve(process.cwd(), "corde.json");
    try {
      const content = JSON.parse(fs.readFileSync(filePath).toString());
      expect(configFile).toEqual(content);
    } catch (error) {
      fail();
    } finally {
      fs.unlinkSync(filePath);
    }
  });

  it("Should throw exception due to error in write", () => {
    fs.writeFileSync = jest.fn().mockImplementationOnce(() => {
      throw new Error();
    });

    expect(() => init("json")).toThrow(Error);
  });
});
