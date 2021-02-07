import ConfigOptions from "../../src/types";
import { Config } from "../../src/common";
import { DEFAULT_TEST_TIMEOUT } from "../../src/consts";

describe("testing config", () => {
  it("should set all values to configs", () => {
    const configOptions: ConfigOptions = {
      botPrefix: "!",
      botTestId: "123",
      channelId: "",
      cordeTestToken: "",
      guildId: "123",
      testFiles: ["123"],
      timeOut: undefined,
      botTestToken: undefined,
    };

    const config = new Config();
    config.setNoFiledConfigsOptions(configOptions);
    expect(config).toEqual({ ...configOptions, timeOut: DEFAULT_TEST_TIMEOUT });
  });
});
