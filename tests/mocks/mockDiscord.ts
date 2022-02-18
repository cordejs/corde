import {
  Client,
  Channel,
  GuildChannel,
  TextChannel,
  User,
  GuildMember,
  Message,
  GuildManager,
  Collection,
  MessageReaction,
  SnowflakeUtil,
  MessageManager,
  MessageEmbed,
  Role,
  Typing,
  RoleManager,
  GuildEmoji,
  Presence,
  PresenceStatus,
  ActivityType,
  VoiceState,
  Guild,
  PartialUser,
  BaseGuildTextChannel,
  Intents,
  GuildBan,
} from "discord.js";
import { ColorsHex } from "../../src";
import {
  PresenceUpdateStatus,
  ChannelType,
  APIUser,
  MessageType,
  APIGuildMember,
  APIEmbedAuthor,
  APIRole,
} from "discord-api-types/v9";

import { ObjectLike } from "../../src/types";
import { collectionToArray } from "../../src/utils/collectionToArray";
import { Fake } from "./fake";
import { RawGuildBanData } from "discord.js/typings/rawDataTypes";

/**
 * @private
 */
export interface GuildEmojiData {
  animated: boolean;
  name: string;
  id: string;
  deleted: boolean;
}

export interface ActivityData {
  name: string;
  type: ActivityType;
  url?: string;
  details?: string;
  state?: string;
  application_id: string;
  timestamp: Date;
  party?: ObjectLike;
}

export interface PresenceData {
  user: User;
  guild?: Guild;
  status: PresenceStatus;
  activities: ActivityData[];
}

export interface VoiceStateData {
  user_id: string;
  deaf?: boolean;
  mute?: boolean;
  self_deaf?: boolean;
  self_mute?: boolean;
  self_video?: boolean;
  session_id?: string;
  self_streaming?: boolean;
}

/**
 * Initialize mock values for Discord namespace
 * This can be used to get dumb data for tests.
 *
 * @example
 * const mockDiscord = new MockDiscord()
 * mockDiscord.message.awaitReactions = jest
 *       .fn()
 *       .mockReturnValue(mockDiscord.messageReactionCollection);
 *
 *
 * @internal
 */
export default class MockDiscord {
  private _id!: string;
  private _message!: Message;
  private _messageEmbed!: MessageEmbed;
  private _client!: Client;
  private _guild!: Guild;
  private _guildBan!: GuildBan;
  private _guildEmoji!: GuildEmoji;
  private _typing!: Typing;
  private _guildChannel!: GuildChannel;
  private _textChannel!: TextChannel;
  private _user!: User;
  private _userBot!: User;
  private _guildMember!: GuildMember;
  private _guildManager!: GuildManager;
  private _messageReaction!: MessageReaction;
  private _isolatedMessageReaction!: MessageReaction;
  private _messageCollection!: Collection<string, Message>;
  private _messageEmbedCollection!: Collection<string, MessageEmbed>;
  private _messageReactionCollection!: Collection<string, MessageReaction>;
  private _guildMemberCollection!: Collection<string, GuildMember>;
  private _messageManager!: MessageManager;
  private _role!: Role;
  private _roleManager!: RoleManager;
  private _presence!: Presence;
  private _voiceState!: VoiceState;
  private _messageEmbedSimple!: corde.IMessageEmbed;
  private _messageWithEmbed!: Message;
  private _pinnedMessage!: Message;
  private _unPinnedMessage!: Message;
  private _textChannelCollection!: Collection<string, TextChannel>;
  private _guildCollection!: Collection<string, Guild>;
  private _channelCollection!: Collection<string, Channel>;

  /**
   * Initialize all mocks
   * @description To reset all. call *resetMocks*
   */
  constructor() {
    this.init();
  }

  /**
   * Get a mocked instance of Client
   */
  get client() {
    return this._client;
  }

  /**
   * Shortcut for **this.guild.id**
   */
  get guildId() {
    return this._guild.id;
  }

  /**
   * Get a mocked instance of Guild
   */
  get guild() {
    return this._guild;
  }

  get guildBan() {
    return this._guildBan;
  }

  get typing() {
    return this._typing;
  }

  /**
   * Get a mocked instance of GuildChannel
   */
  get guildChannel() {
    return this._guildChannel;
  }

