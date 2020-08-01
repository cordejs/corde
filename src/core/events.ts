import { Client, MessageReaction } from "discord.js";
import { BehaviorSubject } from "rxjs";

export class Events {
  /**
   * Emitted when the client becomes ready to start working.
   * @param callBack Operation to be executed after client becomes ready.
   */
  public get onReady() {
    return this._onReady.asObservable();
  }

  /**
   * Emitted when a **bot** removes a emoji from a message;
   */
  public get onMessageReactionRemoveEmoji() {
    return this._onMessageReactionRemoveEmoji.asObservable();
  }

  protected readonly _client: Client;

  private _onReady: BehaviorSubject<boolean>;
  private _onMessageReactionRemoveEmoji: BehaviorSubject<MessageReaction>;

  constructor() {
    this._client = new Client();
    this._initObservables();
    this._initEvents();
  }

  private _initObservables() {
    this._onReady = new BehaviorSubject<boolean>(false);
    this._onMessageReactionRemoveEmoji = new BehaviorSubject<MessageReaction>(null);
  }

  private _initEvents() {
    this._initReadyEvent();
    this._initMessageReactionRemoveEmojiEvent();
  }

  private _initReadyEvent() {
    this._client.on("ready", () => {
      this._onReady.next(true);
    });
  }

  private _initMessageReactionRemoveEmojiEvent() {
    this._client.on("messageReactionRemoveEmoji", (reaction) => {
      this._onMessageReactionRemoveEmoji.next(reaction);
    });
  }
}
