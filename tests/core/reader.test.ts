import fs from "fs";
import path from "path";
import { runtime, testCollector } from "../../src/common";
import reader from "../../src/core/reader";
import { Group } from "../../src/interfaces";
import consts from "../mocks/constsNames";

const conf = require("../mocks/jsconfig/corde.js");
const cwd = process.cwd();

afterEach(() => {
  runtime.configFilePath = null;
  process.chdir(cwd);
  jest.clearAllMocks();
  testCollector.cleanAll();
});

describe("reader class", () => {
  describe("when instantializing it", () => {
    it("should create the instance", () => {
      expect(reader).toBeTruthy();
    });
  });

  describe("when working with reader.loadConfig()", () => {
    describe("and has runtime.configFilePath", () => {
      it("should read configs from configFilePath", () => {
        jest.spyOn(fs, "readFileSync").mockReturnValueOnce(null);
        runtime.configFilePath = path.resolve(process.cwd(), "tests/mocks/jsconfig/corde.js");
        expect(reader.loadConfig()).toEqual(conf);
      });

      it("should throw error when path in runtime.configFilepath is invalid", () => {
        runtime.configFilePath = ".";
        expect(() => reader.loadConfig()).toThrowError();
      });

      it("should resolve path of config", () => {
        jest.spyOn(fs, "readFileSync").mockReturnValueOnce(null);
        runtime.configFilePath = "tests/mocks/jsconfig/corde.js";
        expect(reader.loadConfig()).toEqual(conf);
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
        const jsonPath = path.resolve(process.cwd(), "tests/mocks/jsonconfig/corde.json");
        const jsonConfig = JSON.parse(fs.readFileSync(jsonPath).toString());
        process.chdir(path.resolve(process.cwd(), "tests/mocks/jsonconfig"));
        expect(reader.loadConfig()).toEqual(jsonConfig);
      });

      it("should throw error when a config file (corde.json) is empty", () => {
        process.chdir(path.resolve(process.cwd(), "tests/mocks/jsconfig"));
        jest.spyOn(fs, "existsSync").mockReturnValue(true);
        jest.spyOn(JSON, "parse").mockReturnValue(null);
        expect(() => reader.loadConfig()).toThrowError();
      });

      it("should throw error if has no config file", () => {
        jest.spyOn(fs, "existsSync").mockReturnValue(false);
        expect(() => reader.loadConfig()).toThrowError();
      });
    });
  });

  describe("when working with reader.getTestsFromFiles()", () => {
    it("should throw exception when has no file", () => {
      expect(() => reader.getTestsFromFiles(null)).toThrowError();
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
