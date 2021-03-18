import { Role } from "discord.js";
import { CordeBot } from "../../src/core";
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
}
