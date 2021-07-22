import { IConfigOptions } from "../../src/types";
import { Config } from "../../src/common/config";
import { DEFAULT_TEST_TIMEOUT } from "../../src/consts";
import { config } from "process";
import path from "path";

describe("testing config", () => {
  it("should set all values to configs", () => {
    const configOptions: Partial<IConfigOptions> = {
      botPrefix: "!",
      botTestId: "123",
      guildId: "123",
      testMatches: ["123"],
      timeout: DEFAULT_TEST_TIMEOUT,
    };

    const config = new Config();
    config.setConfigs(configOptions);
    expect(config).toEqual({ ...configOptions, timeout: DEFAULT_TEST_TIMEOUT });
  });

  it("should not allow define testMatches as object {}", () => {
    const config = new Config();
    // @ts-ignore
    config.setConfigs({ testMatches: {} });
    expect(config.testMatches).toEqual([]);
  });

  it("should force update settings", () => {
    const updatadedConfig: IConfigOptions = {
      botPrefix: "+",
      botTestId: "321",
      channelId: "111",
      cordeBotToken: "333",
      guildId: "11111",
      testMatches: ["321", "32121"],
      timeout: 1222,
      botToken: "lacjxlakjs12312",
    };

    const config = new Config();
    config.setConfigs({
      botPrefix: "!",
      botTestId: "123",
      channelId: "",
      cordeBotToken: "",
      guildId: "123",
      testMatches: ["123"],
      timeout: undefined,
      botToken: undefined,
    });
    config.setConfigs(updatadedConfig, true);
    expect(config).toEqual(updatadedConfig);
  });

  it.only("should set prop to resolve with <rootDir>", () => {
    const config = new Config();
    config.setConfigs(
      {
        rootDir: "../",
        project: "<rootDir>/tsconfig.json",
      },
      true,
    );
    expect(config.rootDir).toEqual(path.resolve(process.cwd(), "../"));
    expect(config.project).toEqual(path.resolve(process.cwd(), "../", "tsconfig.json"));
  });
});
