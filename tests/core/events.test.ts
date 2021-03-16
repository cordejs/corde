import {
  Channel,
  Client,
  Collection,
  Guild,
  GuildEmoji,
  GuildMember,
  Message,
  MessageReaction,
  PartialDMChannel,
  PartialGuildMember,
  PartialMessage,
  PartialUser,
  Presence,
  Role,
  Speaking,
  User,
  VoiceState,
} from "discord.js";
import { EventResume, Events } from "../../src/core/events";
import MockDiscord from "../mocks/mockDiscord";
import { executeWithDelay } from "../testHelper";

const client = new Client();
const mockDiscord = new MockDiscord();
let events: Events;

const DEFAULT_DELAY = 10;

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

    it("should throw due to timeout", () => {
      expect(events.onceRoleDelete(null, 10)).rejects.toBeTruthy();
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

  // TODO: Fiz this tests
  // describe("testing error event", () => {
  //   const eventName = "error";
  //   it("should get callback", () => {
  //     let emitedError: Error;
  //     events.onError((error) => (emitedError = error));
  //     client.emit(eventName, new Error("Fail in connection"));
  //     expect(emitedError).toBeInstanceOf(Error);
  //   });

  //   it("should get async once", async () => {
  //     executeWithDelay(() => {
  //       client.emit(eventName, new Error("Fail in connection"));
  //     }, DEFAULT_DELAY);
  //     const error = await events.onceError();
  //     expect(error).toBeInstanceOf(Error);
  //   });
  // });

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

  describe("testing onGuildMemberSpeaking", () => {
    const eventName = "guildMemberSpeaking";
    it("should get callback", () => {
      let _guildMember: GuildMember | PartialGuildMember;
      let _speaking: Readonly<Speaking>;
      events.onGuildMemberSpeaking((guildMember, speaking) => {
        _guildMember = guildMember;
        _speaking = speaking;
      });
      client.emit(eventName, mockDiscord.guildMember, mockDiscord.speaking);
      expect(_guildMember).toEqual(mockDiscord.guildMember);
      expect(_speaking).toEqual(mockDiscord.speaking);
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit(eventName, mockDiscord.guildMember, mockDiscord.speaking);
      }, DEFAULT_DELAY);

      const [_guildMember, _speaking] = await events.onceGuildMemberSpeaking();

      expect(_guildMember).toEqual(mockDiscord.guildMember);
      expect(_speaking).toEqual(mockDiscord.speaking);
    });
  });

  describe("testing guildMemberUpdate event", () => {
    const eventName = "guildMemberUpdate";
    it("should get callback", () => {
      let _oldGuildMember: GuildMember | PartialGuildMember;
      let _newGuildMember: GuildMember;
      events.onGuildMemberUpdate((oldGuildMember, newGuildMember) => {
        _oldGuildMember = oldGuildMember;
        _newGuildMember = newGuildMember;
      });
      const updatedGuildMember = mockDiscord.guildMember;
      updatedGuildMember.nickname = "test";
      client.emit(eventName, mockDiscord.guildMember, updatedGuildMember);
      expect(_oldGuildMember).toEqual(mockDiscord.guildMember);
      expect(_newGuildMember).toEqual(updatedGuildMember);
    });

    it("should get async once", async () => {
      const updatedGuildMember = mockDiscord.guildMember;
      updatedGuildMember.nickname = "test";

      executeWithDelay(() => {
        client.emit(eventName, mockDiscord.guildMember, updatedGuildMember);
      }, DEFAULT_DELAY);

      const [_oldGuildMember, _newGuildMember] = await events.onceGuildMemberUpdate();
      expect(_oldGuildMember).toEqual(mockDiscord.guildMember);
      expect(_newGuildMember).toEqual(updatedGuildMember);
    });
  });

  describe("testing guildUnavailable event", () => {
    const eventName = "guildUnavailable";
    it("should get callback", () => {
      let _guild: Guild;
      events.onGuildUnavailable((guild) => (_guild = guild));
      client.emit(eventName, mockDiscord.guild);
      expect(_guild).toEqual(mockDiscord.guild);
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit(eventName, mockDiscord.guild);
      }, DEFAULT_DELAY);
      const guild = await events.onceGuildUnavailable();
      expect(guild).toEqual(mockDiscord.guild);
    });
  });

  describe("testing guildUpdate event", () => {
    const eventName = "guildUpdate";
    it("should get callback", () => {
      let _oldGuild: Guild;
      let _newGuild: Guild;
      events.onGuildUpdate((oldGuild, newGuild) => {
        _oldGuild = oldGuild;
        _newGuild = newGuild;
      });
      const updatedGuild = Object.assign({}, mockDiscord.guild);
      updatedGuild.name = "test";
      client.emit(eventName, mockDiscord.guild, updatedGuild);
      expect(_oldGuild).toEqual(mockDiscord.guild);
      expect(_newGuild).toEqual(updatedGuild);
    });

    it("should get async once", async () => {
      const updatedGuild = Object.assign({}, mockDiscord.guild);
      updatedGuild.name = "test";

      executeWithDelay(() => {
        client.emit(eventName, mockDiscord.guild, updatedGuild);
      }, DEFAULT_DELAY);

      const [_oldGuild, _newGuild] = await events.onceGuildUpdate();
      expect(_oldGuild).toEqual(mockDiscord.guild);
      expect(_newGuild).toEqual(updatedGuild);
    });
  });

  describe("testing message event", () => {
    const eventName = "message";
    it("should get callback", () => {
      let _message: Message;
      events.onMessage((message) => (_message = message));
      client.emit(eventName, mockDiscord.message);
      expect(_message).toEqual(mockDiscord.message);
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit(eventName, mockDiscord.message);
      }, DEFAULT_DELAY);
      const message = await events.onceMessage();
      expect(message).toEqual(mockDiscord.message);
    });
  });

  describe("testing messageDelete event", () => {
    const eventName = "messageDelete";
    it("should get callback", () => {
      let _message: Message | PartialMessage;
      events.onMessageDelete((message) => (_message = message));
      client.emit(eventName, mockDiscord.message);
      expect(_message).toEqual(mockDiscord.message);
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit(eventName, mockDiscord.message);
      }, DEFAULT_DELAY);
      const message = await events.onceMessageDelete();
      expect(message).toEqual(mockDiscord.message);
    });
  });

  describe("testing messageDeleteBulk event", () => {
    const eventName = "messageDeleteBulk";
    it("should get callback", () => {
      let _messages: Collection<string, Message | PartialMessage>;
      events.onMessageDeleteBulk((messages) => (_messages = messages));
      client.emit(eventName, mockDiscord.messageCollection);
      expect(_messages).toEqual(mockDiscord.messageCollection);
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit(eventName, mockDiscord.messageCollection);
      }, DEFAULT_DELAY);
      const messages = await events.onceMessageDeleteBulk();
      expect(messages).toEqual(mockDiscord.messageCollection);
    });
  });

  describe("testing messageReactionAdd event", () => {
    const eventName = "messageReactionAdd";
    it("should get callback", () => {
      let _reaction: MessageReaction;
      let _author: User | PartialUser;
      events.onMessageReactionAdd((reaction, author) => {
        _reaction = reaction;
        _author = author;
      });
      client.emit(eventName, mockDiscord.messageReaction, mockDiscord.user);
      expect(_reaction).toEqual(mockDiscord.messageReaction);
      expect(_author).toEqual(mockDiscord.user);
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit(eventName, mockDiscord.messageReaction, mockDiscord.user);
      }, DEFAULT_DELAY);
      const [_reaction, _author] = await events.onceMessageReactionAdd();
      expect(_reaction).toEqual(mockDiscord.messageReaction);
      expect(_author).toEqual(mockDiscord.user);
    });
  });

  describe("testing messageReactionRemove event", () => {
    const eventName = "messageReactionRemove";
    it("should get callback", () => {
      let _reaction: MessageReaction;
      let _author: User | PartialUser;
      events.onMessageReactionRemove((reaction, author) => {
        _reaction = reaction;
        _author = author;
      });
      client.emit(eventName, mockDiscord.messageReaction, mockDiscord.user);
      expect(_reaction).toEqual(mockDiscord.messageReaction);
      expect(_author).toEqual(mockDiscord.user);
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit(eventName, mockDiscord.messageReaction, mockDiscord.user);
      }, DEFAULT_DELAY);
      const [_reaction, _author] = await events.onceMessageReactionRemove();
      expect(_reaction).toEqual(mockDiscord.messageReaction);
      expect(_author).toEqual(mockDiscord.user);
    });
  });

  describe("testing messageReactionRemoveAll event", () => {
    const eventName = "messageReactionRemoveAll";
    it("should get callback", () => {
      let _message: Message | PartialMessage;
      events.onMessageReactionRemoveAll((messages) => (_message = messages));
      client.emit(eventName, mockDiscord.message);
      expect(_message).toEqual(mockDiscord.message);
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit(eventName, mockDiscord.message);
      }, DEFAULT_DELAY);
      const message = await events.onceMessageReactionRemoveAll();
      expect(message).toEqual(mockDiscord.message);
    });
  });

  describe("testing messageUpdate event", () => {
    const eventName = "messageUpdate";
    it("should get callback", () => {
      let _oldMessage: Message | PartialMessage;
      let _newMessage: Message | PartialMessage;
      events.onMessageUpdate((oldGuild, newGuild) => {
        _oldMessage = oldGuild;
        _newMessage = newGuild;
      });
      const updatedMessage = Object.assign({}, mockDiscord.message);
      updatedMessage.content = "test";
      client.emit(eventName, mockDiscord.message, updatedMessage);
      expect(_oldMessage).toEqual(mockDiscord.message);
      expect(_newMessage).toEqual(updatedMessage);
    });

    it("should get async once", async () => {
      const updatedMessage = Object.assign({}, mockDiscord.message);
      updatedMessage.content = "test";

      executeWithDelay(() => {
        client.emit(eventName, mockDiscord.message, updatedMessage);
      }, DEFAULT_DELAY);

      const [_oldMessage, _newMessage] = await events.onceMessageUpdate();
      expect(_oldMessage).toEqual(mockDiscord.message);
      expect(_newMessage).toEqual(updatedMessage);
    });
  });

  describe("testing presenceUpdate event", () => {
    const eventName = "presenceUpdate";
    it("should get callback", () => {
      let _oldPresence: Presence;
      let _newPresence: Presence;
      events.onPresenceUpdate((oldPresence, newPresence) => {
        _oldPresence = oldPresence;
        _newPresence = newPresence;
      });
      const updatedPresence = Object.assign({}, mockDiscord.presence);
      updatedPresence.status = "online";
      client.emit(eventName, mockDiscord.presence, updatedPresence);
      expect(_oldPresence).toEqual(mockDiscord.presence);
      expect(_newPresence).toEqual(updatedPresence);
    });

    it("should get async once", async () => {
      const updatedPresence = Object.assign({}, mockDiscord.presence);
      updatedPresence.status = "online";

      executeWithDelay(() => {
        client.emit(eventName, mockDiscord.presence, updatedPresence);
      }, DEFAULT_DELAY);

      const [_oldPresence, _newPresence] = await events.oncePresenceUpdate();
      expect(_oldPresence).toEqual(mockDiscord.presence);
      expect(_newPresence).toEqual(updatedPresence);
    });
  });

  describe("testing roleCreate event", () => {
    const eventName = "roleCreate";
    it("should get callback", () => {
      let _role: Role;
      events.onRoleCreate((role) => (_role = role));
      client.emit(eventName, mockDiscord.role);
      expect(_role).toEqual(mockDiscord.role);
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit(eventName, mockDiscord.role);
      }, DEFAULT_DELAY);
      const role = await events.onceRoleCreate();
      expect(role).toEqual(mockDiscord.role);
    });
  });

  describe("testing roleUpdate event", () => {
    const eventName = "roleUpdate";
    it("should get callback", () => {
      let _oldRole: Role;
      let _newRole: Role;
      events.onRoleUpdate((oldRole, newRole) => {
        _oldRole = oldRole;
        _newRole = newRole;
      });
      const updatedRole = Object.assign({}, mockDiscord.role);
      updatedRole.name = "online";

      client.emit(eventName, mockDiscord.role, updatedRole);
      expect(_oldRole).toEqual(mockDiscord.role);
      expect(_newRole).toEqual(updatedRole);
    });

    it("should get async once", async () => {
      const updatedRole = Object.assign({}, mockDiscord.role);
      updatedRole.name = "online";

      executeWithDelay(() => {
        client.emit(eventName, mockDiscord.role, updatedRole);
      }, DEFAULT_DELAY);

      const [_oldRole, _newRole] = await events.onceRoleUpdate();
      expect(_oldRole).toEqual(mockDiscord.role);
      expect(_newRole).toEqual(updatedRole);
    });
  });

  describe("testing onceRolePermissionUpdate", () => {
    const eventName = "roleUpdate";
    const updatedRole = mockDiscord.createMockRole("test", 0);
    updatedRole.id = mockDiscord.role.id;
    updatedRole.name = mockDiscord.role.name;

    it("should wait for updates in a role based on it's id", async () => {
      executeWithDelay(() => {
        client.emit(eventName, mockDiscord.role, updatedRole);
      }, DEFAULT_DELAY);

      const newRole = await events.onceRolePermissionUpdate({ id: updatedRole.id });
      expect(newRole).toEqual(updatedRole);
    });

    it("should wait for updates in a role based on it's name", async () => {
      executeWithDelay(() => {
        client.emit(eventName, mockDiscord.role, updatedRole);
      }, DEFAULT_DELAY);

      const newRole = await events.onceRolePermissionUpdate({ name: updatedRole.name });
      expect(newRole).toEqual(updatedRole);
    });

    it("should wait for updates in a role based on it's id and name", async () => {
      executeWithDelay(() => {
        client.emit(eventName, mockDiscord.role, updatedRole);
      }, DEFAULT_DELAY);

      const newRole = await events.onceRolePermissionUpdate({
        id: updatedRole.id,
        name: updatedRole.name,
      });
      expect(newRole).toEqual(updatedRole);
    });

    it("should throw timeout for waiting", () => {
      executeWithDelay(() => {
        client.emit(eventName, mockDiscord.role, updatedRole);
      }, DEFAULT_DELAY);

      expect(() => events.onceRolePermissionUpdate({ name: "potatoe" }, 100)).rejects.toBeTruthy();
    });
  });

  describe("testing typingStart event", () => {
    const eventName = "typingStart";
    it("should get callback", () => {
      let _channel: Channel | PartialDMChannel;
      let _user: User | PartialUser;
      events.onTypingStart((channel, user) => {
        _channel = channel;
        _user = user;
      });
      client.emit(eventName, mockDiscord.channel, mockDiscord.user);
      expect(_channel).toEqual(mockDiscord.channel);
      expect(_user).toEqual(mockDiscord.user);
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit(eventName, mockDiscord.channel, mockDiscord.user);
      }, DEFAULT_DELAY);

      const [_channel, _user] = await events.onceTypingStart();
      expect(_channel).toEqual(mockDiscord.channel);
      expect(_user).toEqual(mockDiscord.user);
    });
  });

  describe("testing userUpdate event", () => {
    const eventName = "userUpdate";
    const updatedUser = Object.assign({}, mockDiscord.user);
    updatedUser.avatar = "online";

    it("should get callback", () => {
      let _oldUser: User | PartialUser;
      let _newUser: User;
      events.onUserUpdate((oldUser, newUser) => {
        _oldUser = oldUser;
        _newUser = newUser;
      });

      client.emit(eventName, mockDiscord.user, updatedUser);
      expect(_oldUser).toEqual(mockDiscord.user);
      expect(_newUser).toEqual(updatedUser);
    });

    it("should get async once", async () => {
      executeWithDelay(() => {
        client.emit(eventName, mockDiscord.user, updatedUser);
      }, DEFAULT_DELAY);

      const [_oldUser, _newUser] = await events.onceUserUpdate();
      expect(_oldUser).toEqual(mockDiscord.user);
      expect(_newUser).toEqual(updatedUser);
    });
  });

  describe("testing voiceStateUpdate event", () => {
    const eventName = "voiceStateUpdate";
    const updatedVoiceState = Object.assign({}, mockDiscord.voiceState);
    updatedVoiceState.selfDeaf = true;
    it("should get callback", () => {
      let _oldVoiceState: VoiceState;
      let _newVoiceState: VoiceState;
      events.onVoiceStateUpdate((oldMember, newMember) => {
        _oldVoiceState = oldMember;
        _newVoiceState = newMember;
      });

      client.emit(eventName, mockDiscord.voiceState, updatedVoiceState);
      expect(_oldVoiceState).toEqual(mockDiscord.voiceState);
      expect(_newVoiceState).toEqual(updatedVoiceState);
    });

    it("should get async once", async () => {
      const updatedRole = Object.assign({}, mockDiscord.role);
      updatedRole.name = "online";

      executeWithDelay(() => {
        client.emit(eventName, mockDiscord.voiceState, updatedVoiceState);
      }, DEFAULT_DELAY);

      const [_oldRole, _newRole] = await events.onceVoiceStateUpdate();
      expect(_oldRole).toEqual(mockDiscord.voiceState);
      expect(_newRole).toEqual(updatedVoiceState);
    });
  });

  describe("testing onceRoleRenamed", () => {
    const eventName = "roleUpdate";
    const updatedRole = Object.assign({}, mockDiscord.role);
    updatedRole.name = "online";
    it("should get renamed role using roleData", async () => {
      // This should be skiped because do not match with roleData
      executeWithDelay(() => {
        const toSkipRole = Object.assign({}, mockDiscord.role);
        toSkipRole.id = mockDiscord.generateId();
        client.emit(eventName, toSkipRole, toSkipRole);
      }, DEFAULT_DELAY);

      executeWithDelay(() => {
        client.emit(eventName, mockDiscord.role, updatedRole);
      }, DEFAULT_DELAY + 100);

      const updated = await events.onceRoleRenamed({ id: mockDiscord.role.id });
      expect(updated).toEqual(updatedRole);
    });

    it("should get renamed role not using roleData", async () => {
      executeWithDelay(() => {
        client.emit(eventName, mockDiscord.role, updatedRole);
      }, DEFAULT_DELAY);

      const updated = await events.onceRoleRenamed();
      expect(updated).toEqual(updatedRole);
    });
  });
});
