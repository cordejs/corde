import reader from "../../src/core/reader";
import {
  renameConfigFilesToTempNames,
  renameConfigTempFileNamesToNormal,
  normalJsPath,
} from "../testHelper";
import { runtime } from "../../src/common";

const conf = require("../../corde");
import path from "path";
import { FsMockUtils } from "../mockUtils/fs";

import fs from "fs";
jest.mock("fs");

afterEach(() => {
  runtime.configFilePath = null;
});

describe("Testing reader", () => {
  it("Instance must exist", () => {
    expect(reader).toBeTruthy();
  });

  it("Should read configs from configFilePath", () => {
    fs.readFileSync = jest.fn();
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    runtime.configFilePath = path.resolve(process.cwd(), "tests/mocks/corde.js");
    expect(reader.loadConfig()).toEqual(conf);
  });

  it("Must read configs from corde.js", () => {
    jest.unmock("fs");
    (fs.readFileSync as jest.Mock).mockReturnValueOnce(JSON.stringify({ obj: 1 }));
    expect(reader.loadConfig()).toEqual(conf);
  });

  // it("Must read configs from corde.ts", () => {
  //   // The file used for general tests is corde.js so, we rename it to __code.js to test other files
  //   renameConfigFilesToTempNames();
  //   const file = path.resolve(process.cwd(), "corde.ts");
  //   try {
  //     fs.writeFileSync(file, `module.exports = ${JSON.stringify(conf)}`);
  //   } catch (error) {}
  //   expect(reader.loadConfig()).toEqual(conf);
  //   fs.unlinkSync(file);
  // });

  // it("Must read configs from corde.json", () => {
  //   // The file used for general tests is corde.js so, we rename it to __code.js to test other files
  //   renameConfigFilesToTempNames();
  //   const file = path.resolve(process.cwd(), "corde.json");
  //   fs.writeFileSync(file, JSON.stringify(conf));
  //   expect(reader.loadConfig()).toEqual(conf);
  //   fs.unlinkSync(file);
  // });

  // it("Should throw error due to path not found", () => {
  //   renameConfigFilesToTempNames();
  //   runtime.configFilePath = ".";
  //   expect(() => reader.loadConfig()).toThrowError();
  // });

  // it("Should throw error due to empty object config", () => {
  //   renameConfigFilesToTempNames();
  //   const file = path.resolve(process.cwd(), "corde.json");
  //   fs.writeFileSync(file, "");
  //   expect(() => reader.loadConfig()).toThrowError();
  //   fs.unlinkSync(file);
  // });

  // it("Should throw error due to no file", () => {
  //   fsMock.mockReadFileSync();
  //   expect(() => reader.loadConfig()).toThrowError();
  // });
});
