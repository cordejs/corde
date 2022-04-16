import { Client } from "discord.js";
import { RoleUpdate } from "./RoleUpdate";

export class RoleRenamed extends RoleUpdate {
  constructor(client: Client) {
    super(client);
    this.validator.add((oldRole, newRole) => oldRole.name !== newRole.name);
  }
}
