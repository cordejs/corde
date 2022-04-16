import { Client } from "discord.js";
import { RoleUpdate } from "./RoleUpdate";

export class RoleUpdateMentionable extends RoleUpdate {
  constructor(client: Client) {
    super(client);
    this.validator.add((oldRole, newRole) => oldRole.mentionable !== newRole.mentionable);
  }
}
