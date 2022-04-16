import { Client } from "discord.js";
import { RoleUpdate } from "./RoleUpdate";

export class RoleUpdateColor extends RoleUpdate {
  constructor(client: Client) {
    super(client);
    this.validator.add((oldRole, newRole) => oldRole.color !== newRole.color);
  }
}
