import reader from "../../src/core/reader";
import {
  renameConfigFilesToTempNames,
  renameConfigTempFileNamesToNormal,
  normalJsPath,
} from "../testHelper";
import { runtime } from "../../src/common";

const conf = require("../../corde");
import fs from "fs";
import path from "path";

afterEach(() => {
  runtime.configFilePath = null;
  renameConfigTempFileNamesToNormal();
});

describe("Testing reader", () => {
  it("Instance must exist", () => {
    expect(reader).toBeTruthy();
  });

  it("Should read configs from configFilePath", () => {
    runtime.configFilePath = normalJsPath;
    expect(reader.loadConfig()).toEqual(conf);
  });

  it("Must read configs from corde.js", () => {
    expect(reader.loadConfig()).toEqual(conf);
  });

  it("Must read configs from corde.ts", () => {
    // The file used for general tests is corde.js so, we rename it to __code.js to test other files
    renameConfigFilesToTempNames();
    const file = path.resolve(process.cwd(), "corde.ts");
    try {
      fs.writeFileSync(file, `module.exports = ${JSON.stringify(conf)}`);
    } catch (error) {}
    expect(reader.loadConfig()).toEqual(conf);
    fs.unlinkSync(file);
  });

  it("Must read configs from corde.json", () => {
    // The file used for general tests is corde.js so, we rename it to __code.js to test other files
    renameConfigFilesToTempNames();
    const file = path.resolve(process.cwd(), "corde.json");
    fs.writeFileSync(file, JSON.stringify(conf));
    expect(reader.loadConfig()).toEqual(conf);
    fs.unlinkSync(file);
  });

  it("Should throw error due to path not found", () => {
    renameConfigFilesToTempNames();
    runtime.configFilePath = ".";
    expect(() => reader.loadConfig()).toThrowError();
  });

  it("Should throw error due to empty object config", () => {
    renameConfigFilesToTempNames();
    const file = path.resolve(process.cwd(), "corde.json");
    fs.writeFileSync(file, "");
    expect(() => reader.loadConfig()).toThrowError();
    fs.unlinkSync(file);
  });

  it("Should throw error due to no file", () => {
    renameConfigFilesToTempNames();
    const cwd = process.cwd();
    process.chdir(".");
    expect(() => reader.loadConfig()).toThrowError();
    process.chdir(cwd);
  });
});
