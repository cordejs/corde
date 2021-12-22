import {
  Client,
  Guild,
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
  RoleManager,
  GuildEmoji,
  Speaking,
  Presence,
  PresenceStatus,
  ActivityType,
  VoiceState,
} from "discord.js";
import { ColorsHex } from "../../src";
import { messageUtils } from "../../src/command/matches/message/messageUtils";
import { ObjectLike } from "../../src/types";

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
  private _guildEmoji!: GuildEmoji;
  private _channel!: Channel;
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
  private _speaking!: Speaking;
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
  get client(): Client {
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
  get guild(): Guild {
    return this._guild;
  }

  /**
   * Shortcut for **this.channel.id**
   */
  get channelId() {
    return this._channel.id;
  }

  /**
   * Get a mocked instance of Channel
   */
  get channel(): Channel {
    return this._channel;
  }

  /**
   * Get a mocked instance of GuildChannel
   */
  get guildChannel(): GuildChannel {
    return this._guildChannel;
  }

  /**
   * Get a mocked instance of TextChannel
   */
  get textChannel(): TextChannel {
    return this._textChannel;
  }

  /**
   * Get a mocked instance of User
   */
  get user(): User {
    return this._user;
  }

  get userBot() {
    return this._userBot;
  }

  /**
   * Get a mocked instance of GuildMember
   */
  get guildMember(): GuildMember {
    return this._guildMember;
  }

  /**
   * Get a mocked instance of Message
   */
  get message(): Message {
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
   * Shortcut for *this.userbot.id*
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

  get speaking() {
    return this._speaking;
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
    return collection.array()[index];
  }

  private init() {
    this._id = this.createMockId();
    this._client = this.createMockClient();
    this._guild = this.createMockGuild();

    this._channel = this.createMockChannel();
    this._textChannel = this.createMockTextChannel();
    this._messageManager = this.createMockMessageManager();
    this.textChannel.messages = this._messageManager;

    this._guildChannel = this.createMockGuildChannel();
    this._user = this.createUserMock(false);
    this._userBot = this.createUserMock(true);

    this._guildMember = this.createMockGuildMember();
    this._message = this.createMockMessage();
    this._messageCollection = this.createMockMessageCollection();

    this._unPinnedMessage = this.createMockUnPinnedMessage();
    this._pinnedMessage = this.createMockPinnedMessage();

    this._messageReaction = this.createMockMessageReaction();
    this._isolatedMessageReaction = this.createIsolatedMockMessageReaction();
    this._messageReactionCollection = this.createMockMessageReactionCollection();

    this._messageEmbedSimple = this.createEmbedMessageLike();
    this._messageEmbed = this.createMockMessageEmbed();
    this._messageWithEmbed = this.createMockMessageWithEmbed();

    this._messageEmbedCollection = this.createMockMessageEmbedCollection();
    this._role = this.createMockRole();

    this._roleManager = this.createMockRoleManager();
    this._guildEmoji = this.createGuildEmoji();
    this._guildMemberCollection = this.createGuildMemberCollection();

    this._presence = this.createPresence();

    this._textChannelCollection = this.createMockTextChannelCollection();
    this._channelCollection = this.createMockChannelCollection();
    this._guildCollection = this.createMockGuildCollection();
  }

  createMockClient() {
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
      restSweepInterval: 0,
    });
  }

  createMockId() {
    return SnowflakeUtil.generate();
  }

  createMockGuild() {
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
      afkTimeout: 1000,
      afk_channel_id: "afk-channel-id",
      system_channel_id: "system-channel-id",
      embed_enabled: true,
      verification_level: 2,
      explicit_content_filter: 3,
      mfa_level: 8,
      joined_at: new Date("2018-01-01").getTime(),
      owner_id: "owner-id",
      channels: [],
      roles: [],
      presences: [],
      voice_states: [],
      emojis: [],
    });
  }

  createMockChannel() {
    return new Channel(this._client, {
      id: "124123124123124",
    });
  }

  createMockGuildChannel() {
    return new GuildChannel(this._guild, {
      ...this._channel,
      name: "guild-channel",
      position: 1,
      parent_id: "123456789",
      permission_overwrites: [],
    });
  }

  createGuildEmoji(emojiData?: GuildEmojiData) {
    const data: GuildEmojiData = {
      animated: false,
      name: "exampleEmoji",
      id: this.generateId(),
      deleted: false,
    };
    return new GuildEmoji(this._client, emojiData ?? data, this.guild);
  }

  createGuildMemberCollection() {
    const col = new Collection<string, GuildMember>();
    col.set(this.guildMember.id, this.guildMember);
    return col;
  }

  createMockTextChannel() {
    return new TextChannel(this._guild, {
      ...this._guildChannel,
      topic: "topic",
      nsfw: false,
      last_message_id: "123456789",
      lastPinTimestamp: new Date("2019-01-01").getTime(),
      rate_limit_per_user: 0,
    });
  }

  createUserMock(isBot: boolean) {
    return new User(this._client, {
      id: "529112540350652502",
      username: "UserCorde",
      discriminator: "user#0101",
      avatar: "user avatar url",
      bot: isBot,
    });
  }

  createMockGuildMember() {
    return new GuildMember(
      this._client,
      {
        deaf: false,
        mute: false,
        self_mute: false,
        self_deaf: false,
        session_id: "session-id",
        channel_id: "channel-id",
        nick: "nick",
        joined_at: new Date("2020-01-01").getTime(),
        user: this._user,
        roles: [],
      },
      this._guild,
    );
  }

  createMockMessageCollection() {
    const collection = new Collection<string, Message>();
    collection.set(this._message.id, this._message);

    const msg = this.createMockMessage("Hi");
    msg.id = "1232142";

    collection.set(msg.id, msg);

    return collection;
  }

  createMockMessageReactionCollection() {
    const collection = new Collection<string, MessageReaction>();
    collection.set(this._messageReaction.emoji.name, this._messageReaction);
    return collection;
  }

  createMockMessage(customMessage = "this is the message content") {
    const msg = new Message(
      this._client,
      {
        id: "125332540654650541",
        type: "DEFAULT",
        content: customMessage,
        author: this._user,
        webhook_id: null,
        member: this._guildMember,
        pinned: false,
        tts: false,
        nonce: "nonce",
        embeds: [],
        attachments: [],
        edited_timestamp: null,
        reactions: [],
        mentions: [],
        mention_roles: [],
        mention_everyone: [],
        hit: false,
      },
      this._textChannel,
    );

    return msg;
  }

  createMockPinnedMessage() {
    const msg = this.createMockMessage();
    msg.pinned = true;
    return msg;
  }

  createMockUnPinnedMessage() {
    const msg = this.createMockMessage();
    msg.pinned = false;
    return msg;
  }

  createMockMessageWithEmbed() {
    const msg = this.createMockMessage();
    msg.embeds.push(this._messageEmbed);
    msg.content = "";
    return msg;
  }

  createMockMessageReaction(customEmoji = "😀") {
    return new MessageReaction(
      this._client,
      {
        emoji: {
          animated: false,
          name: customEmoji,
          id: "312322220410652501",
          deleted: false,
        },
        me: false,
        count: 1,
      },
      this._message,
    );
  }

  createIsolatedMockMessageReaction() {
    const message = this.createMockMessage();
    return new MessageReaction(
      this._client,
      {
        emoji: {
          animated: false,
          name: "😀",
          id: SnowflakeUtil.generate(),
          deleted: false,
        },
        me: false,
        count: 1,
      },
      message,
    );
  }

  createMockMessageManager() {
    return new MessageManager(this._textChannel);
  }

  createMockMessageEmbedCollection() {
    const collection = new Collection<string, MessageEmbed>();
    collection.set("123352640350652502", this._messageEmbed);
    collection.set("329762565356654501", this.createMockMessageEmbed(ColorsHex.DARK_BLUE, "test"));
    return collection;
  }

  createEmbedMessageLike(
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
      files: ["https://i.imgur.com/wSTFkRM.png"],
    };
  }

  createMockMessageEmbed(customColor = ColorsHex.DARK_BLUE, customTitle = "Some title") {
    let embed = messageUtils.embedMessageInterfaceToMessageEmbed(this._messageEmbedSimple);

    if (!embed) {
      embed = new MessageEmbed();
    }

    embed.setColor(customColor);
    embed.setTitle(customTitle);

    return embed;
  }

  createMockRole(customName = "WE DEM BOYZZ!!!!!! 1", permissionBitField = 66321471) {
    const role = new Role(
      this._client,
      {
        id: "819382540350652502",
        name: customName,
        color: 3447003,
        hoist: true,
        position: 1,
        rawPosition: 1,
        permissions: permissionBitField,
        permissions_new: permissionBitField,
        // Make it false will resolve in a null pointer error.
        // This is a workaround because I don't have patience to fix it, sorry
        managed: true,
        mentionable: false,
        deleted: false,
      },
      this._guild,
    );
    return role;
  }

  createSpeaking() {
    return new Speaking(1);
  }

  createPresence() {
    const activityData: ActivityData = {
      application_id: this.generateId(),
      name: "test",
      timestamp: new Date(),
      type: "COMPETING",
      details: undefined,
      party: undefined,
      state: undefined,
      url: undefined,
    };

    const presenceData: PresenceData = {
      status: "online",
      activities: [activityData],
      user: this._user,
      guild: this._guild,
    };

    return new Presence(this._client, presenceData);
  }

  emitRoleDelete(role?: Role) {
    this._client.emit("roleDelete", role ?? this.role);
  }

  createVoiceState() {
    const voiceData: VoiceStateData = {
      user_id: this.generateId(),
    };

    return new VoiceState(this.guild, voiceData);
  }

  createMockTextChannelCollection() {
    const channels: [string, TextChannel][] = [];
    for (let index = 0; index < 5; index++) {
      const channel = this.createMockTextChannel();
      channel.name = "randomName" + index;
      channel.id = "123221" + index;
      channels.push([channel.id, channel]);
    }

    const freezed: Readonly<[string, TextChannel][]> = Object.freeze(channels);
    return new Collection<string, TextChannel>(freezed);
  }

  createMockGuildCollection() {
    const guilds: [string, Guild][] = [];
    for (let index = 0; index < 5; index++) {
      const guild = this.createMockGuild();
      guild.name = "randomName" + index;
      guild.id = "123221" + index;
      guilds.push([guild.id, guild]);
    }

    const freezed: Readonly<[string, Guild][]> = Object.freeze(guilds);
    return new Collection<string, Guild>(freezed);
  }

  createMockChannelCollection() {
    return this.createMockTextChannelCollection() as Collection<string, Channel>;
  }

  createMockRoleManager() {
    const manager = new RoleManager(this._guild);
    manager.add(this._role, true);

    // Workaround for rawPosition change after add to manager
    const rawPosition = manager.cache.first();
    if (rawPosition) {
      rawPosition.rawPosition = 1;
    }

    const newRole = this.createMockRole("batata 2");
    newRole.id = "123321";
    manager.add(newRole, true);

    const cachedNewRole = manager.cache.find((r) => r.id === newRole.id);

    if (cachedNewRole) {
      cachedNewRole.rawPosition = 2;
    }

    return manager;
  }
}
