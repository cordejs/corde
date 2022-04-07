import { ICordeBot } from "../../src/types";
import MockDiscord from "../mocks/mockDiscord";
import { initCordeClient, initCordeClientWithChannel, replaceCollection } from "../testHelper";

const DEFAULT_PREFIX = "!";
const mockDiscord = new MockDiscord();

let _client = mockDiscord.mockClient();
let _cordeClient = initCordeClient(mockDiscord, _client);

describe("Testing CordeBot object", () => {
  beforeEach(() => {
    mockDiscord.resetMocks();

    _client = mockDiscord.mockClient();
    _cordeClient = initCordeClient(mockDiscord, _client);

    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  describe("testing findGuild()", () => {
    it("should throw error due guilds.cache.has === false", async () => {
      try {
        const client = mockDiscord.client;
        initCordeClient(mockDiscord, client);
        client.emit("ready", client);
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });

    it("should throw error due failure in guild.cache.find", async () => {
      try {
        const client = mockDiscord.client;

        client.guilds.cache.has = jest.fn().mockReturnValueOnce(true);
        client.guilds.cache.find = jest.fn().mockReturnValueOnce(null);

        initCordeClient(mockDiscord, client);
        client.emit("ready", client);
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });

    it("should find a guild", async () => {
      const client = mockDiscord.client;

      client.guilds.cache.has = jest.fn().mockReturnValueOnce(true);
      client.guilds.cache.find = jest.fn().mockReturnValueOnce(mockDiscord.guild);

      const corde = initCordeClient(mockDiscord, client);
      const findMock = jest.spyOn(corde, "findGuild");

      try {
        client.emit("ready", client);
      } catch (error) {
        expect(findMock).toHaveLastReturnedWith(mockDiscord.guild);
      }
    });
  });

  describe("testing findChannel()", () => {
    it("should throw error guild.channels.cache.has === false", async () => {
      const client = mockDiscord.client;

      client.guilds.cache.has = jest.fn().mockReturnValueOnce(true);
      client.guilds.cache.find = jest.fn().mockReturnValueOnce(mockDiscord.guild);

      mockDiscord.guild.channels.cache.has = jest.fn().mockReturnValueOnce(false);

      const corde = initCordeClient(mockDiscord, client);
      const findMock = jest.spyOn(corde, "findChannel");

      try {
        client.emit("ready", client);
      } catch (error) {
        expect(findMock).toBeCalled();
        expect(error).toBeTruthy();
      }
    });

    it("should throw error due failure in guild.channels.cache.find", async () => {
      const client = mockDiscord.client;

      client.guilds.cache.has = jest.fn().mockReturnValueOnce(true);
      client.guilds.cache.find = jest.fn().mockReturnValueOnce(mockDiscord.guild);

      mockDiscord.guild.channels.cache.has = jest.fn().mockReturnValueOnce(true);

      const corde = initCordeClient(mockDiscord, client);
      const findMock = jest.spyOn(corde, "findChannel");

      try {
        client.emit("ready", client);
      } catch (error) {
        expect(findMock).toBeCalled();
        expect(error).toBeTruthy();
      }
    });

    it("should find a channel", async () => {
      const client = mockDiscord.client;

      client.guilds.cache.has = jest.fn().mockReturnValueOnce(true);
      client.guilds.cache.find = jest.fn().mockReturnValueOnce(mockDiscord.guild);

      mockDiscord.guild.channels.cache.has = jest.fn().mockReturnValueOnce(true);
      mockDiscord.guild.channels.cache.find = jest
        .fn()
        .mockReturnValueOnce(mockDiscord.textChannel);

      const corde = initCordeClient(mockDiscord, client);
      const findMock = jest.spyOn(corde, "findChannel");

      client.emit("ready", client);
      expect(findMock).toHaveLastReturnedWith(mockDiscord.textChannel);
    });
  });

  describe("testing login()", () => {
    it("should fail in login", () => {
      expect(() => _cordeClient.login("321")).rejects.toBeTruthy();
    });

    it("should call Client.login in login", async () => {
      const spy = jest.spyOn(_client, "login");
      try {
        await _cordeClient.login("123");
      } catch (error) {
        expect(spy).toBeCalled();
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

  describe("testing sendTextMessage()", () => {
    it("should fail in sendTextMessage due to no message provided", async () => {
      expect(async () => await _cordeClient.sendTextMessage(null)).rejects.toBeTruthy();
    });

    it("should call TextChannel.send() with prefix", async () => {
      const client = mockDiscord.client;
      client.guilds.cache.has = jest.fn().mockReturnValueOnce(true);
      client.guilds.cache.find = jest.fn().mockReturnValueOnce(mockDiscord.guild);

      mockDiscord.guild.channels.cache.has = jest.fn().mockReturnValueOnce(true);
      mockDiscord.guild.channels.cache.find = jest
        .fn()
        .mockReturnValueOnce(mockDiscord.textChannel);

      const corde = initCordeClient(mockDiscord, client);
      const spy = jest.spyOn(mockDiscord.textChannel, "send");
      client.emit("ready", client);
      try {
        await corde.sendTextMessage("text");
      } catch (error) {
        expect(spy).toBeCalledWith(`${DEFAULT_PREFIX}text`);
      }
    });

    it("should return a Discord.Message when called a valid message", async () => {
      const client = mockDiscord.client;
      const corde = initCordeClientWithChannel(mockDiscord, client);
      mockDiscord.textChannel.send = jest.fn().mockReturnValue(mockDiscord.message);
      client.emit("ready", client);
      expect(await corde.sendTextMessage("ok")).toBe(mockDiscord.message);
    });
  });

  describe("testing isLoggedIn", () => {
    it("should return true due to all properties are filled", () => {
      const client = mockDiscord.client;
      client.readyAt = new Date();
      const corde = initCordeClientWithChannel(mockDiscord, client);
      client.emit("ready", client);
      expect(corde.isLoggedIn()).toBeTruthy();
    });

    it("should return false due to all properties not filled", () => {
      const client = mockDiscord.client;
      client.readyAt = new Date();
      const corde = initCordeClientWithChannel(mockDiscord, client);
      expect(corde.isLoggedIn()).toBeFalsy();
    });
  });

  describe("testing findMessage", () => {
    it("should find a not cached message using anonymous filter function", async () => {
      const client = mockDiscord.client;
      const corde = initCordeClientWithChannel(mockDiscord, client);
      client.emit("ready", client);

      mockDiscord.textChannel.messages.fetch = jest
        .fn()
        .mockReturnValue(mockDiscord.messageCollection);

      const message = await corde.findMessage((m) => m.id === mockDiscord.message.id);
      expect(message?.id).toBe(mockDiscord.message.id);
    });

    it("should find a cached message using anonymous filter function", async () => {
      const client = mockDiscord.client;
      const corde = initCordeClientWithChannel(mockDiscord, client);
      client.emit("ready", client);

      mockDiscord.textChannel.messages.fetch = jest
        .fn()
        .mockReturnValue(mockDiscord.messageCollection);
      replaceCollection(mockDiscord.messageCollection, mockDiscord.textChannel.messages.cache);

      const message = await corde.findMessage((m) => m.id === mockDiscord.message.id);
      expect(message?.id).toBe(mockDiscord.message.id);
    });

    it("should return null due to no parameter", async () => {
      const client = mockDiscord.client;
      const corde = initCordeClientWithChannel(mockDiscord, client);
      client.emit("ready", client);

      replaceCollection(mockDiscord.messageCollection, mockDiscord.textChannel.messages.cache);
      mockDiscord.textChannel.messages.fetch = jest
        .fn()
        .mockReturnValue(mockDiscord.messageCollection);

      const message = await corde.findMessage(null);
      expect(message).toBeFalsy();
    });

    it("should return null due to no no fetch data", async () => {
      const client = mockDiscord.client;
      const corde = initCordeClientWithChannel(mockDiscord, client);
      client.emit("ready", client);

      mockDiscord.textChannel.messages.cache.find = jest.fn().mockReturnValue(null);
      mockDiscord.textChannel.messages.fetch = jest
        .fn()
        .mockReturnValue(mockDiscord.messageCollection);

      mockDiscord.textChannel.messages.fetch = jest.fn().mockReturnValue(null);
      const message = await corde.findMessage((m) => m.id === mockDiscord.message.id);
      expect(message).toBeFalsy();
    });

    it("should find a cached message using message content", async () => {
      const client = mockDiscord.client;
      const corde = initCordeClientWithChannel(mockDiscord, client);
      client.emit("ready", client);

      replaceCollection(mockDiscord.messageCollection, mockDiscord.textChannel.messages.cache);
      mockDiscord.textChannel.messages.fetch = jest
        .fn()
        .mockReturnValue(mockDiscord.messageCollection);

      const message = await corde.findMessage({ content: mockDiscord.message.content });
      expect(message?.id).toBe(mockDiscord.message.id);
    });

    it("should find a not cached message using message content", async () => {
      const client = mockDiscord.client;
      const corde = initCordeClientWithChannel(mockDiscord, client);
      client.emit("ready", client);

      mockDiscord.textChannel.messages.fetch = jest
        .fn()
        .mockReturnValue(mockDiscord.messageCollection);

      const message = await corde.findMessage({ content: mockDiscord.message.content });
      expect(message?.id).toBe(mockDiscord.message.id);
    });

    it("should find a cached message using message id", async () => {
      const client = mockDiscord.client;
      const corde = initCordeClientWithChannel(mockDiscord, client);
      client.emit("ready", client);

      replaceCollection(mockDiscord.messageCollection, mockDiscord.textChannel.messages.cache);
      mockDiscord.textChannel.messages.fetch = jest
        .fn()
        .mockReturnValue(mockDiscord.messageCollection);

      const message = await corde.findMessage({ id: mockDiscord.message.id });
      expect(message?.id).toBe(mockDiscord.message.id);
    });

    it("should find a not cached message using message id", async () => {
      const client = mockDiscord.client;
      const corde = initCordeClientWithChannel(mockDiscord, client);
      client.emit("ready", client);

      mockDiscord.textChannel.messages.fetch = jest
        .fn()
        .mockReturnValue(mockDiscord.messageCollection);

      const message = await corde.findMessage({ id: mockDiscord.message.id });
      expect(message?.id).toBe(mockDiscord.message.id);
    });

    it("should not find a message", async () => {
      const client = mockDiscord.client;
      const corde = initCordeClientWithChannel(mockDiscord, client);
      client.emit("ready", client);

      mockDiscord.textChannel.messages.fetch = jest
        .fn()
        .mockReturnValue(mockDiscord.messageCollection);

      replaceCollection(mockDiscord.messageCollection, mockDiscord.textChannel.messages.cache);

      const message = await corde.findMessage({ id: "123" });
      expect(message).toBeFalsy();
    });
  });

  it("should fetchRole by it's id", async () => {
    const corde = initCordeBot();
    mockRoleFetch(corde);
    const role = await corde.fetchRole(mockDiscord.role.id);
    expect(role).toEqual(mockDiscord.role);
  });

  it("should find a role by it's id", async () => {
    const corde = initCordeBot();
    mockRolesFetch(corde);
    const role = await corde.findRole({ id: mockDiscord.role.id });
    expect(role).toEqual(mockDiscord.role);
  });

  it("should find a role by it's name", async () => {
    const corde = initCordeBot();
    mockRolesFetch(corde);
    const role = await corde.findRole({ name: mockDiscord.role.name });
    expect(role).toEqual(mockDiscord.role);
  });

  it("should not find a role by it's name", async () => {
    const corde = initCordeBot();
    mockRolesFetch(corde);
    const role = await corde.findRole({ name: "ba" });
    expect(role).toBeFalsy();
  });

  it("should not find a role by it's id", async () => {
    const corde = initCordeBot();
    mockRolesFetch(corde);
    const role = await corde.findRole({ id: "123" });
    expect(role).toBeFalsy();
  });

  it("should not find a role due to no option", async () => {
    const corde = initCordeBot();
    mockRolesFetch(corde);
    const role = await corde.findRole({});
    expect(role).toBeFalsy();
  });

  it("should find a role by it's id if pass both id and name", async () => {
    const corde = initCordeBot();
    mockRolesFetch(corde);
    const role = await corde.findRole({ id: mockDiscord.role.id, name: "bata" });
    expect(role).toEqual(mockDiscord.role);
  });

  it("should list all roles of the guild", async () => {
    const corde = initCordeBot();
    expect(corde.getRoles()).toEqual(mockDiscord.guild.roles.cache);
  });

  describe("testing hasRole", () => {
    it("should return true due to a existing role", async () => {
      const corde = initCordeBot();
      mockRolesFetch(corde);
      const role = await corde.hasRole({ id: mockDiscord.role.id });
      expect(role).toBeTruthy();
    });

    it("should return false due to a existing role", async () => {
      const corde = initCordeBot();
      mockRolesFetch(corde);
      const role = await corde.hasRole({ id: "9879" });
      expect(role).toBeFalsy();
    });
  });

  it("should get roleManager", () => {
    const corde = initCordeBot();
    expect(corde.roleManager).toEqual(mockDiscord.guild.roles);
  });

  it("should get channel", () => {
    const corde = initCordeBot();
    expect(corde.channel).toEqual(mockDiscord.textChannel);
  });

  it("should call textChannel.send", async () => {
    const corde = initCordeBot();
    const spy = jest.spyOn(mockDiscord.textChannel, "send").mockImplementation(() => null);
    await corde.sendMessage("");
    expect(spy).toBeCalled();
  });

  it("should call roles.fetch", async () => {
    const corde = initCordeBot();
    const spy = jest
      .spyOn(corde.guild.roles, "fetch")
      .mockImplementation(() => Promise.resolve(mockDiscord.roles));
    await corde.fetchRoles();
    expect(spy).toBeCalled();
  });
});

function initCordeBot() {
  const client = mockDiscord.client;
  const corde = initCordeClientWithChannel(mockDiscord, client);
  client.emit("ready", client);
  return corde;
}

function mockRolesFetch(corde: ICordeBot) {
  return jest
    .spyOn(corde.guild.roles, "fetch")
    .mockImplementation(() => Promise.resolve(mockDiscord.roles));
}

function mockRoleFetch(corde: ICordeBot) {
  return (
    jest
      .spyOn(corde.guild.roles, "fetch")
      //@ts-expect-error
      .mockImplementation(() => Promise.resolve(mockDiscord.role))
  );
}
