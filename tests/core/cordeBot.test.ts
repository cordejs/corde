import { testCollector } from "../../src/common/testColletor";
import { toReturn } from "../../src/api/expectMatches";
import { CordeBot } from "../../src/core";
import { Client } from "discord.js";
import MockDiscord from "../mocks/discordClient";

const mockDiscord = new MockDiscord();

describe("Testing CordeBot object", () => {
  beforeEach(() => {
    testCollector.clearIsolatedTestFunctions();
    mockDiscord.resetMocks();
  });

  it("should add a test function", () => {
    testCollector.addTestFunction((corde) => toReturn("test", false, corde, "com"));
    expect(testCollector.cloneIsolatedTestFunctions().length).toBe(1);
  });

  it("should not add a test function", () => {
    testCollector.addTestFunction(null);
    expect(testCollector.cloneIsolatedTestFunctions().length).toBe(0);
  });

  it("should throw error due to no guildManager(Don't know if it's possible)", (done) => {
    try {
      const client = new Client();
      client.guilds = null;
      initCordeClient(client);
      client.emit("ready");
    } catch (error) {
      expect(error).toBeTruthy();
      done();
    }
  });

  it("should throw error due guilds.cache.has === false", (done) => {
    try {
      const client = new Client();
      initCordeClient(client);
      client.emit("ready");
    } catch (error) {
      expect(error).toBeTruthy();
      done();
    }
  });

  it("should throw error due failure in guild.cache.find", (done) => {
    try {
      const client = new Client();

      client.guilds.cache.has = jest.fn().mockReturnValueOnce(true);
      client.guilds.cache.find = jest.fn().mockReturnValueOnce(null);

      initCordeClient(client);
      client.emit("ready");
    } catch (error) {
      expect(error).toBeTruthy();
      done();
    }
  });

  it("should find a guild", (done) => {
    const client = new Client();

    client.guilds.cache.has = jest.fn().mockReturnValueOnce(true);
    client.guilds.cache.find = jest.fn().mockReturnValueOnce(mockDiscord.guild);

    const corde = initCordeClient(client);
    const findMock = jest.spyOn(corde, "findGuild");

    try {
      client.emit("ready");
    } catch (error) {
      expect(findMock).toHaveLastReturnedWith(mockDiscord.guild);
      done();
    }
  });

  it("should throw error due to no channelManager(Don't know if it's possible)", (done) => {
    const client = new Client();

    client.guilds.cache.has = jest.fn().mockReturnValueOnce(true);
    client.guilds.cache.find = jest.fn().mockReturnValueOnce(mockDiscord.guild);

    mockDiscord.guild.channels = null;

    const corde = initCordeClient(client);
    const findMock = jest.spyOn(corde, "findChannel");

    try {
      client.emit("ready");
    } catch (error) {
      expect(findMock).toBeCalled();
      expect(error).toBeTruthy();
      done();
    }
  });

  it("should throw error guild.channels.cache.has === false", (done) => {
    const client = new Client();

    client.guilds.cache.has = jest.fn().mockReturnValueOnce(true);
    client.guilds.cache.find = jest.fn().mockReturnValueOnce(mockDiscord.guild);

    mockDiscord.guild.channels.cache.has = jest.fn().mockReturnValueOnce(false);

    const corde = initCordeClient(client);
    const findMock = jest.spyOn(corde, "findChannel");

    try {
      client.emit("ready");
    } catch (error) {
      expect(findMock).toBeCalled();
      expect(error).toBeTruthy();
      done();
    }
  });

  it("should throw error due failure in guild.channels.cache.find", (done) => {
    const client = new Client();

    client.guilds.cache.has = jest.fn().mockReturnValueOnce(true);
    client.guilds.cache.find = jest.fn().mockReturnValueOnce(mockDiscord.guild);

    mockDiscord.guild.channels.cache.has = jest.fn().mockReturnValueOnce(true);

    const corde = initCordeClient(client);
    const findMock = jest.spyOn(corde, "findChannel");

    try {
      client.emit("ready");
    } catch (error) {
      expect(findMock).toBeCalled();
      expect(error).toBeTruthy();
      done();
    }
  });

  it("should find a channel", (done) => {
    const client = new Client();

    client.guilds.cache.has = jest.fn().mockReturnValueOnce(true);
    client.guilds.cache.find = jest.fn().mockReturnValueOnce(mockDiscord.guild);

    mockDiscord.guild.channels.cache.has = jest.fn().mockReturnValueOnce(true);
    mockDiscord.guild.channels.cache.find = jest.fn().mockReturnValueOnce(mockDiscord.channel);

    const corde = initCordeClient(client);
    const findMock = jest.spyOn(corde, "findChannel");

    client.emit("ready");
    expect(findMock).toHaveLastReturnedWith(mockDiscord.channel);
    done();
  });
});

function initCordeClient(clientInstance: Client) {
  return new CordeBot(
    "!",
    "12332112321123321",
    "9876543221123456",
    5000,
    "098765432112345678",
    clientInstance,
  );
}
