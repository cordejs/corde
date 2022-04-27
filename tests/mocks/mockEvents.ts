import { Intents, Message, MessageReaction, PartialUser, Role, User } from "discord.js";
import { ALL_INTENTS } from "../../src/const";
import {
  MessageCreate,
  MessagePinned,
  MessageReactionRemoveEmoji,
  MessageReactionsAdd,
  MessageUnPinned,
  MessageUpdate,
  RoleDelete,
  RoleRenamed,
  RoleUpdateColor,
  RoleUpdateHoist,
  RoleUpdateMentionable,
  RoleUpdatePermission,
  RoleUpdatePosition,
} from "../../src/core/event";
import { eventFactory } from "../../src/core/event/common/eventFactory";
import { TimeoutError } from "../../src/errors";
import { ICordeBot } from "../../src/types";
import MockDiscord from "./mockDiscord";

/**
 * @internal
 */
export class MockEvents {
  constructor(private _corde: ICordeBot, private _mockDiscord: MockDiscord) {}

  /**
   * @internal
   */
  mockOnceRoleDelete(role?: Role) {
    const event = eventFactory.findOrConstruct(RoleDelete, this._corde.client);
    this._corde.client.options.intents = Intents.resolve(ALL_INTENTS);
    event.once = jest.fn().mockReturnValue(role ?? this._mockDiscord.role);
  }

  /**
   * @internal
   */
  mockOnceRoleRenamed(role?: Role) {
    const event = eventFactory.findOrConstruct(RoleRenamed, this._corde.client);
    this._corde.client.options.intents = Intents.resolve(ALL_INTENTS);
    event.once = jest.fn().mockReturnValue(role ?? this._mockDiscord.role);
  }

  /**
   * @internal
   */
  mockOnceRolePositionUpdate(role?: Role) {
    const event = eventFactory.findOrConstruct(RoleUpdatePosition, this._corde.client);
    this._corde.client.options.intents = Intents.resolve(ALL_INTENTS);
    event.once = jest.fn().mockReturnValue(role ?? this._mockDiscord.role);
  }

  /**
   * @internal
   */
  mockOnceHoistUpdate(role?: Role) {
    const event = eventFactory.findOrConstruct(RoleUpdateHoist, this._corde.client);
    this._corde.client.options.intents = Intents.resolve(ALL_INTENTS);
    event.once = jest.fn().mockReturnValue(role ?? this._mockDiscord.role);
  }

  /**
   * @internal
   */
  mockOnceMentionableUpdate(role?: Role) {
    const event = eventFactory.findOrConstruct(RoleUpdateMentionable, this._corde.client);
    this._corde.client.options.intents = Intents.resolve(ALL_INTENTS);
    event.once = jest.fn().mockReturnValue(role ?? this._mockDiscord.role);
  }

  /**
   * @internal
   */
  mockOnceRolePermissionsUpdate(role?: Role) {
    const event = eventFactory.findOrConstruct(RoleUpdatePermission, this._corde.client);
    this._corde.client.options.intents = Intents.resolve(ALL_INTENTS);
    event.once = jest.fn().mockReturnValue(role ?? this._mockDiscord.role);
  }

  /**
   * @internal
   */
  mockOnceRoleUpdateColor(role?: Role) {
    const event = eventFactory.findOrConstruct(RoleUpdateColor, this._corde.client);
    this._corde.client.options.intents = Intents.resolve(ALL_INTENTS);
    event.once = jest.fn().mockReturnValue(role ?? this._mockDiscord.role);
  }

  /**
   * @internal
   */
  mockOnceMessageReactionsAdd(reactionsWithAuthors?: [MessageReaction, User | PartialUser][]) {
    const event = eventFactory.findOrConstruct(MessageReactionsAdd, this._corde.client);
    this._corde.client.options.intents = Intents.resolve(ALL_INTENTS);
    event.once = jest
      .fn()
      .mockReturnValue(
        reactionsWithAuthors ?? [this._mockDiscord.messageReaction, this._mockDiscord.user],
      );
  }

  setAllIntents() {
    this._corde.client.options.intents = Intents.resolve(ALL_INTENTS);
  }

  /**
   * @internal
   */
  mockOnceMessageReactionsRemove(reactionsWithAuthors?: [MessageReaction, User | PartialUser][]) {
    const event = eventFactory.findOrConstruct(MessageReactionRemoveEmoji, this._corde.client);
    this._corde.client.options.intents = Intents.resolve(ALL_INTENTS);
    event.once = jest
      .fn()
      .mockReturnValue(
        reactionsWithAuthors ?? [[this._mockDiscord.messageReaction, this._mockDiscord.user]],
      );
  }

  /**
   * @internal
   */
  mockOnceMessageReactionsAddToReject(error?: Error) {
    const event = eventFactory.findOrConstruct(MessageReactionsAdd, this._corde.client);
    this._corde.client.options.intents = Intents.resolve(ALL_INTENTS);
    event.once = jest.fn().mockImplementation(() => {
      if (error) {
        throw error;
      }

      throw new TimeoutError("timeout", [
        [this._mockDiscord.messageReaction, this._mockDiscord.user],
      ]);
    });
  }

  /**
   * @internal
   */
  mockOnceMessageReactionsRemoveToReject(error?: Error) {
    const event = eventFactory.findOrConstruct(MessageReactionRemoveEmoji, this._corde.client);
    this._corde.client.options.intents = Intents.resolve(ALL_INTENTS);
    event.once = jest.fn().mockImplementation(() => {
      if (error) {
        throw error;
      }

      throw new TimeoutError("timeout", [
        [this._mockDiscord.messageReaction, this._mockDiscord.user],
      ]);
    });
  }

  /**
   * @internal
   */
  mockOnceMessageContentOrEmbedChange(message?: Message) {
    const event = eventFactory.findOrConstruct(MessageUpdate, this._corde.client);
    this._corde.client.options.intents = Intents.resolve(ALL_INTENTS);
    event.once = jest.fn().mockResolvedValue(message ?? this._mockDiscord.message);
  }

  /**
   * @internal
   */
  mockOnceMessagePinned(message?: Message) {
    const event = eventFactory.findOrConstruct(MessagePinned, this._corde.client);
    this._corde.client.options.intents = Intents.resolve(ALL_INTENTS);
    event.once = jest.fn().mockReturnValue(message ?? this._mockDiscord.pinnedMessage);
  }

  /**
   * @internal
   */
  mockOnceMessageUnPinned(message?: Message) {
    const event = eventFactory.findOrConstruct(MessageUnPinned, this._corde.client);
    this._corde.client.options.intents = Intents.resolve(ALL_INTENTS);
    event.once = jest.fn().mockReturnValue(message ?? this._mockDiscord.pinnedMessage);
  }

  /**
   * @internal
   * @deprecated Same of `mockOnceMessageCreate`
   */
  mockOnceMessage(message?: Message) {
    return this.mockOnceMessageCreate(message);
  }

  /**
   * @internal
   *
   */
  mockOnceMessageCreate(message?: Message) {
    const event = eventFactory.findOrConstruct(MessageCreate, this._corde.client);
    this._corde.client.options.intents = Intents.resolve(ALL_INTENTS);
    event.once = jest.fn().mockReturnValue(message ?? this._mockDiscord.pinnedMessage);
  }

  /**
   * @internal
   */
  mockOnceMessageCreateImpl(fn?: (...args: any[]) => any) {
    const event = eventFactory.findOrConstruct(MessageCreate, this._corde.client);
    this._corde.client.options.intents = Intents.resolve(ALL_INTENTS);
    event.once = jest.fn().mockImplementation(fn);
  }
}
