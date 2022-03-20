/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../../src/global/types.d.ts" />

import { Config } from "../../src/core/Config";
import path from "path";

let config: Config;

beforeEach(() => {
  config = new Config();
});

describe("testing config", () => {
  it("should convert numeric value to number when setting", () => {
    const timeout: any = "111";
    config.setConfigs({ timeout }, true);
    expect(config.timeout).toEqual(111);
  });

  it("should set props correctly", () => {
    const configExample: Partial<corde.IConfigOptions> = {
      botPrefix: "!",
      botTestId: "id123",
      channelId: "1231321",
      cordeBotToken: "121241414141",
      exitOnFileReadingError: false,
      extensions: [".js"],
      guildId: "124124123124",
      modulePathIgnorePatterns: [".*\\.test\\.ts$"],
      testMatches: ["./tests/**"],
      timeout: 1000,
    };

    config.setConfigs(
      {
        rootDir: "../",
        project: "<rootDir>/tsconfig.json",
        ...configExample,
      },
      true,
    );
    expect(config.botPrefix).toEqual(configExample.botPrefix);
    expect(config.botPrefix).toEqual(configExample.botPrefix);
    expect(config.channelId).toEqual(configExample.channelId);

    expect(config.cordeBotToken).toEqual(configExample.cordeBotToken);
    expect(config.exitOnFileReadingError).toEqual(configExample.exitOnFileReadingError);
    expect(config.extensions).toEqual(configExample.extensions);
    expect(config.guildId).toEqual(configExample.guildId);

    expect(config.modulePathIgnorePatterns).toEqual(configExample.modulePathIgnorePatterns);
    expect(config.testMatches).toEqual(configExample.testMatches);
    expect(config.timeout).toEqual(configExample.timeout);
    expect(config.rootDir).toEqual(path.resolve(process.cwd(), "../"));
    expect(config.project).toEqual(path.resolve(process.cwd(), "../", "tsconfig.json"));
  });

  it("should remove empty values from testMatches array", () => {
    config.setConfigs({ testMatches: ["./tests/**", ""] }, true);
    expect(config.testMatches).toEqual(["./tests/**"]);
  });

  it("should remove duplicates", () => {
    config.setConfigs({ testMatches: ["./tests/**", "./tests/**"] }, true);
    expect(config.testMatches).toEqual(["./tests/**"]);
  });

  it("should remove duplicates", () => {
    config.setConfigs({ testMatches: ["./tests/**", "./tests/**"] }, true);
    expect(config.testMatches).toEqual(["./tests/**"]);
  });

  it("should remove duplicates", () => {
    config.setConfigs({ modulePathIgnorePatterns: ["./tests/**", ""] }, true);
    expect(config.modulePathIgnorePatterns).toEqual(["./tests/**"]);
  });

  it("should remove duplicates", () => {
    config.setConfigs({ modulePathIgnorePatterns: ["./tests/**", "./tests/**"] }, true);
    expect(config.modulePathIgnorePatterns).toEqual(["./tests/**"]);
  });
});
