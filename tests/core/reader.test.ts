import fs from "fs";
import path from "path";
import { runtime, testCollector } from "../../src/common";
import reader from "../../src/core/reader";
import { Group } from "../../src/types";
import consts from "../mocks/constsNames";
import { FileError } from "../../src/errors";

const conf = require("../mocks/jsconfig/corde.config.js");
const cwd = process.cwd();

afterEach(() => {
  runtime.configFilePath = null;
  process.chdir(cwd);
  testCollector.cleanAll();
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

  describe("when working with reader.getTestsFromFiles()", () => {
    it("should throw exception when has no file", () => {
      expect(() => reader.getTestsFromFiles(null)).toThrowError(FileError);
    });

    it("should read tests from a single test()", () => {
      const sampleSingleTestGroup: Group[] = [
        {
          tests: [
            {
              testsFunctions: [expect.any(Function)],
              name: consts.TEST_1,
            },
          ],
        },
      ];
      const files = [path.resolve(process.cwd(), "tests/mocks/sampleSingleTest")];
      const groups = reader.getTestsFromFiles(files);
      expect(groups).toEqual(sampleSingleTestGroup);
    });

    it("should read tests from a single group()", () => {
      const sampleWithSingleGroup: Group[] = [
        {
          name: consts.GROUP_1,
          tests: [
            {
              testsFunctions: [expect.any(Function)],
              name: consts.TEST_1,
            },
          ],
        },
      ];
      const files = [path.resolve(process.cwd(), "tests/mocks/sampleWithSingleGroup")];
      const groups = reader.getTestsFromFiles(files);
      expect(groups).toEqual(sampleWithSingleGroup);
    });

    it("should read from isolated functions", () => {
      const sampleWithSingleGroup: Group[] = [
        {
          tests: [
            {
              testsFunctions: [expect.any(Function)],
            },
          ],
        },
      ];
      const files = [path.resolve(process.cwd(), "tests/mocks/onlyCommands")];
      const groups = reader.getTestsFromFiles(files);
      expect(groups).toEqual(sampleWithSingleGroup);
    });
  });
});
