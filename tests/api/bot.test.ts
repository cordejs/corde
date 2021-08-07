import { Channel, Client, Collection } from "discord.js";
import corde from "../../src";
import { Bot } from "../../src/api";
import { runtime } from "../../src/common/runtime";
import { ICordeBot } from "../../src/types";
import MockDiscord from "../mocks/mockDiscord";
import { initCordeClientWithChannel } from "../testHelper";

const mockDiscord = new MockDiscord();

let bot: Bot;
let cordeBot: ICordeBot;

beforeEach(() => {
  const client = new Client();
  client.readyAt = new Date();
  cordeBot = initCordeClientWithChannel(mockDiscord, client);
  client.emit("ready");
  bot = new Bot(cordeBot);
});

describe("testing corde bot API", () => {
  it("should call runtime.bot.isLoggedIn", () => {
    const spy = jest.spyOn(cordeBot, "isLoggedIn");
    bot.isLoggedIn;
    expect(spy).toBeCalled();
  });

  it("should call runtime.bot.isLoggedIn", async () => {
    const spy = jest
      .spyOn(cordeBot, "sendMessage")
      .mockImplementation(() => Promise.resolve(mockDiscord.message));

    await bot.send("test");
    expect(spy).toBeCalledWith("test");
  });

  it("should return true for message author be corde's bot", () => {
    mockDiscord.message.author.id = cordeBot.id;
    bot.isMessageAuthor(mockDiscord.message);
  });

  it("should call joinVoiceChannel", async () => {
    const spy = jest.spyOn(cordeBot, "joinVoiceChannel").mockImplementation(null);
    await bot.joinVoiceChannel("");
    expect(spy).toBeCalledTimes(1);
  });

  it("should call leaveVoiceChannel", async () => {
    const spy = jest.spyOn(cordeBot, "leaveVoiceChannel").mockImplementation(null);
    bot.leaveVoiceChannel();
    expect(spy).toBeCalledTimes(1);
  });

  it("should call isInVoiceChannel", async () => {
    const spy = jest.spyOn(cordeBot, "isInVoiceChannel").mockImplementation(null);
    bot.isInVoiceChannel();
    expect(spy).toBeCalledTimes(1);
  });

  it("should call fetchChannel", async () => {
    const spy = jest.spyOn(cordeBot, "fetchChannel").mockImplementation(null);
    await bot.fetchChannel("1");
    expect(spy).toBeCalledTimes(1);
  });

  it("should call fetchGuild", async () => {
    const spy = jest.spyOn(cordeBot, "fetchGuild").mockImplementation(null);
    await bot.fetchGuild("1");
    expect(spy).toBeCalledTimes(1);
  });

  it("should get discord.js client", () => {
    expect(bot.client).toEqual(cordeBot.client);
  });

  it("should get discord.js client channels cache", () => {
    expect(bot.channels).toEqual(cordeBot.client.channels.cache.array());
  });

  it("should get discord.js client channel", () => {
    expect(bot.channel).toEqual(cordeBot.channel);
  });

  it("should get discord.js client guild", () => {
    expect(bot.guild).toEqual(cordeBot.guild);
  });

  it("should get discord.js client guilds", () => {
    expect(bot.guilds).toEqual(cordeBot.client.guilds.cache.array());
  });

  it("should get discord.js client members", () => {
    expect(bot.guildMembers).toEqual(cordeBot.guild.members.cache.array());
  });

  it("should get discord.js client roles", () => {
    expect(bot.roles).toEqual(cordeBot.guild.roles.cache.array());
  });

  it("should get only textChannels", () => {
    expect(bot.getOnlyTextChannels()).toHaveLength(0);
    cordeBot.client.channels.cache = mockDiscord.textChannelCollection;
    expect(bot.getOnlyTextChannels().length).not.toBe(0);
  });

  describe("testing fetchRole", () => {
    it("should fail due to bot not logged", async () => {
      jest.spyOn(cordeBot, "isLoggedIn").mockReturnValueOnce(false);
      try {
        await bot.fetchRole("1");
        fail();
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });

    it("should fetchRole return undefined based on roleId", async () => {
      const spy = jest.spyOn(cordeBot.guild.roles, "fetch").mockImplementation(null);
      const response = await bot.fetchRole("1");
      expect(response).toEqual(undefined);
      expect(spy).toBeCalled();
    });

    it("should get based on roleId", async () => {
      // Argument of type 'Role' is not assignable to parameter of type 'RoleManager | Promise<RoleManager>'.
      // Type 'Role' is missing the following properties from type 'RoleManager': everyone, highest, create, fetch, and 6 more.
      const spy = jest
        .spyOn(cordeBot.guild.roles, "fetch")
        .mockResolvedValue(mockDiscord.role as any);
      const response = await bot.fetchRole("1");
      expect(response).toEqual(mockDiscord.role);
      expect(spy).toBeCalled();
    });

    it("should get by invalid guildId without fetch", async () => {
      cordeBot.client.guilds.cache = mockDiscord.guildCollection;
      const spy = jest
        .spyOn(cordeBot.guild.roles, "fetch")
        .mockResolvedValue(mockDiscord.role as any);
      const response = await bot.fetchRole("1", mockDiscord.guildCollection.first().id);
      expect(response).toEqual(mockDiscord.role);
      expect(spy).toBeCalled();
    });

    it("should get by invalid guildId with fetch", async () => {
      cordeBot.client.guilds.cache = mockDiscord.guildCollection;
      const spy = jest
        .spyOn(cordeBot.guild.roles, "fetch")
        .mockResolvedValue(mockDiscord.role as any);
      const spyGuildFetch = jest
        .spyOn(cordeBot.client.guilds, "fetch")
        .mockResolvedValue(mockDiscord.guild as any);
      const response = await bot.fetchRole("1", mockDiscord.guildCollection.first().id, true);
      expect(response).toEqual(mockDiscord.role);
      expect(spy).toBeCalled();
      expect(spyGuildFetch).toBeCalled();
    });
  });
});
