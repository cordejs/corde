import fs from "fs";
import path from "path";
import { runtime } from "../../src/core/runtime";
import { testCollector } from "../../src/core/testCollector";
import { reader } from "../../src/core/Reader";
import { FileError } from "../../src/errors";
import { beforeAll as _beforeAll } from "../../src/hooks";

// TODO: This class must have more tests

const conf = require("../mocks/jsconfig/corde.config.js");
const cwd = process.cwd();

afterEach(() => {
  runtime.configFilePath = null;
  process.chdir(cwd);
});

describe("reader class", () => {
  describe("when instantiating it", () => {
    it("should create the instance", () => {
      expect(reader).toBeTruthy();
    });
  });

  describe("when working with reader.loadConfig()", () => {
    describe("and has runtime.configFilePath", () => {
      beforeEach(() => {
        jest.resetAllMocks();
      });
      it("should read configs from configFilePath", () => {
        const spy = jest.spyOn(fs, "readFileSync").mockReturnValue(null);
        runtime.configFilePath = path.resolve(
          process.cwd(),
          "tests/mocks/jsconfig/corde.config.js",
        );
        expect(reader.loadConfig()).toEqual(conf);
        spy.mockReset();
      });

      it("should throw error when path in runtime.configFilepath is invalid", () => {
        runtime.configFilePath = ".";
        jest.spyOn(fs, "existsSync").mockReturnValue(false);
        expect(() => reader.loadConfig()).toThrowError();
      });

      it("should resolve path of config", () => {
        const spy = jest.spyOn(fs, "readFileSync").mockReturnValue(null);
        runtime.configFilePath = "tests/mocks/jsconfig/corde.config.js";
        expect(reader.loadConfig()).toEqual(conf);
        spy.mockReset();
      });

      it("should read json config", () => {
        runtime.configFilePath = "tests/mocks/jsonconfig/corde.config.json";
        expect(reader.loadConfig()).toEqual(conf);
      });

      it("should throw exception due to invalid file extension (.txt)", () => {
        runtime.configFilePath = path.resolve(
          process.cwd(),
          "tests/mocks/txtconfig/corde.config.txt",
        );
        expect(() => reader.loadConfig()).toThrowError(FileError);
      });
    });

    describe("testing getTestsFromFiles", () => {
      it("should throw error due to no file", async () => {
        testCollector.createTestFile("path");
        try {
          await reader.getTestsFromFiles(null);
          fail();
        } catch (error) {
          expect(error).toBeInstanceOf(FileError);
        }
      });

      it("should get files with fail in execution of hook, but without stop execution", async () => {
        _beforeAll(() => {
          throw new Error();
        });

        const tests = await reader.getTestsFromFiles({
          filesPattern: [process.cwd(), "tests/mocks/sampleSingleTest.ts"],
        });
        expect(tests).toBeTruthy();
      });
    });

    describe("when working with auto search for config files (js, ts, json)", () => {
      it("should read configs from corde.js", () => {
        process.chdir(path.resolve(process.cwd(), "tests/mocks/jsconfig"));
        expect(reader.loadConfig()).toEqual(conf);
      });

      it("should read configs from corde.ts", () => {
        process.chdir(path.resolve(process.cwd(), "tests/mocks/tsconfig"));
        expect(reader.loadConfig()).toEqual(conf);
      });

      it("should read configs from corde.json", () => {
        const jsonPath = path.resolve(process.cwd(), "tests/mocks/jsonconfig/corde.config.json");
        const jsonConfig = JSON.parse(fs.readFileSync(jsonPath).toString());
        process.chdir(path.resolve(process.cwd(), "tests/mocks/jsonconfig"));
        expect(reader.loadConfig()).toEqual(jsonConfig);
      });

      it("should throw error when a config file (corde.json) is empty", () => {
        process.chdir(path.resolve(process.cwd(), "tests/mocks/jsonconfig"));
        const existsSpy = jest.spyOn(fs, "existsSync").mockReturnValue(true);
        const parseSpy = jest.spyOn(JSON, "parse").mockReturnValue(null);
        expect(() => reader.loadConfig()).toThrowError(FileError);
        existsSpy.mockReset();
        parseSpy.mockReset();
      });

      it("should throw error if has no config file", () => {
        const spy = jest.spyOn(fs, "existsSync").mockReturnValue(false);
        expect(() => reader.loadConfig()).toThrowError();
        spy.mockReset();
      });
    });
  });
});
