import { MessageOptions } from "discord.js";
import { BotAPI } from "../../src/api";
import { ICordeBot } from "../../src/types";
import { collectionToArray } from "../../src/utils/collectionToArray";
import MockDiscord from "../mocks/mockDiscord";
import { initCordeClientWithChannel, replaceCollection } from "../testHelper";

const mockDiscord = new MockDiscord();

let bot: BotAPI;
let cordeBot: ICordeBot;

beforeEach(() => {
  const client = mockDiscord.mockClient();
  client.readyAt = new Date();
  cordeBot = initCordeClientWithChannel(mockDiscord, client);
  client.emit("ready", client);
  bot = new BotAPI(cordeBot);
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

  it("should throw error due to invalid message", async () => {
    try {
      // @ts-ignore
      await bot.send(undefined);
      fail();
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it("should send a embed message", async () => {
    const spy = jest
      .spyOn(cordeBot, "sendMessage")
      .mockImplementation(() => Promise.resolve(mockDiscord.message));

    const embed: MessageOptions = {};

    await bot.send(embed);
    expect(spy).toBeCalled();
  });

  it("should return true for message author be corde's bot", () => {
    mockDiscord.message.author.id = cordeBot.id ?? "";
    bot.isMessageAuthor(mockDiscord.message);
  });

  it("should call joinVoiceChannel", async () => {
    const spy = jest
      .spyOn(cordeBot, "joinVoiceChannel")
      // @ts-ignore
      .mockImplementation(null);
    await bot.joinVoiceChannel("");
    expect(spy).toBeCalledTimes(1);
  });

  it("should call leaveVoiceChannel", async () => {
    const spy = jest
      .spyOn(cordeBot, "leaveVoiceChannel")
      // @ts-ignore
      .mockImplementation(null);
    bot.leaveVoiceChannel();
    expect(spy).toBeCalledTimes(1);
  });

  it("should call isInVoiceChannel", async () => {
    const spy = jest
      .spyOn(cordeBot, "isInVoiceChannel")
      // @ts-ignore
      .mockImplementation(null);
    bot.isInVoiceChannel();
    expect(spy).toBeCalledTimes(1);
  });

  it("should call fetchChannel", async () => {
    const spy = jest
      .spyOn(cordeBot, "fetchChannel")
      // @ts-ignore
      .mockImplementation(null);
    await bot.fetchChannel("1");
    expect(spy).toBeCalledTimes(1);
  });

  it("should call fetchGuild", async () => {
    const spy = jest
      .spyOn(cordeBot, "fetchGuild")
      // @ts-ignore
      .mockImplementation(null);
    await bot.fetchGuild("1");
    expect(spy).toBeCalledTimes(1);
  });

  it("should get discord.js client", () => {
    expect(bot.client).toEqual(cordeBot.client);
  });

  describe("testing bot.channels", () => {
    it("should get discord.js client channels cache", () => {
      expect(bot.channels).toEqual(collectionToArray(cordeBot.client.channels.cache));
    });

    it("should throw error due to not logged bot", () => {
      jest.spyOn(cordeBot, "isLoggedIn").mockReturnValueOnce(false);
      expect(() => bot.channels).toThrowError();
    });
  });

  describe("testing bot.channel", () => {
    it("should throw error due to not logged bot", () => {
      jest.spyOn(cordeBot, "isLoggedIn").mockReturnValueOnce(false);
      expect(() => bot.channel).toThrowError();
    });

    it("should get discord.js client channel", () => {
      expect(bot.channel).toEqual(cordeBot.channel);
    });
  });

  describe("testing bot.guild", () => {
    it("should throw error due to not logged bot", () => {
      jest.spyOn(cordeBot, "isLoggedIn").mockReturnValueOnce(false);
      expect(() => bot.guild).toThrowError();
    });

    it("should get discord.js client guild", () => {
      expect(bot.guild).toEqual(cordeBot.guild);
    });
  });

  describe("testing bot.guilds", () => {
    it("should throw error due to not logged bot", () => {
      jest.spyOn(cordeBot, "isLoggedIn").mockReturnValueOnce(false);
      expect(() => bot.guilds).toThrowError();
    });

    it("should get discord.js client guilds", () => {
      expect(bot.guilds).toEqual(collectionToArray(cordeBot.client.guilds.cache));
    });
  });

  describe("testing bot.guildMembers", () => {
    it("should throw error due to not logged bot", () => {
      jest.spyOn(cordeBot, "isLoggedIn").mockReturnValueOnce(false);
      expect(() => bot.guildMembers).toThrowError();
    });
    it("should get discord.js client members", () => {
      expect(bot.guildMembers).toEqual(collectionToArray(cordeBot.guild.members.cache));
    });
  });

  describe("testing bot.roles", () => {
    it("should throw error due to not logged bot", () => {
      jest.spyOn(cordeBot, "isLoggedIn").mockReturnValueOnce(false);
      expect(() => bot.roles).toThrowError();
    });

    it("should get discord.js client roles", () => {
      expect(bot.roles).toEqual(collectionToArray(cordeBot.guild.roles.cache));
    });
  });

  it("should get only textChannels", () => {
    expect(bot.getOnlyTextChannels()).toHaveLength(0);
    // @ts-expect-error
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
      const spy = jest
        .spyOn(cordeBot.guild.roles, "fetch")
        // @ts-expect-error
        .mockImplementation(null);
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
      // @ts-expect-error
      cordeBot.client.guilds.cache = mockDiscord.guildCollection;
      const spy = jest
        .spyOn(cordeBot.guild.roles, "fetch")
        .mockResolvedValue(mockDiscord.role as any);
      const response = await bot.fetchRole("1", mockDiscord.guildCollection.first()?.id ?? "");
      expect(response).toEqual(mockDiscord.role);
      expect(spy).toBeCalled();
    });

    it("should get by invalid guildId with fetch", async () => {
      replaceCollection(mockDiscord.guildCollection, cordeBot.client.guilds.cache);

      const spy = jest
        .spyOn(cordeBot.guild.roles, "fetch")
        .mockResolvedValue(mockDiscord.role as any);

      const spyGuildFetch = jest
        .spyOn(cordeBot.client.guilds, "fetch")
        .mockResolvedValue(mockDiscord.guild as any);

      const response = await bot.fetchRole(
        "1",
        mockDiscord.guildCollection.first()?.id ?? "",
        true,
      );
      expect(response).toEqual(mockDiscord.role);
      expect(spy).toBeCalled();
      expect(spyGuildFetch).toBeCalled();
    });

    it("should get by invalid guildId, not finding the guild", async () => {
      // @ts-expect-error
      cordeBot.client.guilds.cache = mockDiscord.guildCollection;
      jest.spyOn(cordeBot.guild.roles, "fetch").mockResolvedValue(mockDiscord.role as any);
      const spyGuildFetch = jest
        .spyOn(cordeBot.client.guilds, "fetch")
        // @ts-expect-error
        .mockResolvedValue(undefined);
      const response = await bot.fetchRole("1", "1231", true);
      expect(response).toEqual(undefined);
      expect(spyGuildFetch).toBeCalled();
    });
  });

  it("should get voiceState", () => {
    expect(bot.voiceState).toEqual(cordeBot.voiceConnection);
  });

  describe("testing getChannel", () => {
    it("should get channel defined in configs", () => {
      // @ts-expect-error
      cordeBot.client.channels.cache = mockDiscord.textChannelCollection;
      expect(bot.getChannel()).toEqual(cordeBot.channel);
    });

    it("should return undefined due to no channel found in cache", () => {
      // @ts-expect-error
      cordeBot.client.channels.cache = mockDiscord.textChannelCollection;
      expect(bot.getChannel({ id: "321foo" })).toEqual(undefined);
    });

    it("should get channel by id", () => {
      // @ts-expect-error
      cordeBot.client.channels.cache = mockDiscord.textChannelCollection;
      const channel = mockDiscord.textChannelCollection.first();
      expect(bot.getChannel(channel?.id ?? "")).toEqual(channel);
    });

    it("should get channel by id inside object", () => {
      // @ts-expect-error
      cordeBot.client.channels.cache = mockDiscord.textChannelCollection;
      const channel = mockDiscord.textChannelCollection.first();
      // @ts-expect-error
      expect(bot.getChannel({ id: channel.id })).toEqual(channel);
    });

    it("should get channel by name inside object", () => {
      replaceCollection(mockDiscord.textChannelCollection, cordeBot.client.channels.cache);
      const channel = mockDiscord.textChannelCollection.first();
      // @ts-expect-error
      expect(bot.getChannel({ name: channel.name })).toEqual(channel);
    });

    it("should return undefined", () => {
      replaceCollection(mockDiscord.textChannelCollection, cordeBot.client.channels.cache);
      expect(bot.getChannel({ id: "aaaa" })).toEqual(undefined);
    });
  });

  describe("testing getGuild", () => {
    it("should get guild defined in configs", () => {
      replaceCollection(mockDiscord.guildCollection, cordeBot.client.guilds.cache);
      expect(bot.getGuild()).toEqual(cordeBot.guild);
    });

    it("should get guild by id", () => {
      replaceCollection(mockDiscord.guildCollection, cordeBot.client.guilds.cache);
      const guild = mockDiscord.guildCollection.first();
      // @ts-expect-error
      expect(bot.getGuild(guild.id)).toEqual(guild);
    });

    it("should get guild by id inside object", () => {
      replaceCollection(mockDiscord.guildCollection, cordeBot.client.guilds.cache);
      const guild = mockDiscord.guildCollection.first();
      // @ts-expect-error
      expect(bot.getGuild({ id: guild.id })).toEqual(guild);
    });

    it("should get guild by name inside object", () => {
      replaceCollection(mockDiscord.guildCollection, cordeBot.client.guilds.cache);
      const guild = mockDiscord.guildCollection.first();
      // @ts-expect-error
      expect(bot.getGuild({ name: guild.name })).toEqual(guild);
    });

    it("should return undefined", () => {
      replaceCollection(mockDiscord.guildCollection, cordeBot.client.guilds.cache);
      expect(bot.getGuild({ id: "aaaa" })).toEqual(undefined);
    });
  });

  describe("testing createRole", () => {
    it("should call roleManager to create a new role passing object", async () => {
      const spy = jest
        .spyOn(cordeBot.roleManager, "create")
        // @ts-expect-error
        .mockImplementation(null);
      await bot.createRole({});
      expect(spy).toBeCalled();
    });

    it("should call roleManager to create a new role passing string", async () => {
      const spy = jest
        .spyOn(cordeBot.roleManager, "create")
        // @ts-expect-error
        .mockImplementation(null);
      await bot.createRole("aa");
      expect(spy).toBeCalled();
    });

    it("should throw exception due to invalid name", async () => {
      try {
        await bot.createRole(undefined);
        fail();
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });

    it("should throw exception due to bot not logged in", async () => {
      jest.spyOn(cordeBot, "isLoggedIn").mockReturnValueOnce(false);
      try {
        await bot.createRole({});
        fail();
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });

    it("should call guildManager to create a new guild", async () => {
      const spy = jest
        .spyOn(cordeBot.roleManager, "create")
        // @ts-expect-error
        .mockImplementation(null);
      await bot.createRole({ name: "aaa" });
      expect(spy).toBeCalled();
    });
  });

  describe("testing createGuild", () => {
    it("should call guildManager to create a new role passing object", async () => {
      const spy = jest
        .spyOn(cordeBot.client.guilds, "create")
        // @ts-expect-error
        .mockImplementation(null);
      await bot.createGuild({
        name: "test",
      });
      expect(spy).toBeCalled();
    });

    it("should call guildManager to create a new role passing string", async () => {
      const spy = jest
        .spyOn(cordeBot.client.guilds, "create")
        // @ts-expect-error
        .mockImplementation(null);
      await bot.createGuild("aa");
      expect(spy).toBeCalled();
    });

    it("should throw exception due to invalid name", async () => {
      try {
        // @ts-expect-error
        await bot.createGuild(undefined);
        fail();
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });

    it("should throw exception due to bot not logged in", async () => {
      jest.spyOn(cordeBot, "isLoggedIn").mockReturnValueOnce(false);
      try {
        await bot.createGuild({
          name: "test",
        });
        fail();
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });

    it("should call guildManager to create a new guild", async () => {
      const spy = jest
        .spyOn(cordeBot.client.guilds, "create")
        // @ts-expect-error
        .mockImplementation(null);
      await bot.createGuild({ name: "aaa" });
      expect(spy).toBeCalled();
    });
  });

  describe("testing createChannel", () => {
    it("should throw exception due to bot not logged in", async () => {
      jest.spyOn(cordeBot, "isLoggedIn").mockReturnValueOnce(false);
      try {
        await bot.createChannel("");
        fail();
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });

    it("should call guild.channels.create with a string value", async () => {
      const spy = jest
        .spyOn(cordeBot.guild.channels, "create")
        // @ts-expect-error
        .mockImplementation(null);
      await bot.createChannel("aaa");
      expect(spy).toBeCalled();
    });

    it("should call guild.channels.create with object", async () => {
      const spy = jest
        .spyOn(cordeBot.guild.channels, "create")
        // @ts-expect-error
        .mockImplementation(null);
      await bot.createChannel({ name: "aaa" });
      expect(spy).toBeCalled();
    });
  });

  describe("testing createVoiceChannel", () => {
    it("should call guild.channels.create passing type = 'voice' (using string name)", async () => {
      jest.spyOn(cordeBot, "isLoggedIn").mockReturnValueOnce(false);
      try {
        await bot.createVoiceChannel("");
        fail();
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });

    it("should call guild.channels.create passing type = 'voice' (using string name)", async () => {
      const spy = jest
        .spyOn(cordeBot.guild.channels, "create")
        // @ts-expect-error
        .mockImplementation(null);
      const name = "aaa";
      await bot.createVoiceChannel("aaa");
      expect(spy).toBeCalledWith(name, { type: "GUILD_VOICE" });
    });

    it("should call guild.channels.create passing type = 'voice' (using object name)", async () => {
      const spy = jest
        .spyOn(cordeBot.guild.channels, "create")
        // @ts-expect-error
        .mockImplementation(null);
      const name = "aaa";
      await bot.createVoiceChannel({ name });
      expect(spy).toBeCalledWith(name, { name, type: "GUILD_VOICE" });
    });
  });

  describe("testing createTextChannel", () => {
    it("should call guild.channels.create passing type = 'text' (using string name)", async () => {
      jest.spyOn(cordeBot, "isLoggedIn").mockReturnValueOnce(false);
      try {
        await bot.createTextChannel("");
        fail();
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });

    it("should call guild.channels.create passing type = 'text' (using string name)", async () => {
      const spy = jest
        .spyOn(cordeBot.guild.channels, "create")
        // @ts-expect-error
        .mockImplementation(null);
      const name = "aaa";
      await bot.createTextChannel("aaa");
      expect(spy).toBeCalledWith(name, { type: "GUILD_TEXT" });
    });

    it("should call guild.channels.create passing type = 'text' (using object name)", async () => {
      const spy = jest
        .spyOn(cordeBot.guild.channels, "create")
        // @ts-expect-error
        .mockImplementation(null);
      const name = "aaa";
      await bot.createTextChannel({ name });
      expect(spy).toBeCalledWith(name, { name, type: "GUILD_TEXT" });
    });
  });

  describe("testing createCategoryChannel", () => {
    it("should call guild.channels.create passing type = 'text' (using string name)", async () => {
      jest.spyOn(cordeBot, "isLoggedIn").mockReturnValueOnce(false);
      try {
        await bot.createCategoryChannel("");
        fail();
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });

    it("should call guild.channels.create passing type = 'category' (using string name)", async () => {
      const spy = jest
        .spyOn(cordeBot.guild.channels, "create")
        // @ts-expect-error
        .mockImplementation(null);
      const name = "aaa";
      await bot.createCategoryChannel("aaa");
      expect(spy).toBeCalledWith(name, { type: "GUILD_CATEGORY" });
    });

    it("should call guild.channels.create passing type = 'category' (using object name)", async () => {
      const spy = jest
        .spyOn(cordeBot.guild.channels, "create")
        // @ts-expect-error
        .mockImplementation(null);
      const name = "aaa";
      await bot.createCategoryChannel({ name });
      expect(spy).toBeCalledWith(name, { name, type: "GUILD_CATEGORY" });
    });
  });

  describe("testing getRole", () => {
    it("should throw error due to not logged bot", () => {
      jest.spyOn(cordeBot, "isLoggedIn").mockReturnValueOnce(false);
      try {
        bot.getRole("");
        fail();
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });

    it("should get role from cache using id (string)", () => {
      cordeBot.guild.roles = mockDiscord.roleManager;
      const testRole = mockDiscord.roleManager.cache.first();
      // @ts-expect-error
      const role = bot.getRole(testRole.id);
      expect(role).toEqual(testRole);
    });

    it("should get role from cache using id (in object)", () => {
      const testRole = mockDiscord.roleManager.cache.first();
      const role = bot.getRole({ id: testRole?.id });
      expect(role).toEqual(testRole);
    });

    it("should get role from cache using name (in object)", () => {
      const testRole = mockDiscord.roleManager.cache.first();
      const role = bot.getRole({ name: testRole?.name });
      expect(role).toEqual(testRole);
    });
  });
});
