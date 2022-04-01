import runtime from "../../src/core/runtime";
import { DEFAULT_TEST_TIMEOUT } from "../../src/const";

const config: corde.IConfigOptions = {
  botPrefix: "!",
  botTestId: "123",
  channelId: "1241241",
  cordeBotToken: "321",
  guildId: "123",
  testMatches: ["123"],
  timeout: DEFAULT_TEST_TIMEOUT,
};

describe("Testing runtime", () => {
  it("Should throw an error", () => {
    try {
      // @ts-ignore
      runtime.setConfigs(undefined);
    } catch (error) {
      expect(error instanceof Error).toBe(true);
    }
  });

  it("should get cordeBotToken", () => {
    runtime.setConfigs(config);
    expect(runtime.cordeBotToken).toBe(config.cordeBotToken);
  });

  it("should get botTestId", () => {
    runtime.setConfigs(config);
    expect(runtime.botTestId).toBe(config.botTestId);
  });

  it("should get channelId", () => {
    runtime.setConfigs(config);
    expect(runtime.channelId).toBe(config.channelId);
  });

  it("should get guildId", () => {
    runtime.setConfigs(config);
    expect(runtime.guildId).toBe(config.guildId);
  });

  it("should get timeout", () => {
    runtime.setConfigs(config);
    expect(runtime.timeout).toBe(config.timeout);
  });

  it("should get botPrefix", () => {
    runtime.setConfigs(config);
    expect(runtime.botPrefix).toBe(config.botPrefix);
  });
});
