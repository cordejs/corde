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
  mockOnceRoleUpdateColor(role?: Role) {
    this._corde.events.onceRoleUpdateColor = jest
      .fn()
      .mockReturnValue(role ?? this._mockDiscord.role);
  }
}
