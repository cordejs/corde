import reader from "../../src/core/reader";
import { runtime } from "../../src/common";

import path from "path";
import fs from "fs";

const conf = require("../mocks/jsconfig/corde.js");

const cwd = process.cwd();

afterEach(() => {
  runtime.configFilePath = null;
  process.chdir(cwd);
  jest.clearAllMocks();
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
});