  /**
   * Get a mocked instance of TextChannel
   */
  get textChannel() {
    return this._textChannel;
  }

  /**
   * Get a mocked instance of User
   */
  get user() {
    return this._user;
  }

  get userBot() {
    return this._userBot;
  }

  /**
   * Get a mocked instance of GuildMember
   */
  get guildMember() {
    return this._guildMember;
  }

  /**
   * Get a mocked instance of Message
   */
  get message() {
    return this._message;
  }

  /**
   * Get a mocked instance of GuildManager
   */
  get guildManager() {
    return this._guildManager;
  }

  /**
   * Get a mocked instance of Collection<string, Message>
   * the content in this collection is **message**
   */
  get messageCollection() {
    return this._messageCollection;
  }

  /**
   * Get a message reaction mock. The reaction
   * is for **this.message**
   */
  get messageReaction() {
    return this._messageReaction;
  }

  /**
   * Get a message reaction mock that is not linked
   * to *this.message*
   */
  get isolatedMessageReaction() {
    return this._isolatedMessageReaction;
  }

  /**
   * Shortcut for **this.messageReaction.emoji.name**
   */
  get messageReactionEmojiName() {
    return this._messageReaction.emoji.name;
  }

  /**
   * Get a message reaction collection for **this.reaction**
   */
  get messageReactionCollection() {
    return this._messageReactionCollection;
  }

  /**
   * Get a id generated with *SnowflakeUtil.generate()*
   */
  get id() {
    return this._id;
  }

  /**
   * Shortcut for *this.user.id*
   */
  get userId() {
    return this._user.id;
  }

  /**
   * Shortcut for *this.userBot.id*
   */
  get userBotId() {
    return this._userBot.id;
  }

  get presence() {
    return this._presence;
  }

  /**
   * Recreates all mocks
   */
  resetMocks() {
    this.init();
  }

  /**
   * Encapsulation for *SnowflakeUtil.generate()*
   */
  generateId() {
    return SnowflakeUtil.generate();
  }

  get messageManager() {
    return this._messageManager;
  }

  get messageEmbed() {
    return this._messageEmbed;
  }

  get messageEmbedCollection() {
    return this._messageEmbedCollection;
  }

  get role() {
    return this._role;
  }

  /**
   * Role manager with some roles added to cache.
   */
  get roleManager() {
    return this._roleManager;
  }

  get guildEmoji() {
    return this._guildEmoji;
  }

  get guildMemberCollection() {
    return this._guildMemberCollection;
  }

  get voiceState() {
    return this._voiceState;
  }

  get messageEmbedSimple() {
    return this._messageEmbedSimple;
  }

  get messageWithEmbed() {
    return this._messageWithEmbed;
  }

  get pinnedMessage() {
    return this._pinnedMessage;
  }

  get unPinnedMessage() {
    return this._unPinnedMessage;
  }

  get textChannelCollection() {
    return this._textChannelCollection;
  }

  get guildCollection() {
    return this._guildCollection;
  }

  get channelCollection() {
    return this._channelCollection;
  }

  get<T extends Collection<K, V>, K, V>(collection: T, index: number) {
    return collectionToArray(collection)[index];
  }

  private init() {
    this._id = this.mockId();
    this._client = this.mockClient() as any as Client;
    this._guild = this.mockGuild();

    this._textChannel = this.mockTextChannel();
    this._messageManager = this.mockMessageManager();
    this.textChannel.messages = this._messageManager as any as import("discord.js").MessageManager;

    this._guildChannel = this.mockGuildChannel();
    this._user = this.mockUser(false);
    this._userBot = this.mockUser(true);

    this._guildMember = this.mockGuildMember();
    this._message = this.mockMessage();
    this._messageCollection = this.mockMessageCollection();

    this._unPinnedMessage = this.mockUnPinnedMessage();
    this._pinnedMessage = this.mockPinnedMessage();

    this._messageReaction = this.mockMessageReaction();
    this._isolatedMessageReaction = this.mockIsolatedMockMessageReaction();
    this._messageReactionCollection = this.mockMessageReactionCollection();

    this._messageEmbedSimple = this.mockEmbedMessageLike();
    this._messageEmbed = this.mockMessageEmbed();
    this._messageWithEmbed = this.mockMessageWithEmbed();

    this._messageEmbedCollection = this.mockMessageEmbedCollection();
    this._role = this.mockRole();

    this._roleManager = this.mockRoleManager();
    this._guildEmoji = this.mockGuildEmoji();
    this._guildMemberCollection = this.mockGuildMemberCollection();

    this._presence = this.mockPresence();

    this._textChannelCollection = this.mockTextChannelCollection();
    this._channelCollection = this.mockChannelCollection();
    this._guildCollection = this.mockGuildCollection();

    this._guildBan = this.mockGuildBan();
  }

