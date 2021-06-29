import corde from "../../src";
import { Bot } from "../../src/api";
import { runtime } from "../../src/common/runtime";
import MockDiscord from "../mocks/mockDiscord";
import { createCordeBotWithMockedFunctions } from "../testHelper";

const mockDiscord = new MockDiscord();

describe("testing corde bot API", () => {
  it("should call runtime.bot.isLoggedIn", () => {
    const spy = jest.spyOn(runtime.bot, "isLoggedIn");
    corde.bot.isLoggedIn;
    expect(spy).toBeCalled();
  });

  it("should call runtime.bot.isLoggedIn", async () => {
    const spy = jest
      .spyOn(runtime.bot, "sendMessage")
      .mockImplementation(() => Promise.resolve(mockDiscord.message));

    jest.spyOn(runtime.bot, "isLoggedIn").mockReturnValue(true);

    await corde.bot.send("test");
    expect(spy).toBeCalledWith("test");
  });

  it("should return true for message author be corde's bot", () => {
    mockDiscord.message.author.id = runtime.bot.id;
    corde.bot.isMessageAuthor(mockDiscord.message);
  });

  it("should call joinVoiceChannel", async () => {
    const spy = jest.spyOn(runtime.bot, "joinVoiceChannel").mockImplementation(null);
    await corde.bot.joinVoiceChannel("");
    expect(spy).toBeCalledTimes(1);
  });

  it("should call leaveVoiceChannel", async () => {
    const spy = jest.spyOn(runtime.bot, "leaveVoiceChannel").mockImplementation(null);
    corde.bot.leaveVoiceChannel();
    expect(spy).toBeCalledTimes(1);
  });

  it("should call isInVoiceChannel", async () => {
    const spy = jest.spyOn(runtime.bot, "isInVoiceChannel").mockImplementation(null);
    corde.bot.isInVoiceChannel();
    expect(spy).toBeCalledTimes(1);
  });

  it("should call fetchChannel", async () => {
    const spy = jest.spyOn(runtime.bot, "fetchChannel").mockImplementation(null);
    await corde.bot.fetchChannel("1");
    expect(spy).toBeCalledTimes(1);
  });

  it("should call fetchGuild", async () => {
    const spy = jest.spyOn(runtime.bot, "fetchGuild").mockImplementation(null);
    await corde.bot.fetchGuild("1");
    expect(spy).toBeCalledTimes(1);
  });
});
