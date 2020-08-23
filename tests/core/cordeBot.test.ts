import { testCollector } from "../../src/common/testColletor";
import { toReturn } from "../../src/api/expectMatches";
import { Client, CollectorFilter } from "discord.js";
import MockDiscord from "../mocks/mockDiscord";
import { initCordeClient, initCordeClientWithChannel } from "../testHelper";
import { TimeoutError } from "rxjs";

const DEFAULT_PREFIX = "!";
const mockDiscord = new MockDiscord();

let _client = new Client();
let _cordeClient = initCordeClient(mockDiscord, _client);

describe("Testing CordeBot object", () => {
  beforeEach(() => {
    testCollector.clearIsolatedTestFunctions();
    mockDiscord.resetMocks();

    _client = new Client();
    _cordeClient = initCordeClient(mockDiscord, _client);

    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it("should add a test function", () => {
    testCollector.addTestFunction((corde) => toReturn("test", false, corde, "com"));
    expect(testCollector.cloneIsolatedTestFunctions().length).toBe(1);
  });

  it("should not add a test function", () => {
    testCollector.addTestFunction(null);
    expect(testCollector.cloneIsolatedTestFunctions().length).toBe(0);
  });

  describe("testing findGuild()", () => {
    it("should throw error due to no guildManager(Don't know if it's possible)", (done) => {
      try {
        const client = new Client();
        client.guilds = null;
        initCordeClient(mockDiscord, client);
        client.emit("ready");
      } catch (error) {
        expect(error).toBeTruthy();
        done();
      }
    });

    it("should throw error due guilds.cache.has === false", async (done) => {
      try {
        const client = new Client();
        initCordeClient(mockDiscord, client);
        client.emit("ready");
      } catch (error) {
        expect(error).toBeTruthy();
        done();
      }
    });

    it("should throw error due failure in guild.cache.find", async (done) => {
      try {
        const client = new Client();

        client.guilds.cache.has = jest.fn().mockReturnValueOnce(true);
        client.guilds.cache.find = jest.fn().mockReturnValueOnce(null);

        initCordeClient(mockDiscord, client);
        client.emit("ready");
      } catch (error) {
        expect(error).toBeTruthy();
        done();
      }
    });

    it("should find a guild", async (done) => {
      const client = new Client();

      client.guilds.cache.has = jest.fn().mockReturnValueOnce(true);
      client.guilds.cache.find = jest.fn().mockReturnValueOnce(mockDiscord.guild);

      const corde = initCordeClient(mockDiscord, client);
      const findMock = jest.spyOn(corde, "findGuild");

      try {
        client.emit("ready");
      } catch (error) {
        expect(findMock).toHaveLastReturnedWith(mockDiscord.guild);
        done();
      }
    });
  });

  describe("testing findChannel()", () => {
    it("should throw error due to no channelManager(Don't know if it's possible)", (done) => {
      const client = new Client();

      client.guilds.cache.has = jest.fn().mockReturnValueOnce(true);
      client.guilds.cache.find = jest.fn().mockReturnValueOnce(mockDiscord.guild);

      mockDiscord.guild.channels = null;

      const corde = initCordeClient(mockDiscord, client);
      const findMock = jest.spyOn(corde, "findChannel");

      try {
        client.emit("ready");
      } catch (error) {
        expect(findMock).toBeCalled();
        expect(error).toBeTruthy();
        done();
      }
    });

    it("should throw error guild.channels.cache.has === false", async (done) => {
      const client = new Client();

      client.guilds.cache.has = jest.fn().mockReturnValueOnce(true);
      client.guilds.cache.find = jest.fn().mockReturnValueOnce(mockDiscord.guild);

      mockDiscord.guild.channels.cache.has = jest.fn().mockReturnValueOnce(false);

      const corde = initCordeClient(mockDiscord, client);
      const findMock = jest.spyOn(corde, "findChannel");

      try {
        client.emit("ready");
      } catch (error) {
        expect(findMock).toBeCalled();
        expect(error).toBeTruthy();
        done();
      }
    });

    it("should throw error due failure in guild.channels.cache.find", async (done) => {
      const client = new Client();

      client.guilds.cache.has = jest.fn().mockReturnValueOnce(true);
      client.guilds.cache.find = jest.fn().mockReturnValueOnce(mockDiscord.guild);

      mockDiscord.guild.channels.cache.has = jest.fn().mockReturnValueOnce(true);

      const corde = initCordeClient(mockDiscord, client);
      const findMock = jest.spyOn(corde, "findChannel");

      try {
        client.emit("ready");
      } catch (error) {
        expect(findMock).toBeCalled();
        expect(error).toBeTruthy();
        done();
      }
    });

    it("should find a channel", async (done) => {
      const client = new Client();

      client.guilds.cache.has = jest.fn().mockReturnValueOnce(true);
      client.guilds.cache.find = jest.fn().mockReturnValueOnce(mockDiscord.guild);

      mockDiscord.guild.channels.cache.has = jest.fn().mockReturnValueOnce(true);
      mockDiscord.guild.channels.cache.find = jest.fn().mockReturnValueOnce(mockDiscord.channel);

      const corde = initCordeClient(mockDiscord, client);
      const findMock = jest.spyOn(corde, "findChannel");

      client.emit("ready");
      expect(findMock).toHaveLastReturnedWith(mockDiscord.channel);
      done();
    });
  });

  describe("testing login()", () => {
    it("should fail in login", () => {
      expect(() => _cordeClient.login("321")).rejects.toBeTruthy();
    });

    it("should call Client.login in login", async (done) => {
      const spy = jest.spyOn(_client, "login");
      try {
        await _cordeClient.login("123");
      } catch (error) {
        expect(spy).toBeCalled();
        done();
      }
    });
  });

  describe("testing logout()", () => {
    it("should call Client.destroy", () => {
      const spy = jest.spyOn(_client, "destroy");
      _cordeClient.logout();
      expect(spy).toBeCalled();
    });

    it("should call Client.destroy", () => {
      const spy = jest.spyOn(_client, "destroy");
      _cordeClient.logout();
      expect(spy).toBeCalled();
    });
  });

  describe("testing onStart", () => {
    it("should get onStart observable", () => {
      expect(_cordeClient.onStart).toBeTruthy();
    });
  });

  describe("testing sendTextMessage()", () => {
    it("should fail in sendTextMessage due to no message provided", async (done) => {
      expect(async () => await _cordeClient.sendTextMessage(null)).rejects.toBeTruthy();
      done();
    });

    it("should call TextChannel.send() with prefix", async (done) => {
      const client = new Client();
      client.guilds.cache.has = jest.fn().mockReturnValueOnce(true);
      client.guilds.cache.find = jest.fn().mockReturnValueOnce(mockDiscord.guild);

      mockDiscord.guild.channels.cache.has = jest.fn().mockReturnValueOnce(true);
      mockDiscord.guild.channels.cache.find = jest
        .fn()
        .mockReturnValueOnce(mockDiscord.textChannel);

      const corde = initCordeClient(mockDiscord, client);
      const spy = jest.spyOn(mockDiscord.textChannel, "send");
      client.emit("ready");
      try {
        await corde.sendTextMessage("text");
      } catch (error) {
        expect(spy).toBeCalledWith(`${DEFAULT_PREFIX}text`);
        done();
      }
    });

    it("should return a Discord.Message when called a valid message", async (done) => {
      const client = new Client();
      const corde = initCordeClientWithChannel(mockDiscord, client);
      mockDiscord.textChannel.send = jest.fn().mockReturnValue(mockDiscord.message);
      client.emit("ready");
      expect(await corde.sendTextMessage("ok")).toBe(mockDiscord.message);
      done();
    });
  });

  describe("testing awaitMessagesFromTestingBot()", () => {
    it("should call TextChannel.awaitMessages", async (done) => {
      const client = new Client();
      const corde = initCordeClientWithChannel(mockDiscord, client);
      mockDiscord.textChannel.awaitMessages = jest
        .fn()
        .mockReturnValue(mockDiscord.messageCollection);
      client.emit("ready");

      const spy = jest.spyOn(mockDiscord.textChannel, "awaitMessages");
      await corde.awaitMessagesFromTestingBot();
      expect(spy).toBeCalledTimes(1);
      done();
    });

    it("should fail to get message due to no message author id be equal to the expect", async () => {
      const client = new Client();
      const corde = initCordeClientWithChannel(mockDiscord, client);
      mockDiscord.textChannel.awaitMessages = jest
        .fn()
        .mockImplementation((filter: CollectorFilter) => {
          if (filter(mockDiscord.message)) {
            return mockDiscord.messageCollection;
          } else {
            return null;
          }
        });
      client.emit("ready");
      try {
        expect(await corde.awaitMessagesFromTestingBot());
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });
  });

  describe("testing waitForAddedReactions", () => {
    it("should call Message.awaitReactions", async (done) => {
      const client = new Client();
      const corde = initCordeClientWithChannel(mockDiscord, client);
      mockDiscord.message.awaitReactions = jest
        .fn()
        .mockReturnValue(mockDiscord.messageReactionCollection);

      const spy = jest.spyOn(mockDiscord.message, "awaitReactions");
      await corde.waitForAddedReactions(mockDiscord.message, 1);

      expect(spy).toBeCalledTimes(1);
      done();
    });

    it("should return a message reaction based on amount", async (done) => {
      const client = new Client();
      const corde = initCordeClientWithChannel(mockDiscord, client);
      mockDiscord.message.awaitReactions = jest
        .fn()
        .mockImplementation((filter: CollectorFilter) => {
          if (filter(mockDiscord.messageReaction, mockDiscord.userBot)) {
            return mockDiscord.messageReactionCollection;
          } else {
            return null;
          }
        });

      jest.spyOn(mockDiscord.message, "awaitReactions");
      const reactions = await corde.waitForAddedReactions(mockDiscord.message, 1);
      expect(reactions.first()).toBe(mockDiscord.messageReaction);
      expect(reactions.size).toBe(1);
      done();
    });

    it("should return a message reaction based on the reaction", async (done) => {
      const client = new Client();
      const corde = initCordeClientWithChannel(mockDiscord, client);
      mockDiscord.message.awaitReactions = jest
        .fn()
        .mockImplementation((filter: CollectorFilter) => {
          if (filter(mockDiscord.messageReaction, mockDiscord.userBot)) {
            return mockDiscord.messageReactionCollection;
          } else {
            return null;
          }
        });

      jest.spyOn(mockDiscord.message, "awaitReactions");
      const reactions = await corde.waitForAddedReactions(mockDiscord.message, [
        mockDiscord.messageReactionEmojiName,
      ]);
      expect(reactions.first()).toBe(mockDiscord.messageReaction);
      expect(reactions.size).toBe(1);
      done();
    });

    it("should return a rejection due to timeout", async (done) => {
      const client = new Client();
      const corde = initCordeClientWithChannel(mockDiscord, client);

      jest.spyOn(mockDiscord.message, "awaitReactions");
      try {
        await corde.waitForAddedReactions(mockDiscord.message, 1);
      } catch (error) {
        expect(error).toBeTruthy();
        done();
      }
    });
  });

  describe("testing waitForRemovedReactions", () => {
    it("should get 1 removed reaction from a message", async (done) => {
      const client = new Client();
      const corde = initCordeClientWithChannel(mockDiscord, client);

      setTimeout(() => {
        client.emit("messageReactionRemoveEmoji", mockDiscord.messageReaction);
      }, 250);
      const reactions = await corde.waitForRemovedReactions(mockDiscord.message, 1);

      expect(reactions[0]).toBe(mockDiscord.messageReaction);
      expect(reactions.length).toBe(1);
      done();
    });

    it("should not get 1 removed reaction from a message", async (done) => {
      const client = new Client();
      const corde = initCordeClientWithChannel(mockDiscord, client);

      setTimeout(() => {
        client.emit("messageReactionRemoveEmoji", mockDiscord.isolatedMessageReaction);
      }, 250);

      try {
        await corde.waitForRemovedReactions(mockDiscord.message, 1);
      } catch (error) {
        expect(error).toBeInstanceOf(TimeoutError);
        done();
      }
    });
  });

  describe("testing isLoggedIn", () => {
    it("should return true due to all properties are filled", () => {
      const client = new Client();
      client.readyAt = new Date();
      const corde = initCordeClientWithChannel(mockDiscord, client);
      client.emit("ready");
      expect(corde.isLoggedIn()).toBeTruthy();
    });

    it("should return false due to all properties not filled", () => {
      const client = new Client();
      client.readyAt = new Date();
      const corde = initCordeClientWithChannel(mockDiscord, client);
      expect(corde.isLoggedIn()).toBeFalsy();
    });
  });

  describe("testing findMessage", () => {
    it("should find a not cached message using anonymous filter function", async (done) => {
      const client = new Client();
      const corde = initCordeClientWithChannel(mockDiscord, client);
      client.emit("ready");

      mockDiscord.textChannel.messages.fetch = jest
        .fn()
        .mockReturnValue(mockDiscord.messageCollection);

      const message = await corde.findMessage((m) => m.id === mockDiscord.message.id);
      expect(message.id).toBe(mockDiscord.message.id);
      done();
    });

    it("should find a cached message using anonymous filter function", async (done) => {
      const client = new Client();
      const corde = initCordeClientWithChannel(mockDiscord, client);
      client.emit("ready");

      mockDiscord.textChannel.messages.cache = mockDiscord.messageCollection;

      const message = await corde.findMessage((m) => m.id === mockDiscord.message.id, true);
      expect(message.id).toBe(mockDiscord.message.id);
      done();
    });

    it("should find a cached message using message content", async (done) => {
      const client = new Client();
      const corde = initCordeClientWithChannel(mockDiscord, client);
      client.emit("ready");

      mockDiscord.textChannel.messages.cache = mockDiscord.messageCollection;

      const message = await corde.findMessage({ text: mockDiscord.message.content }, true);
      expect(message.id).toBe(mockDiscord.message.id);
      done();
    });

    it("should find a not cached message using message content", async (done) => {
      const client = new Client();
      const corde = initCordeClientWithChannel(mockDiscord, client);
      client.emit("ready");

      mockDiscord.textChannel.messages.fetch = jest
        .fn()
        .mockReturnValue(mockDiscord.messageCollection);

      const message = await corde.findMessage({ text: mockDiscord.message.content }, false);
      expect(message.id).toBe(mockDiscord.message.id);
      done();
    });

    it("should find a cached message using message id", async (done) => {
      const client = new Client();
      const corde = initCordeClientWithChannel(mockDiscord, client);
      client.emit("ready");

      mockDiscord.textChannel.messages.cache = mockDiscord.messageCollection;

      const message = await corde.findMessage({ id: mockDiscord.message.id }, true);
      expect(message.id).toBe(mockDiscord.message.id);
      done();
    });

    it("should find a not cached message using message id", async (done) => {
      const client = new Client();
      const corde = initCordeClientWithChannel(mockDiscord, client);
      client.emit("ready");

      mockDiscord.textChannel.messages.fetch = jest
        .fn()
        .mockReturnValue(mockDiscord.messageCollection);

      const message = await corde.findMessage({ id: mockDiscord.message.id }, false);
      expect(message.id).toBe(mockDiscord.message.id);
      done();
    });

    it("should not find a message", async (done) => {
      const client = new Client();
      const corde = initCordeClientWithChannel(mockDiscord, client);
      client.emit("ready");

      mockDiscord.textChannel.messages.fetch = jest
        .fn()
        .mockReturnValue(mockDiscord.messageCollection);

      mockDiscord.textChannel.messages.cache = mockDiscord.messageCollection;

      const message = await corde.findMessage({ id: "123" }, false);
      expect(message).toBeFalsy();
      done();
    });
  });
});