  mockClient() {
    /**
     * Initialize without the restSweepInterval was causing timeout error:
     * 
     * at Client.setInterval (node_modules/discord.js/src/client/BaseClient.js:107:22)
      at new RESTManager (node_modules/discord.js/src/rest/RESTManager.js:18:14)
      at new BaseClient (node_modules/discord.js/src/client/BaseClient.js:49:17)
      at new Client (node_modules/discord.js/src/client/Client.js:35:5)
      at createCordeBotWithMockedFunctions (tests/testHelper.ts:82:57)
      at Object.<anonymous> (tests/command/message/messageContentContains.test.ts:84:25)
      at async TestScheduler.scheduleTests (node_modules/@jest/core/build/TestScheduler.js:333:13)
      at async runJest (node_modules/@jest/core/build/runJest.js:404:19)
      at async _run10000 (node_modules/@jest/core/build/cli/index.js:320:7)
      at async runCLI (node_modules/@jest/core/build/cli/index.js:173:3)
     */
    return new Client({
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    });
  }

  mockId() {
    return SnowflakeUtil.generate();
  }

  mockRawGuildBanData(): RawGuildBanData {
    return {
      guild_id: Fake.Id,
      reason: "",
      user: this.mockApiUser(),
    };
  }

  mockGuildBan(): GuildBan {
    // @ts-expect-error
    return new GuildBan(this.mockClient(), this.mockRawGuildBanData(), this.mockGuild());
  }

  mockTyping(): Typing {
    // @ts-ignore
    return new Typing(this.mockTextChannel(), this.mockPartialUser());
  }

  mockPartialUser(): PartialUser {
    return {
      id: Fake.Id,
      partial: true,
      accentColor: 1,
      bannerURL: Fake.Fn,
      avatarURL: Fake.Fn,
      createDM: Fake.FnAsync,
      deleteDM: Fake.FnAsync,
      displayAvatarURL: Fake.Fn,
      hexAccentColor: null,
      username: null,
      equals: Fake.Fn,
      fetch: Fake.FnAsync,
      fetchFlags: Fake.FnAsync,
      send: Fake.FnAsync,
      system: false,
      tag: null,
      toString: Fake.Fn,
      valueOf: Fake.Fn,
      toJSON: Fake.Fn,
      dmChannel: null,
      createdAt: Fake.Date,
      avatar: Fake.AvatarURL,
      client: this.mockClient(),
      createdTimestamp: Fake.Date.getTime(),
      defaultAvatarURL: Fake.AvatarURL,
      discriminator: null,
      flags: null,
      banner: "",
      bot: false,
    };
  }

  mockGuild() {
    // @ts-ignore
    return new Guild(this._client, {
      unavailable: false,
      id: "729334530350652501",
      name: "mocked js guild",
      icon: "mocked guild icon url",
      splash: "mocked guild splash url",
      region: "eu-west",
      member_count: 42,
      large: false,
      features: [],
      application_id: "application-id",
      afk_channel_id: "afk-channel-id",
      system_channel_id: "system-channel-id",
      verification_level: 2,
      explicit_content_filter: 3,
      mfa_level: 8,
      joined_at: Fake.Date.toString(),
      owner_id: "owner-id",
      channels: [],
      roles: [],
      presences: [],
      voice_states: [],
      emojis: [],
    });
  }

  mockTextChannel() {
    // @ts-ignore
    return new TextChannel(
      this.mockGuild(),
      {
        id: "aaaaa",
        permissions: "",
        type: ChannelType.GroupDM,
      },
      this._client,
    );
  }

  mockGuildChannel() {
    // @ts-ignore
    return new BaseGuildTextChannel(this._guild, {
      id: Fake.Id,
      permissions: "",
      type: ChannelType.GroupDM,
    });
  }

