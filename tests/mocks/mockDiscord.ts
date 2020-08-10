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
} from "discord.js";

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
 */
export default class MockDiscord {
  private _id!: string;
  private _message!: Message;
  private _client!: Client;
  private _guild!: Guild;
  private _channel!: Channel;
  private _guildChannel!: GuildChannel;
  private _textChannel!: TextChannel;
  private _user!: User;
  private _userBot!: User;
  private _guildMember!: GuildMember;
  private _guildManager: GuildManager;
  private _messageCollection!: Collection<string, Message>;
  private _messageReaction!: MessageReaction;
  private _messageReactionCollection!: Collection<string, MessageReaction>;

  /**
   * Initialize all mocks
   * @description To reset all. call *resetMocks*
   */
  constructor() {
    this.init();
  }

  private init() {
    this.mockId();
    this.mockClient();
    this.mockGuild();
    this.mockChannel();
    this.mockGuildChannel();
    this.mockTextChannel();
    this.mockUsers();
    this.mockGuildMember();
    this.mockMessage();
    this.mockMessageCollection();
    this.mockReaction();
    this.mockMessageReactionCollection();
  }

  /**
   * Get a mocked instance of Client
   */
  public get client(): Client {
    return this._client;
  }

  /**
   * Shortcut for **this.guild.id**
   */
  public get guildId() {
    return this._guild.id;
  }

  /**
   * Get a mocked instance of Guild
   */
  public get guild(): Guild {
    return this._guild;
  }

  /**
   * Shortcut for **this.channel.id**
   */
  public get channelId() {
    return this._channel.id;
  }

  /**
   * Get a mocked instance of Channel
   */
  public get channel(): Channel {
    return this._channel;
  }

  /**
   * Get a mocked instance of GuildChannel
   */
  public get guildChannel(): GuildChannel {
    return this._guildChannel;
  }

  /**
   * Get a mocked instance of TextChannel
   */
  public get textChannel(): TextChannel {
    return this._textChannel;
  }

  /**
   * Get a mocked instance of User
   */
  public get user(): User {
    return this._user;
  }

  public get userBot() {
    return this._userBot;
  }

  /**
   * Get a mocked instance of GuildMember
   */
  public get guildMember(): GuildMember {
    return this._guildMember;
  }

  /**
   * Get a mocked instance of Message
   */
  public get message(): Message {
    return this._message;
  }

  /**
   * Get a mocked instance of GuildManager
   */
  public get guildManager() {
    return this._guildManager;
  }

  /**
   * Get a mocked instance of Collection<string, Message>
   * the content in this collection is **message**
   */
  public get messageCollection() {
    return this._messageCollection;
  }

  /**
   * Get a message reaction mock. The reaction
   * is for **this.message**
   */
  public get messageReaction() {
    return this._messageReaction;
  }

  /**
   * Shortcut for **this.messageReaction.emoji.name**
   */
  public get messageReactionEmojiName() {
    return this._messageReaction.emoji.name;
  }

  /**
   * Get a message reaction collection for **this.reaction**
   */
  public get messageReactionCollection() {
    return this._messageReactionCollection;
  }

  /**
   * Get a id generated with *SnowflakeUtil.generate()*
   */
  public get id() {
    return this._id;
  }

  /**
   * Shortcut for *this.user.id*
   */
  public get userId() {
    return this._user.id;
  }

  /**
   * Shortcut for *this.userbot.id*
   */
  public get userBotId() {
    return this._userBot.id;
  }

  /**
   * Recreates all mocks
   */
  public resetMocks() {
    this.init();
  }

  /**
   * Encapsulation for *SnowflakeUtil.generate()*
   */
  public generateId() {
    return SnowflakeUtil.generate();
  }

  private mockClient(): void {
    this._client = new Client();
  }

  private mockId() {
    this._id = SnowflakeUtil.generate();
  }

  private mockGuild(): void {
    this._guild = new Guild(this._client, {
      unavailable: false,
      id: SnowflakeUtil.generate(),
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

  private mockChannel(): void {
    this._channel = new Channel(this._client, {
      id: "channel-id",
    });
  }

  private mockGuildChannel(): void {
    this._guildChannel = new GuildChannel(this._guild, {
      ...this._channel,
      name: "guild-channel",
      position: 1,
      parent_id: "123456789",
      permission_overwrites: [],
    });
  }

  private mockTextChannel(): void {
    this._textChannel = new TextChannel(this._guild, {
      ...this._guildChannel,
      topic: "topic",
      nsfw: false,
      last_message_id: "123456789",
      lastPinTimestamp: new Date("2019-01-01").getTime(),
      rate_limit_per_user: 0,
    });
  }

  /**
   * Mock **this.botUser** or **this.user**
   * @param isBot Define witch user should mock
   */
  private mockUsers(): void {
    this._user = this.createUserMock(false);
    this._userBot = this.createUserMock(true);
  }

  private createUserMock(isBot: boolean) {
    return new User(this._client, {
      id: SnowflakeUtil.generate(),
      username: "UserCorde",
      discriminator: "user#0101",
      avatar: "user avatar url",
      bot: isBot,
    });
  }

  private mockGuildMember(): void {
    this._guildMember = new GuildMember(
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

  private mockMessageCollection() {
    this._messageCollection = new Collection<string, Message>();
    this._messageCollection.set(this._message.id, this._message);
  }

  private mockMessageReactionCollection() {
    this._messageReactionCollection = new Collection<string, MessageReaction>();
    this._messageReactionCollection.set(this._messageReaction.message.id, this._messageReaction);
  }

  private mockMessage(): void {
    this._message = new Message(
      this._client,
      {
        id: SnowflakeUtil.generate(),
        type: "DEFAULT",
        content: "this is the message content",
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
  }

  private mockReaction() {
    this._messageReaction = new MessageReaction(
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
      this._message,
    );
  }
}
