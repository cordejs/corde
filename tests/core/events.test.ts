import { Channel, Client, GuildEmoji, MessageReaction, Role } from "discord.js";
import { Events } from "../../src/core/events";
import MockDiscord from "../mocks/mockDiscord";
import { executeWithDelay } from "../testHelper";

const client = new Client();
const mockDiscord = new MockDiscord();
let events: Events;

const DEFAULT_DELAY = 50;

beforeEach(() => {
  events = new Events(client);
});

describe("testing events event", () => {
  describe("testing ready", () => {
    it("should get callback", () => {
      let a = 0;
      events.onReady(() => (a = 1));
      client.emit("ready");
      expect(a).toBe(1);
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit("ready");
      }, DEFAULT_DELAY);
      const _void = await events.onceReady();
      expect(_void).toBeFalsy();
    });
  });

  describe("testing messageReactionRemoveEmoji event", () => {
    it("should get callback", () => {
      let _reaction: MessageReaction;
      events.onMessageReactionRemoveEmoji((reaction) => (_reaction = reaction));
      client.emit("messageReactionRemoveEmoji", mockDiscord.messageReaction);
      expect(_reaction).toEqual(mockDiscord.messageReaction);
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit("messageReactionRemoveEmoji", mockDiscord.messageReaction);
      }, DEFAULT_DELAY);
      let _reaction = await events.onceMessageReactionRemoveEmoji();
      expect(_reaction).toEqual(mockDiscord.messageReaction);
    });
  });

  describe("testing channelCreate event", () => {
    it("should get callback", () => {
      let _channel: Channel;
      events.onChannelCreate((channel) => (_channel = channel));
      client.emit("channelCreate", mockDiscord.channel);
      expect(_channel).toEqual(mockDiscord.channel);
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit("channelCreate", mockDiscord.channel);
      }, DEFAULT_DELAY);
      const _channel = await events.onceChannelCreate();
      expect(_channel).toEqual(mockDiscord.channel);
    });
  });

  describe("testing channelDelete event", () => {
    it("should get callback", () => {
      let _channel: Channel;
      events.onChannelDelete((channel) => (_channel = channel));
      client.emit("channelDelete", mockDiscord.channel);
      expect(_channel).toEqual(mockDiscord.channel);
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit("channelDelete", mockDiscord.channel);
      }, DEFAULT_DELAY);
      const _channel = await events.onceChannelDelete();
      expect(_channel).toEqual(mockDiscord.channel);
    });
  });

  describe("testing channelPinsUpdate event", () => {
    it("should get callback", () => {
      let _channel: Channel;
      let _date: Date;
      const now = new Date();
      events.onChannelPinsUpdate((channel, date) => {
        _channel = channel;
        _date = date;
      });
      client.emit("channelPinsUpdate", mockDiscord.channel, now);
      expect(_channel).toEqual(mockDiscord.channel);
      expect(_date).toEqual(now);
    });

    it("should get async once", async () => {
      const now = new Date();
      executeWithDelay(() => {
        client.emit("channelPinsUpdate", mockDiscord.channel, now);
      }, DEFAULT_DELAY);
      const [_channel, _date] = await events.onceChannelPinsUpdate();
      expect(_channel).toEqual(mockDiscord.channel);
      expect(_date).toEqual(now);
    });
  });

  describe("testing channelUpdate event", () => {
    const oldChannel = mockDiscord.textChannel;
    const newChannel = mockDiscord.textChannel;
    newChannel.name = "potatoe";

    it("should get callback", () => {
      let _oldChannel: Channel;
      let _newChannel: Channel;

      events.onChannelUpdate((oldChannel, newChannel) => {
        _oldChannel = oldChannel;
        _newChannel = newChannel;
      });

      client.emit("channelUpdate", oldChannel, newChannel);
      expect(_oldChannel).toEqual(oldChannel);
      expect(_newChannel).toBe(newChannel);
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit("channelUpdate", oldChannel, newChannel);
      }, DEFAULT_DELAY);
      const [_oldChannel, _newChannel] = await events.onceChannelUpdate();
      expect(_oldChannel).toEqual(oldChannel);
      expect(_newChannel).toBe(newChannel);
    });
  });

  describe("testing debug event", () => {
    it("should get callback", () => {
      let a = "";
      events.onDebug((argEmited) => (a = argEmited));
      client.emit("debug", "test");
      expect(a).toEqual("test");
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit("debug", "test");
      }, DEFAULT_DELAY);
      const testValue = await events.onceDebug();
      expect(testValue).toEqual("test");
    });
  });

  describe("testing roleDelete event", () => {
    it("should get callback", () => {
      let deleted: Role;
      events.onRoleDelete((role) => (deleted = role));
      client.emit("roleDelete", mockDiscord.role);
      expect(deleted).toEqual(mockDiscord.role);
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit("roleDelete", mockDiscord.role);
      }, DEFAULT_DELAY);
      const deleted = await events.onceRoleDelete();
      expect(deleted).toEqual(mockDiscord.role);
    });
  });

  describe("testing disconnect event", () => {
    it("should get callback", () => {
      let closeEvent: CloseEvent;
      let code = 0;
      events.onDisconnect((event, _code) => {
        closeEvent = event;
        code = _code;
      });
      client.emit("disconnect", {}, 1);
      expect(closeEvent).toEqual({});
      expect(code).toEqual(1);
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit("disconnect", {}, 1);
      }, DEFAULT_DELAY);

      const [closeEvent, code] = await events.onceDisconnect();

      expect(closeEvent).toEqual({});
      expect(code).toEqual(1);
    });
  });

  describe("testing emojiCreate event", () => {
    it("should get callback", () => {
      let emoji: GuildEmoji;
      events.onEmojiCreate((created) => (emoji = created));
      client.emit("emojiCreate", mockDiscord.guildEmoji);
      expect(emoji).toEqual(mockDiscord.guildEmoji);
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit("emojiCreate", mockDiscord.guildEmoji);
      }, DEFAULT_DELAY);
      const created = await events.onceEmojiCreate();
      expect(created).toEqual(mockDiscord.guildEmoji);
    });
  });

  describe("testing emojiDelete event", () => {
    it("should get callback", () => {
      let emoji: GuildEmoji;
      events.onEmojiDelete((created) => (emoji = created));
      client.emit("emojiDelete", mockDiscord.guildEmoji);
      expect(emoji).toEqual(mockDiscord.guildEmoji);
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit("emojiDelete", mockDiscord.guildEmoji);
      }, DEFAULT_DELAY);
      const deleted = await events.onceEmojiDelete();
      expect(deleted).toEqual(mockDiscord.guildEmoji);
    });
  });

  describe("testing emojiUpdate event", () => {
    const oldEmoji = mockDiscord.guildEmoji;
    const newEmoji = mockDiscord.guildEmoji;
    newEmoji.name = "potatoe";

    it("should get callback", () => {
      let _oldEmoji: GuildEmoji;
      let _newEmoji: GuildEmoji;

      events.onEmojiUpdate((oldChannel, newChannel) => {
        _oldEmoji = oldChannel;
        _newEmoji = newChannel;
      });

      client.emit("emojiUpdate", oldEmoji, newEmoji);
      expect(_oldEmoji).toEqual(oldEmoji);
      expect(_newEmoji).toBe(newEmoji);
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit("emojiUpdate", oldEmoji, newEmoji);
      }, DEFAULT_DELAY);
      const [_oldEmoji, _newEmoji] = await events.onceEmojiUpdate();
      expect(_oldEmoji).toEqual(oldEmoji);
      expect(_newEmoji).toBe(newEmoji);
    });
  });

  describe("testing error event", () => {
    const testError = new Error("Fail in connection");
    it("should get callback", () => {
      let emitedError: Error;
      events.onError((error) => (emitedError = error));
      client.emit("error", testError);
      expect(emitedError).toEqual(testError);
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit("error", testError);
      }, DEFAULT_DELAY);
      const error = await events.onceError();
      expect(error).toEqual(testError);
    });
  });
});