  mockGuildEmoji(emojiData?: GuildEmojiData) {
    const data: GuildEmojiData = {
      animated: false,
      name: "exampleEmoji",
      id: this.generateId(),
      deleted: false,
    };
    // @ts-ignore
    return new GuildEmoji(this._client, emojiData ?? data, this._guild);
  }

  mockGuildMemberCollection() {
    const col = new Collection<string, GuildMember>();
    col.set(this.guildMember.id, this._guildMember);
    return col;
  }

  mockApiUser(): APIUser {
    return {
      id: Fake.Id,
      avatar: Fake.AvatarURL,
      discriminator: "1234",
      username: Fake.UserName,
    };
  }

  mockUser(isBot: boolean) {
    // @ts-ignore
    return new User(this._client, {
      id: "529112540350652502",
      username: "UserCorde",
      discriminator: "user#0101",
      avatar: "user avatar url",
      bot: isBot,
    });
  }

  mockGuildMember() {
    // @ts-ignore
    return new GuildMember(
      this._client,
      {
        deaf: false,
        mute: false,
        nick: "nick",
        joined_at: Fake.Date.toString(),
        user: this.mockApiUser(),
        roles: [],
      },
      this._guild,
    );
  }

  mockMessageCollection() {
    const collection = new Collection<string, Message>();
    collection.set(this._message.id, this._message);

    const msg = this.mockMessage("Hi");
    msg.id = "1232142";

    collection.set(msg.id, msg);

    return collection;
  }

  mockApiGuildMember(): APIGuildMember {
    return {
      deaf: false,
      joined_at: Fake.Date.toString(),
      mute: false,
      roles: [],
    };
  }

  mockMessageReactionCollection() {
    const collection = new Collection<string, MessageReaction>();
    collection.set(this._messageReaction.emoji.name ?? "", this._messageReaction);
    return collection;
  }

  mockMessage(customMessage = "this is the message content") {
    // @ts-ignore
    const msg = new Message(this._client, {
      id: "125332540654650541",
      type: MessageType.Call,
      content: customMessage,
      author: this.mockApiUser(),
      webhook_id: "",
      member: this.mockApiGuildMember(),
      pinned: false,
      tts: false,
      nonce: "nonce",
      embeds: [],
      attachments: [],
      edited_timestamp: null,
      reactions: [],
      mentions: [],
      mention_roles: [],
      mention_everyone: false,
      channel_id: Fake.Id,
      timestamp: Fake.Date.toString(),
    });

    return msg;
  }

  mockPinnedMessage() {
    const msg = this.mockMessage();
    msg.pinned = true;
    return msg;
  }

  mockUnPinnedMessage() {
    const msg = this.mockMessage();
    msg.pinned = false;
    return msg;
  }

  mockMessageWithEmbed() {
    const msg = this.mockMessage();
    msg.embeds.push(this._messageEmbed);
    msg.content = "";
    return msg;
  }

  mockMessageReaction(customEmoji = "😀") {
    // @ts-ignore
    return new MessageReaction(
      this._client,
      {
        emoji: {
          animated: false,
          name: customEmoji,
          id: "312322220410652501",
        },
        me: false,
        count: 1,
      },
      this._message,
    );
  }

  mockIsolatedMockMessageReaction() {
    const message = this.mockMessage();
    // @ts-ignore
    return new MessageReaction(
      this._client,
      {
        emoji: {
          animated: false,
          name: "😀",
          id: SnowflakeUtil.generate(),
        },
        me: false,
        count: 1,
      },
      message,
    );
  }

  mockMessageManager() {
    // @ts-ignore
    return new MessageManager(this._textChannel);
  }

  mockMessageEmbedCollection() {
    const collection = new Collection<string, MessageEmbed>();
    collection.set("123352640350652502", this._messageEmbed);
    collection.set("329762565356654501", this.mockMessageEmbed(ColorsHex.DARK_BLUE, "test"));
    return collection;
  }

