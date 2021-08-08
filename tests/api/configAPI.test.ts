import { ConfigAPI } from "../../src/api";
import { DEFAULT_CONFIG } from "../../src/consts";
import { IConfigOptions } from "../../src/types";

let configAPI: ConfigAPI;
let config: IConfigOptions;

beforeEach(() => {
  config = DEFAULT_CONFIG;
  configAPI = new ConfigAPI(config);
  configAPI.extensions;
});

describe("testing public configs api", () => {
  it("should get value from cordeBotToken", () => {
    expect(configAPI.cordeBotToken).toEqual(config.cordeBotToken);
  });

  it("should get value from botTestId", () => {
    expect(configAPI.botTestId).toEqual(config.botTestId);
  });

  it("should get value from botToken", () => {
    expect(configAPI.botToken).toEqual(config.botToken);
  });

  it("should get value from channelId", () => {
    expect(configAPI.channelId).toEqual(config.channelId);
  });

  it("should get value from guildId", () => {
    expect(configAPI.guildId).toEqual(config.guildId);
  });

  it("should get value from timeout", () => {
    expect(configAPI.timeout).toEqual(config.timeout);
  });

  it("should get value from botPrefix", () => {
    expect(configAPI.botPrefix).toEqual(config.botPrefix);
  });

  it("should get value from testMatches", () => {
    expect(configAPI.testMatches).toEqual(config.testMatches);
  });

  it("changes in testMatches value should not alter original values", () => {
    configAPI.testMatches.push("aaaa");
    expect(configAPI.testMatches).toEqual(config.testMatches);
  });

  it("changes in modulePathIgnorePatterns value should not alter original values", () => {
    configAPI.modulePathIgnorePatterns.push("aaaa");
    expect(configAPI.modulePathIgnorePatterns).toEqual(config.modulePathIgnorePatterns);
  });

  it("should get value from modulePathIgnorePatterns", () => {
    expect(configAPI.modulePathIgnorePatterns).toEqual(config.modulePathIgnorePatterns);
  });

  it("should get value from project", () => {
    expect(configAPI.project).toEqual(config.project);
  });

  it("should get value from exitOnFileReadingError", () => {
    expect(configAPI.exitOnFileReadingError).toEqual(config.exitOnFileReadingError);
  });

  it("changes in extensions value should not alter original values", () => {
    configAPI.extensions.push("aaaa");
    expect(configAPI.extensions).toEqual(config.extensions);
  });

  it("should get value from extensions", () => {
    expect(configAPI.extensions).toEqual(config.extensions);
  });

  it("should get value from rootDir", () => {
    expect(configAPI.rootDir).toEqual(config.rootDir);
  });
});
