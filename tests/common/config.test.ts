import { ConfigOptions } from "../../src/types";
import { Config } from "../../src/common/config";
import { DEFAULT_TEST_TIMEOUT } from "../../src/consts";

describe("testing config", () => {
  it("should set all values to configs", () => {
    const configOptions: Partial<ConfigOptions> = {
      botPrefix: "!",
      botTestId: "123",
      guildId: "123",
      testFiles: ["123"],
      timeout: DEFAULT_TEST_TIMEOUT,
    };

    const config = new Config();
    config.setConfigs(configOptions);
    expect(config).toEqual({ ...configOptions, timeout: DEFAULT_TEST_TIMEOUT });
  });

  it("should force update settings", () => {
    const updatadedConfig: ConfigOptions = {
      botPrefix: "+",
      botTestId: "321",
      channelId: "111",
      cordeTestToken: "333",
      guildId: "11111",
      testFiles: ["321", "32121"],
      timeout: 1222,
      botTestToken: "lacjxlakjs12312",
    };

    const config = new Config();
    config.setConfigs({
      botPrefix: "!",
      botTestId: "123",
      channelId: "",
      cordeTestToken: "",
      guildId: "123",
      testFiles: ["123"],
      timeout: undefined,
      botTestToken: undefined,
    });
    config.setConfigs(updatadedConfig, true);
    expect(config).toEqual(updatadedConfig);
  });
});
