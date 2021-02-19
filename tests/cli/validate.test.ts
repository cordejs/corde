import { ConfigOptions } from "../../src/types";
import { validate } from "../../src/cli/validate";

let configs: ConfigOptions;

beforeEach(() => {
  configs = {
    botPrefix: "!",
    botTestId: "12122216892126544",
    channelId: "12316351316252291",
    cordeTestToken: "5e8862cd73694287ff341e75c95e3c6a",
    guildId: "21685198465498",
    testFiles: ["./tests/dirTestFiles"],
    botTestToken: "1f77a63e0f60f3bf420edf67bfa3915b",
    timeOut: 5000,
  };
});

describe("Testing validate CLI function", () => {
  it("Should return false due to no botPrefix", () => {
    configs.botPrefix = "";
    expect(() => validate(configs)).toThrow();
  });

  it("Should return false due to no botTestId", () => {
    configs.botTestId = "";
    expect(() => validate(configs)).toThrow(Error);
  });

  it("Should return false due to no channelId", () => {
    configs.channelId = "";
    expect(() => validate(configs)).toThrow(Error);
  });

  it("Should return false due to no cordeTestToken", () => {
    configs.cordeTestToken = "";
    expect(() => validate(configs)).toThrow(Error);
  });

  it("Should return false due to no guildId", () => {
    configs.guildId = "";
    expect(() => validate(configs)).toThrow(Error);
  });

  it("Should return false due to no testFiles", () => {
    configs.testFiles = [];
    expect(() => validate(configs)).toThrow(Error);
  });

  it("Should return false due invlaid dir", () => {
    configs.testFiles = ["./tests/dirTestF"];
    expect(() => validate(configs)).toThrow(Error);
  });

  it("Should not throw error due to existance of file", () => {
    configs.testFiles = ["./tests/dirTestFiles/testFile.test.ts"];
    expect(() => validate(configs)).not.toThrow(Error);
  });

  it("Should throw error due to inexistance of file", () => {
    configs.testFiles = ["./tests/dirTestFiles/testF.test.ts"];
    expect(() => validate(configs)).toThrow(Error);
  });

  it("Should return true due all configs presence", () => {
    expect(() => validate(configs)).not.toThrow(Error);
  });

  it("Should throw exception due to null parameter", () => {
    expect(() => validate(null)).toThrow(Error);
  });

  it("Should throw exception due to null parameter", () => {
    configs.guildId = "";
    configs.testFiles = ["./tests/dirTestFiles/testF.test.ts"];
    expect(() => validate(configs)).toThrow(Error);
  });
});
