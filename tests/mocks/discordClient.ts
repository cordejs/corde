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
} from "discord.js";

/**
 * Initialize mock values for Discord.Client
 * This can be used to get dumb data for tests.
 */
export default class MockDiscord {
  private _message!: Message;
  private _client!: Client;
  private _guild!: Guild;
  private _channel!: Channel;
  private _guildChannel!: GuildChannel;
  private _textChannel!: TextChannel;
  private _user!: User;
  private _guildMember!: GuildMember;
  private _guildManager: GuildManager;
  private _messageCollection!: Collection<string, Message>;
  /**
   * Initialize all mocks
   * @description To reset all. call *resetMocks*
   */
  constructor() {
    this.init();
  }

  private init() {
    this.mockClient();
    this.mockGuild();
    this.mockChannel();
    this.mockGuildChannel();
    this.mockTextChannel();
    this.mockUser();
    this.mockGuildMember();
    this.mockMessage();
    this.mockMessageCollection();
  }

  /**
   * Get a mocked instance of Client
   */
  public get client(): Client {
    return this._client;
  }

  /**
   * Get a mocked instance of Guild
   */
  public get guild(): Guild {
    return this._guild;
  }

  /**
   * Recreates all mocks
   */
  public resetMocks() {
    this.init();
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

  private mockClient(): void {
    this._client = new Client();
  }

  private mockGuild(): void {
    this._guild = new Guild(this._client, {
      unavailable: false,
      id: "guild-id",
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

  private mockUser(): void {
    this._user = new User(this._client, {
      id: "user-id",
      username: "user username",
      discriminator: "user#0000",
      avatar: "user avatar url",
      bot: false,
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

  private mockMessage(): void {
    this._message = new Message(
      this._client,
      {
        id: "message-id",
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
}
