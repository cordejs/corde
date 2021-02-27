import { Role } from "discord.js";
import { CordeBot } from "../../src/core";
import MockDiscord from "./mockDiscord";

export class MockEvents {
  constructor(private _corde: CordeBot, private _mockDiscord: MockDiscord) {}

  mockOnceRoleDelete(role?: Role) {
    this._corde.events.onceRoleDelete = jest.fn().mockReturnValue(role ?? this._mockDiscord.role);
  }
}
