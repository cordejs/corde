import { Message, MessageReaction, PartialUser, Role, User } from "discord.js";
import { CordeBot } from "../../src/core";
import { TimeoutError } from "../../src/errors";
import MockDiscord from "./mockDiscord";

/**
 * @internal
 */
export class MockEvents {
  constructor(private _corde: CordeBot, private _mockDiscord: MockDiscord) {}

  /**
   * @internal
   */
  mockOnceRoleDelete(role?: Role) {
    this._corde.events.onceRoleDelete = jest.fn().mockReturnValue(role ?? this._mockDiscord.role);
  }

  /**
   * @internal
   */
  mockOnceRoleRenamed(role?: Role) {
    this._corde.events.onceRoleRenamed = jest.fn().mockReturnValue(role ?? this._mockDiscord.role);
  }

  /**
   * @internal
   */
  mockOnceRolePositionUpdate(role?: Role) {
    this._corde.events.onceRolePositionUpdate = jest
      .fn()
      .mockReturnValue(role ?? this._mockDiscord.role);
  }

  /**
   * @internal
   */
  mockOnceHoistUpdate(role?: Role) {
    this._corde.events.onceRoleHoistUpdate = jest
      .fn()
      .mockReturnValue(role ?? this._mockDiscord.role);
  }

  /**
   * @internal
   */
  mockOnceMentionableUpdate(role?: Role) {
    this._corde.events.onceRoleMentionableUpdate = jest
      .fn()
      .mockReturnValue(role ?? this._mockDiscord.role);
  }

  /**
   * @internal
   */
  mockOnceRolePermissionsUpdate(role?: Role) {
    this._corde.events.onceRolePermissionUpdate = jest
      .fn()
      .mockReturnValue(role ?? this._mockDiscord.role);
  }

  /**
   * @internal
   */
  mockOnceRoleUpdateColor(role?: Role) {
    this._corde.events.onceRoleUpdateColor = jest
      .fn()
      .mockReturnValue(role ?? this._mockDiscord.role);
  }

  /**
   * @internal
   */
  mockOnceMessageReactionsAdd(reactionsWithAuthors?: [MessageReaction, User | PartialUser][]) {
    this._corde.events.onceMessageReactionsAdd = jest
      .fn()
      .mockReturnValue(
        reactionsWithAuthors ?? [[this._mockDiscord.messageReaction, this._mockDiscord.user]],
      );
  }

  /**
   * @internal
   */
  mockOnceMessageReactionsRemove(reactionsWithAuthors?: [MessageReaction, User | PartialUser][]) {
    this._corde.events.onceMessageReactionsRemove = jest
      .fn()
      .mockReturnValue(
        reactionsWithAuthors ?? [[this._mockDiscord.messageReaction, this._mockDiscord.user]],
      );
  }

  /**
   * @internal
   */
  mockOnceMessageReactionsAddToReject(error?: Error) {
    this._corde.events.onceMessageReactionsAdd = jest.fn().mockImplementation(() => {
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
    this._corde.events.onceMessageReactionsRemove = jest.fn().mockImplementation(() => {
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
    this._corde.events.onceMessageContentOrEmbedChange = jest
      .fn()
      .mockReturnValue(message ?? this._mockDiscord.message);
  }

  /**
   * @internal
   */
  mockOnceMessagePinned(message?: Message) {
    this._corde.events.onceMessagePinned = jest
      .fn()
      .mockReturnValue(message ?? this._mockDiscord.pinnedMessage);
  }

  /**
   * @internal
   */
  mockOnceMessageUnPinned(message?: Message) {
    this._corde.events.onceMessageUnPinned = jest
      .fn()
      .mockReturnValue(message ?? this._mockDiscord.unPinnedMessage);
  }
}