  mockEmbedMessageLike(
    customColor = ColorsHex.DARK_BLUE,
    customTitle = "Some title",
  ): corde.IMessageEmbed {
    return {
      color: customColor,
      title: customTitle,
      url: "https://discord.js.org/",
      author: {
        name: "Some name",
        url: "https://discord.js.org",
        iconURL: "https://i.imgur.com/wSTFkRM.png",
      },
      description: "Some description here",
      fields: [
        { name: "Regular field title", value: "Some value here", inline: false },
        { name: "\u200B", value: "\u200B", inline: false },
        { name: "Inline field title", value: "Some value here", inline: true },
        { name: "Inline field title", value: "Some value here", inline: true },
      ],
      thumbnailUrl: "https://i.imgur.com/wSTFkRM.png",
    };
  }

  mockApiEmbedAuthor(): APIEmbedAuthor {
    return {
      name: Fake.UserName,
      icon_url: Fake.AvatarURL,
    };
  }

  mockMessageEmbed(customColor = ColorsHex.DARK_BLUE, customTitle = "Some title") {
    const embed = new MessageEmbed({
      author: this.mockApiEmbedAuthor(),
      color: "BLUE",
      timestamp: Fake.Date,
    });
    embed.setColor(customColor);
    embed.setTitle(customTitle);
    return embed;
  }

  mockRole(apiRole?: Partial<APIRole>) {
    // @ts-ignore
    const role = new Role(
      this._client,
      {
        id: apiRole?.id ?? Fake.Id,
        name: apiRole?.name ?? Fake.Name,
        color: apiRole?.color ?? 3447003,
        hoist: apiRole?.hoist ?? true,
        position: apiRole?.position ?? 1,
        permissions: apiRole?.permissions ?? "",
        // Make it false will resolve in a null pointer error.
        // This is a workaround because I don't have patience to fix it, sorry
        managed: apiRole?.managed ?? true,
        mentionable: apiRole?.mentionable ?? false,
      },
      this._guild,
    );
    return role;
  }

  mockPresence() {
    // @ts-ignore
    return new Presence(this._client, {
      status: PresenceUpdateStatus.Online,
      activities: [],
      user: this.mockApiUser(),
      guild_id: Fake.Id,
    });
  }

  emitRoleDelete(role?: Role) {
    this._client.emit("roleDelete", role ?? this._role);
  }

  mockVoiceState() {
    // @ts-ignore
    return new VoiceState(this._guild, {
      channel_id: "123123",
      deaf: false,
      user_id: "12312",
      mute: false,
      request_to_speak_timestamp: "",
      self_deaf: false,
      self_mute: false,
      self_video: false,
      session_id: "2312",
      suppress: false,
    });
  }

  mockTextChannelCollection() {
    const channels: [string, TextChannel][] = [];
    for (let index = 0; index < 5; index++) {
      const channel = this.mockTextChannel();
      channel.name = "randomName" + index;
      channel.id = "123221" + index;
      channels.push([channel.id, channel]);
    }

    const freezed: Readonly<[string, TextChannel][]> = Object.freeze(channels);
    return new Collection<string, TextChannel>(freezed);
  }

  mockGuildCollection() {
    const guilds: [string, Guild][] = [];
    for (let index = 0; index < 5; index++) {
      const guild = this.mockGuild();
      guild.name = "randomName" + index;
      guild.id = "123221" + index;
      guilds.push([guild.id, guild]);
    }

    const freezed: Readonly<[string, Guild][]> = Object.freeze(guilds);
    return new Collection<string, Guild>(freezed);
  }

  mockChannelCollection() {
    return this.mockTextChannelCollection() as Collection<string, Channel>;
  }

  mockApiRole(apiRole?: Partial<APIRole>): APIRole {
    return {
      color: apiRole?.color ?? 0,
      hoist: apiRole?.hoist ?? true,
      id: apiRole?.id ?? Fake.Id,
      managed: apiRole?.managed ?? false,
      mentionable: apiRole?.mentionable ?? false,
      name: apiRole?.name ?? Fake.Name,
      permissions: apiRole?.permissions ?? "",
      position: apiRole?.position ?? 1,
      ...apiRole,
    };
  }

  mockRoleManager() {
    // @ts-ignore
    const manager = new RoleManager(this._guild, [this.mockApiRole()]);

    // Workaround for rawPosition change after add to manager
    const rawPosition = manager.cache.first();
    if (rawPosition) {
      rawPosition.rawPosition = 1;
    }
    return manager;
  }
}
