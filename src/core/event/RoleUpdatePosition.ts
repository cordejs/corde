import { Client } from "discord.js";
import { RoleUpdate } from "./RoleUpdate";

export class RoleUpdatePosition extends RoleUpdate {
  constructor(client: Client) {
    super(client);
    this.validator.add((oldRole, newRole) => oldRole.rawPosition !== newRole.rawPosition);
  }
}
