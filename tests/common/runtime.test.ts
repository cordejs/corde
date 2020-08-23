import { runtime } from "../../src/common/runtime";

import ConfigOptions from "../../src/types";

const config: ConfigOptions = {
  botPrefix: "!",
  botTestId: "123",
  channelId: "",
  cordeTestToken: "",
  guildId: "123",
  testFiles: ["123"],
  timeOut: undefined,
  botTestToken: undefined,
};

describe("Testing runtime", () => {
  it("Should set configs", () => {
    runtime.setConfigs(config);
    expect(runtime.configs).toEqual(config);
  });

  it("Should throw an error", () => {
    try {
      runtime.setConfigs(undefined);
    } catch (error) {
      expect(error instanceof Error).toBe(true);
    }
  });

  it("Should create a new instance of config", () => {
    runtime.setConfigs(config);
    expect(runtime.configs).toEqual(config);
  });

  it("should call bot.logout", () => {
    runtime.setConfigs(config);
    const spy = jest.spyOn(runtime.bot, "logout");
    runtime.logoffBot();
    expect(spy).toBeCalledTimes(1);
  });

  it("should return bot.onStart", () => {
    runtime.setConfigs(config);
    expect(runtime.onBotStart()).toEqual(runtime.bot.onStart);
  });

  it("should call bot.login", async (done) => {
    runtime.setConfigs(config);
    const spy = jest.spyOn(runtime.bot, "login");
    try {
      await runtime.loginBot("13");
    } catch (error) {
      expect(spy).toBeCalledTimes(1);
      done();
    }
  });
});
