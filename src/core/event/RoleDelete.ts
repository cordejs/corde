import { Client, Role } from "discord.js";
import { executePromiseWithTimeout } from "../../utils/executePromiseWithTimeout";
import { Validator } from "../../utils/validator";
import { DiscordEvent } from "./common/DiscordEvent";

export class RoleDelete extends DiscordEvent<"roleDelete", corde.IRoleEventFilter> {
  constructor(client: Client) {
    super(client, "roleDelete");
  }

  once(options?: corde.IRoleEventFilter) {
    const validator = new Validator<[Role]>();

    if (options?.id || options?.name) {
      validator.add((role) => this.roleMatchRoleData({ id: options.id, name: options.name }, role));
    }

    if (options?.guild) {
      validator.add((role) => this.getGuildValidation(role.guild, options.guild));
    }

    return executePromiseWithTimeout((resolve) => {
      this.on((deletedRole) => {
        if (validator.isValid(deletedRole)) {
          resolve(deletedRole);
        }
      });
    }, options?.timeout);
  }
}
