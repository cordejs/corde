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
      const promise = events.onceReady();
      client.emit(eventName);
      const _void = await promise;
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
      const promise = events.onceMessageReactionRemoveEmoji();
      client.emit(eventName, mockDiscord.messageReaction);
      const _reaction = await promise;
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
      const promise = events.onceChannelCreate();
      client.emit(eventName, mockDiscord.channel);
      const _channel = await promise;
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
      const promise = events.onceChannelDelete();
      client.emit(eventName, mockDiscord.channel);
      const _channel = await promise;
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
      const promise = events.onceChannelPinsUpdate();
      client.emit(eventName, mockDiscord.channel, now);
      const [_channel, _date] = await promise;
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

      events.onChannelUpdate((oldReceived, newReceived) => {
        _oldChannel = oldReceived;
        _newChannel = newReceived;
      });

      client.emit(eventName, oldChannel, newChannel);
      expect(_oldChannel).toEqual(oldChannel);
      expect(_newChannel).toBe(newChannel);
    });

    it("should get async once", async () => {
      const promise = events.onceChannelUpdate();
      client.emit(eventName, oldChannel, newChannel);
      const [_oldChannel, _newChannel] = await promise;
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
      const promise = events.onceDebug();
      client.emit(eventName, "test");
      const testValue = await promise;
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
      const promise = events.onceRoleDelete();
      client.emit(eventName, mockDiscord.role);
      const deleted = await promise;
      expect(deleted).toEqual(mockDiscord.role);
    });

    it("should get async once with roleIdentifier", async () => {
      const promise = events.onceRoleDelete({ id: mockDiscord.role.id });
      client.emit(eventName, mockDiscord.role);
      const deleted = await promise;
      expect(deleted).toEqual(mockDiscord.role);
    });

    it("should fail when get async once with roleIdentifier", async () => {
      expect(async () => {
        const promise = events.onceRoleDelete({ id: "123" }, 10);
        client.emit(eventName, mockDiscord.role);
        await promise;
      }).rejects.toBeTruthy();
    });

    it("should get role without specify", async () => {
      const promise = events.onceRoleDelete({ id: mockDiscord.role.id });
      client.emit(eventName, mockDiscord.role);
      const deleted = await promise;
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
      const promise = events.onceDisconnect();
      client.emit(eventName, {}, 1);
      const [closeEvent, code] = await promise;
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
      const promise = events.onceEmojiCreate();
      client.emit(eventName, mockDiscord.guildEmoji);
      const created = await promise;
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
      const promise = events.onceEmojiDelete();
      client.emit(eventName, mockDiscord.guildEmoji);
      const deleted = await promise;
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
      const promise = events.onceEmojiUpdate();
      client.emit(eventName, oldEmoji, newEmoji);
      const [_oldEmoji, _newEmoji] = await promise;
      expect(_oldEmoji).toEqual(oldEmoji);
      expect(_newEmoji).toBe(newEmoji);
    });
  });

  describe("testing error event", () => {
    const eventName = "error";
    it("should get callback", () => {
      let emitedError: Error;
      events.onError((error) => (emitedError = error));
      client.emit(eventName, new Error("Fail in connection"));
      expect(emitedError).toBeInstanceOf(Error);
    });

    it("should get async once", async () => {
      const promise = events.onceError();
      client.emit(eventName, new Error("Fail in connection"));
      const error = await promise;
      expect(error).toBeInstanceOf(Error);
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
      const promise = events.onceGuildBan();
      client.emit(eventName, mockDiscord.guild, mockDiscord.user);
      const [_guild, _user] = await promise;
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
      const promise = events.onceGuildBanRemove();
      client.emit(eventName, mockDiscord.guild, mockDiscord.user);
      const [_guild, _user] = await promise;
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
      const promise = events.onceGuildCreate();
      client.emit(eventName, mockDiscord.guild);
      const created = await promise;
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
      const promise = events.onceGuildDelete();
      client.emit(eventName, mockDiscord.guild);
      const deleted = await promise;
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
      const promise = events.onceGuildMemberAdd();
      client.emit(eventName, mockDiscord.guildMember);
      const memberAdded = await promise;
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
      const promise = events.onceGuildMemberAvailable();
      client.emit(eventName, mockDiscord.guildMember);
      const memberAdded = await promise;
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
      const promise = events.onceGuildMemberRemove();
      client.emit(eventName, mockDiscord.guildMember);
      const memberAdded = await promise;
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
      const promise = events.onceGuildMemberChunk();
      client.emit(eventName, mockDiscord.guildMemberCollection, mockDiscord.guild, eventResume);
      const [_members, _guild, _resume] = await promise;
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
      const promise = events.onceGuildMemberSpeaking();

      client.emit(eventName, mockDiscord.guildMember, mockDiscord.speaking);
      const [_guildMember, _speaking] = await promise;

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
      const promise = events.onceGuildMemberUpdate();

      client.emit(eventName, mockDiscord.guildMember, updatedGuildMember);
      const [_oldGuildMember, _newGuildMember] = await promise;

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
      const promise = events.onceGuildUnavailable();
      client.emit(eventName, mockDiscord.guild);
      const guild = await promise;
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

      const promise = events.onceGuildUpdate();
      client.emit(eventName, mockDiscord.guild, updatedGuild);
      const [_oldGuild, _newGuild] = await promise;

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
      const promise = events.onceMessage();
      client.emit(eventName, mockDiscord.message);
      const message = await promise;
      expect(message).toEqual(mockDiscord.message);
    });

    it("should get async once with messageIdentifier", async () => {
      const promise = events.onceMessage(mockDiscord.message.author.id);
      client.emit(eventName, mockDiscord.message);
      const message = await promise;
      expect(message).toEqual(mockDiscord.message);
    });

    it("should fail when get async once with messageIdentifier", async () => {
      expect(async () => {
        const promise = events.onceMessage("123", null, 10);
        client.emit(eventName, mockDiscord.message);
        await promise;
      }).rejects.toBeTruthy();
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
      const promise = events.onceMessageDelete();
      client.emit(eventName, mockDiscord.message);
      const message = await promise;
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
      const promise = events.onceMessageDeleteBulk();
      client.emit(eventName, mockDiscord.messageCollection);
      const messages = await promise;
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
      const promise = events.onceMessageReactionAdd();
      client.emit(eventName, mockDiscord.messageReaction, mockDiscord.user);
      const [_reaction, _author] = await promise;
      expect(_reaction).toEqual(mockDiscord.messageReaction);
      expect(_author).toEqual(mockDiscord.user);
    });
  });

  describe("testing onceMessageReactionsAdd", () => {
    const eventName = "messageReactionAdd";
    it("should get without inform filter", async () => {
      const promise = events.onceMessageReactionsAdd();
      client.emit(eventName, mockDiscord.messageReaction, mockDiscord.user);
      const reactionsWithAuthors = await promise;
      const [_reaction, _author] = reactionsWithAuthors[0];
      expect(_reaction).toEqual(mockDiscord.messageReaction);
      expect(_author).toEqual(mockDiscord.user);
    });

    it("should get without informing emoji and messageIdentifier", async () => {
      const promise = events.onceMessageReactionsAdd({
        emojis: [mockDiscord.messageReaction.emoji],
        messageIdentifier: {
          id: mockDiscord.messageReaction.message.id,
        },
        authorId: mockDiscord.user.id,
      });
      client.emit(eventName, mockDiscord.messageReaction, mockDiscord.user);
      const reactionsWithAuthors = await promise;
      const [_reaction, _author] = reactionsWithAuthors[0];
      expect(_reaction).toEqual(mockDiscord.messageReaction);
      expect(_author).toEqual(mockDiscord.user);
    });
  });

  describe("testing onceMessagePinned", () => {
    const eventName = "messageUpdate";
    it("should return message pinned without filter", async () => {
      const promise = events.onceMessagePinned();
      const updatedMessage = Object.assign({}, mockDiscord.unPinnedMessage);
      updatedMessage.pinned = true;
      client.emit(eventName, mockDiscord.unPinnedMessage, updatedMessage);
      const message = await promise;
      expect(message).toEqual(updatedMessage);
    });

    it("should return message pinned filter", async () => {
      const promise = events.onceMessagePinned({
        id: mockDiscord.unPinnedMessage.id,
      });
      const updatedMessage = Object.assign({}, mockDiscord.unPinnedMessage);
      updatedMessage.pinned = true;
      client.emit(eventName, mockDiscord.unPinnedMessage, updatedMessage);
      const message = await promise;
      expect(message).toEqual(updatedMessage);
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
      const promise = events.onceMessageReactionRemove();
      client.emit(eventName, mockDiscord.messageReaction, mockDiscord.user);
      const [_reaction, _author] = await promise;
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
      const promise = events.onceMessageReactionRemoveAll();
      client.emit(eventName, mockDiscord.message);
      const message = await promise;
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

      const promise = events.onceMessageUpdate();
      client.emit(eventName, mockDiscord.message, updatedMessage);
      const [_oldMessage, _newMessage] = await promise;
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

      const promise = events.oncePresenceUpdate();
      client.emit(eventName, mockDiscord.presence, updatedPresence);
      const [_oldPresence, _newPresence] = await promise;
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
      const promise = events.onceRoleCreate();
      client.emit(eventName, mockDiscord.role);
      const role = await promise;
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
      const promise = events.onceRoleUpdate();
      client.emit(eventName, mockDiscord.role, updatedRole);
      const [_oldRole, _newRole] = await promise;
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
      const promise = events.onceRolePermissionUpdate({ id: updatedRole.id });
      client.emit(eventName, mockDiscord.role, updatedRole);
      const newRole = await promise;
      expect(newRole).toEqual(updatedRole);
    });

    it("should wait for updates in a role based on it's name", async () => {
      const promise = events.onceRolePermissionUpdate({ name: updatedRole.name });
      client.emit(eventName, mockDiscord.role, updatedRole);
      const newRole = await promise;
      expect(newRole).toEqual(updatedRole);
    });

    it("should wait for updates in a role based on it's id and name", async () => {
      const promise = events.onceRolePermissionUpdate({
        id: updatedRole.id,
        name: updatedRole.name,
      });
      client.emit(eventName, mockDiscord.role, updatedRole);
      const newRole = await promise;
      expect(newRole).toEqual(updatedRole);
    });

    it("should throw timeout for waiting", () => {
      expect(async () => {
        const promise = events.onceRolePermissionUpdate({ name: "potatoe" }, 100);
        client.emit(eventName, mockDiscord.role, updatedRole);
        await promise;
      }).rejects.toBeTruthy();
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
      const promise = events.onceTypingStart();
      client.emit(eventName, mockDiscord.channel, mockDiscord.user);
      const [_channel, _user] = await promise;
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
      const promise = events.onceUserUpdate();
      client.emit(eventName, mockDiscord.user, updatedUser);
      const [_oldUser, _newUser] = await promise;
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

      const promise = events.onceVoiceStateUpdate();
      client.emit(eventName, mockDiscord.voiceState, updatedVoiceState);
      const [_oldRole, _newRole] = await promise;
      expect(_oldRole).toEqual(mockDiscord.voiceState);
      expect(_newRole).toEqual(updatedVoiceState);
    });
  });

  describe("testing onceRoleRenamed", () => {
    const eventName = "roleUpdate";
    const updatedRole = Object.assign({}, mockDiscord.role);
    updatedRole.name = "online";
    it("should get renamed role using roleIdentifier", async () => {
      const promise = events.onceRoleRenamed({ id: mockDiscord.role.id });

      // This should be skiped because do not match with roleIdentifier
      const toSkipRole = Object.assign({}, mockDiscord.role);
      toSkipRole.id = mockDiscord.generateId();
      client.emit(eventName, toSkipRole, toSkipRole);

      client.emit(eventName, mockDiscord.role, updatedRole);

      const updated = await promise;
      expect(updated).toEqual(updatedRole);
    });

    it("should get renamed role not using roleIdentifier", async () => {
      const promise = events.onceRoleRenamed();
      client.emit(eventName, mockDiscord.role, updatedRole);
      const updated = await promise;
      expect(updated).toEqual(updatedRole);
    });
  });
});
