import { IConfigOptions } from "../../src/types";
import { Config } from "../../src/common/config";
import path from "path";

let config: Config;

beforeEach(() => {
  config = new Config();
});

describe("testing config", () => {
  it("should set props correctly", () => {
    const configExample: Partial<IConfigOptions> = {
      botPrefix: "!",
      botTestId: "id123",
      botToken: "token",
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
    expect(config.botToken).toEqual(configExample.botToken);
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

  it("should set testMatches replacing <rootDir>", () => {
    config.setConfigs({ rootDir: "../", testMatches: ["./<rootDir>/tests/**"] }, true);
    expect(config.testMatches).toEqual([path.resolve(process.cwd(), "../", "tests/**")]);
  });
});
