import { Client } from "discord.js";
import { RoleUpdate } from "./RoleUpdate";

export class RoleUpdateHoist extends RoleUpdate {
  constructor(client: Client) {
    super(client);
    this.validator.add((oldRole, newRole) => oldRole.hoist !== newRole.hoist);
  }
}
