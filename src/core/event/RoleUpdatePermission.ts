import { Client } from "discord.js";
import { RoleUpdate } from "./RoleUpdate";

export class RoleUpdatePermission extends RoleUpdate {
  constructor(client: Client) {
    super(client);
  }

  once(filter: corde.IRolePermissionUpdateFilter) {
    return super.once(filter);
  }
}
