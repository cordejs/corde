import {
  Channel,
  Client,
  Collection,
  Guild,
  GuildEmoji,
  GuildMember,
  MessageReaction,
  PartialGuildMember,
  Role,
  User,
} from "discord.js";
import { EventResume, Events } from "../../src/core/events";
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
    const eventName = "ready";
    it("should get callback", () => {
      let a = 0;
      events.onReady(() => (a = 1));
      client.emit(eventName);
      expect(a).toBe(1);
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit(eventName);
      }, DEFAULT_DELAY);
      const _void = await events.onceReady();
      expect(_void).toBeFalsy();
    });
  });

  describe("testing messageReactionRemoveEmoji event", () => {
    const eventName = "messageReactionRemoveEmoji";
    it("should get callback", () => {
      let _reaction: MessageReaction;
      events.onMessageReactionRemoveEmoji((reaction) => (_reaction = reaction));
      client.emit(eventName, mockDiscord.messageReaction);
      expect(_reaction).toEqual(mockDiscord.messageReaction);
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit(eventName, mockDiscord.messageReaction);
      }, DEFAULT_DELAY);
      let _reaction = await events.onceMessageReactionRemoveEmoji();
      expect(_reaction).toEqual(mockDiscord.messageReaction);
    });
  });

  describe("testing channelCreate event", () => {
    const eventName = "channelCreate";
    it("should get callback", () => {
      let _channel: Channel;
      events.onChannelCreate((channel) => (_channel = channel));
      client.emit(eventName, mockDiscord.channel);
      expect(_channel).toEqual(mockDiscord.channel);
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit(eventName, mockDiscord.channel);
      }, DEFAULT_DELAY);
      const _channel = await events.onceChannelCreate();
      expect(_channel).toEqual(mockDiscord.channel);
    });
  });

  describe("testing channelDelete event", () => {
    const eventName = "channelDelete";
    it("should get callback", () => {
      let _channel: Channel;
      events.onChannelDelete((channel) => (_channel = channel));
      client.emit(eventName, mockDiscord.channel);
      expect(_channel).toEqual(mockDiscord.channel);
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit(eventName, mockDiscord.channel);
      }, DEFAULT_DELAY);
      const _channel = await events.onceChannelDelete();
      expect(_channel).toEqual(mockDiscord.channel);
    });
  });

  describe("testing channelPinsUpdate event", () => {
    const eventName = "channelPinsUpdate";
    it("should get callback", () => {
      let _channel: Channel;
      let _date: Date;
      const now = new Date();
      events.onChannelPinsUpdate((channel, date) => {
        _channel = channel;
        _date = date;
      });
      client.emit(eventName, mockDiscord.channel, now);
      expect(_channel).toEqual(mockDiscord.channel);
      expect(_date).toEqual(now);
    });

    it("should get async once", async () => {
      const now = new Date();
      executeWithDelay(() => {
        client.emit(eventName, mockDiscord.channel, now);
      }, DEFAULT_DELAY);
      const [_channel, _date] = await events.onceChannelPinsUpdate();
      expect(_channel).toEqual(mockDiscord.channel);
      expect(_date).toEqual(now);
    });
  });

  describe("testing channelUpdate event", () => {
    const eventName = "channelUpdate";
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

      client.emit(eventName, oldChannel, newChannel);
      expect(_oldChannel).toEqual(oldChannel);
      expect(_newChannel).toBe(newChannel);
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit(eventName, oldChannel, newChannel);
      }, DEFAULT_DELAY);
      const [_oldChannel, _newChannel] = await events.onceChannelUpdate();
      expect(_oldChannel).toEqual(oldChannel);
      expect(_newChannel).toBe(newChannel);
    });
  });

  describe("testing debug event", () => {
    const eventName = "debug";
    it("should get callback", () => {
      let a = "";
      events.onDebug((argEmited) => (a = argEmited));
      client.emit(eventName, "test");
      expect(a).toEqual("test");
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit(eventName, "test");
      }, DEFAULT_DELAY);
      const testValue = await events.onceDebug();
      expect(testValue).toEqual("test");
    });
  });

  describe("testing roleDelete event", () => {
    const eventName = "roleDelete";
    it("should get callback", () => {
      let deleted: Role;
      events.onRoleDelete((role) => (deleted = role));
      client.emit(eventName, mockDiscord.role);
      expect(deleted).toEqual(mockDiscord.role);
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit(eventName, mockDiscord.role);
      }, DEFAULT_DELAY);
      const deleted = await events.onceRoleDelete();
      expect(deleted).toEqual(mockDiscord.role);
    });
  });

  describe("testing disconnect event", () => {
    const eventName = "disconnect";
    it("should get callback", () => {
      let closeEvent: CloseEvent;
      let code = 0;
      events.onDisconnect((event, _code) => {
        closeEvent = event;
        code = _code;
      });
      client.emit(eventName, {}, 1);
      expect(closeEvent).toEqual({});
      expect(code).toEqual(1);
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit(eventName, {}, 1);
      }, DEFAULT_DELAY);

      const [closeEvent, code] = await events.onceDisconnect();

      expect(closeEvent).toEqual({});
      expect(code).toEqual(1);
    });
  });

  describe("testing emojiCreate event", () => {
    const eventName = "emojiCreate";
    it("should get callback", () => {
      let emoji: GuildEmoji;
      events.onEmojiCreate((created) => (emoji = created));
      client.emit(eventName, mockDiscord.guildEmoji);
      expect(emoji).toEqual(mockDiscord.guildEmoji);
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit(eventName, mockDiscord.guildEmoji);
      }, DEFAULT_DELAY);
      const created = await events.onceEmojiCreate();
      expect(created).toEqual(mockDiscord.guildEmoji);
    });
  });

  describe("testing emojiDelete event", () => {
    const eventName = "emojiDelete";
    it("should get callback", () => {
      let emoji: GuildEmoji;
      events.onEmojiDelete((created) => (emoji = created));
      client.emit(eventName, mockDiscord.guildEmoji);
      expect(emoji).toEqual(mockDiscord.guildEmoji);
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit(eventName, mockDiscord.guildEmoji);
      }, DEFAULT_DELAY);
      const deleted = await events.onceEmojiDelete();
      expect(deleted).toEqual(mockDiscord.guildEmoji);
    });
  });

  describe("testing emojiUpdate event", () => {
    const eventName = "emojiUpdate";
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

      client.emit(eventName, oldEmoji, newEmoji);
      expect(_oldEmoji).toEqual(oldEmoji);
      expect(_newEmoji).toBe(newEmoji);
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit(eventName, oldEmoji, newEmoji);
      }, DEFAULT_DELAY);
      const [_oldEmoji, _newEmoji] = await events.onceEmojiUpdate();
      expect(_oldEmoji).toEqual(oldEmoji);
      expect(_newEmoji).toBe(newEmoji);
    });
  });

  describe("testing error event", () => {
    const eventName = "error";
    const testError = new Error("Fail in connection");
    it("should get callback", () => {
      let emitedError: Error;
      events.onError((error) => (emitedError = error));
      client.emit(eventName, testError);
      expect(emitedError).toEqual(testError);
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit(eventName, testError);
      }, DEFAULT_DELAY);
      const error = await events.onceError();
      expect(error).toEqual(testError);
    });
  });

  describe("testing guildBanAdd event", () => {
    const eventName = "guildBanAdd";
    it("should get callback", () => {
      let _guild: Guild;
      let _user: User;
      events.onGuildBan((guild, user) => {
        _guild = guild;
        _user = user;
      });
      client.emit(eventName, mockDiscord.guild, mockDiscord.user);
      expect(_guild).toEqual(mockDiscord.guild);
      expect(_user).toEqual(mockDiscord.user);
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit(eventName, mockDiscord.guild, mockDiscord.user);
      }, DEFAULT_DELAY);
      const [_guild, _user] = await events.onceGuildBan();
      expect(_guild).toEqual(mockDiscord.guild);
      expect(_user).toBe(mockDiscord.user);
    });
  });

  describe("testing guildBanRemove event", () => {
    const eventName = "guildBanRemove";
    it("should get callback", () => {
      let _guild: Guild;
      let _user: User;
      events.onGuildBanRemove((guild, user) => {
        _guild = guild;
        _user = user;
      });
      client.emit(eventName, mockDiscord.guild, mockDiscord.user);
      expect(_guild).toEqual(mockDiscord.guild);
      expect(_user).toEqual(mockDiscord.user);
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit(eventName, mockDiscord.guild, mockDiscord.user);
      }, DEFAULT_DELAY);
      const [_guild, _user] = await events.onceGuildBanRemove();
      expect(_guild).toEqual(mockDiscord.guild);
      expect(_user).toBe(mockDiscord.user);
    });
  });

  describe("testing guildCreate event", () => {
    const eventName = "guildCreate";
    it("should get callback", () => {
      let created: Guild;
      events.onGuildCreate((guild) => (created = guild));
      client.emit(eventName, mockDiscord.guild);
      expect(created).toEqual(mockDiscord.guild);
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit(eventName, mockDiscord.guild);
      }, DEFAULT_DELAY);
      const created = await events.onceGuildCreate();
      expect(created).toEqual(mockDiscord.guild);
    });
  });

  describe("testing guildDelete event", () => {
    const eventName = "guildDelete";
    it("should get callback", () => {
      let deleted: Guild;
      events.onGuildDelete((guild) => (deleted = guild));
      client.emit(eventName, mockDiscord.guild);
      expect(deleted).toEqual(mockDiscord.guild);
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit(eventName, mockDiscord.guild);
      }, DEFAULT_DELAY);
      const deleted = await events.onceGuildDelete();
      expect(deleted).toEqual(mockDiscord.guild);
    });
  });

  describe("testing guildMemberAdd event", () => {
    const eventName = "guildMemberAdd";
    it("should get callback", () => {
      let memberAdded: GuildMember;
      events.onGuildMemberAdd((guild) => (memberAdded = guild));
      client.emit(eventName, mockDiscord.guildMember);
      expect(memberAdded).toEqual(mockDiscord.guildMember);
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit(eventName, mockDiscord.guildMember);
      }, DEFAULT_DELAY);
      const memberAdded = await events.onceGuildMemberAdd();
      expect(memberAdded).toEqual(mockDiscord.guildMember);
    });
  });

  describe("testing guildMemberAvailable event", () => {
    const eventName = "guildMemberAvailable";
    it("should get callback", () => {
      let memberAdded: GuildMember | PartialGuildMember;
      events.onGuildMemberAvailable((guild) => (memberAdded = guild));
      client.emit(eventName, mockDiscord.guildMember);
      expect(memberAdded).toEqual(mockDiscord.guildMember);
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit(eventName, mockDiscord.guildMember);
      }, DEFAULT_DELAY);
      const memberAdded = await events.onceGuildMemberAvailable();
      expect(memberAdded).toEqual(mockDiscord.guildMember);
    });
  });

  describe("testing guildMemberRemove event", () => {
    const eventName = "guildMemberRemove";
    it("should get callback", () => {
      let memberAdded: GuildMember | PartialGuildMember;
      events.onGuildMemberRemove((guild) => (memberAdded = guild));
      client.emit(eventName, mockDiscord.guildMember);
      expect(memberAdded).toEqual(mockDiscord.guildMember);
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit(eventName, mockDiscord.guildMember);
      }, DEFAULT_DELAY);
      const memberAdded = await events.onceGuildMemberRemove();
      expect(memberAdded).toEqual(mockDiscord.guildMember);
    });
  });

  describe("testing guildMemberChunk event", () => {
    const eventName = "guildMembersChunk";

    const eventResume: EventResume = {
      count: 1,
      index: 0,
      nonce: "",
    };

    it("should get callback", () => {
      let _members: Collection<string, GuildMember>;
      let _guild: Guild;
      let _resume: EventResume;

      events.onGuildMemberChunk((members, guild, resume) => {
        _members = members;
        _guild = guild;
        _resume = resume;
      });

      client.emit(eventName, mockDiscord.guildMemberCollection, mockDiscord.guild, eventResume);
      expect(_members).toEqual(mockDiscord.guildMemberCollection);
      expect(_guild).toEqual(mockDiscord.guild);
      expect(_resume).toEqual(eventResume);
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit(eventName, mockDiscord.guildMemberCollection, mockDiscord.guild, eventResume);
      }, DEFAULT_DELAY);

      const [_members, _guild, _resume] = await events.onceGuildMemberChunk();
      expect(_members).toEqual(mockDiscord.guildMemberCollection);
      expect(_guild).toEqual(mockDiscord.guild);
      expect(_resume).toEqual(eventResume);
    });
  });
});
