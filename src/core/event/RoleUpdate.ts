import { Client, Role } from "discord.js";
import { executePromiseWithTimeout } from "../../utils/executePromiseWithTimeout";
import { Validator } from "../../utils/validator";
import { DiscordEvent } from "./common/DiscordEvent";

export class RoleUpdate extends DiscordEvent<"roleUpdate", corde.IRoleEventFilter> {
  protected readonly validator = new Validator<[Role, Role]>();

  constructor(client: Client) {
    super(client, "roleUpdate");
  }

  once(options?: corde.IRoleEventFilter) {
    const validator = new Validator<[Role, Role]>();

    if (options?.id || options?.name) {
      validator.add((_, newRole) =>
        this.roleMatchRoleData({ id: options?.id, name: options?.name }, newRole),
      );
    }

    if (options?.guild) {
      validator.add((role) => this.getRoleValidation(role, options.guild));
    }

    return executePromiseWithTimeout<Role>((resolve) => {
      this.on((oldRole, newRole) => {
        if (validator.isValid(oldRole, newRole)) {
          resolve(newRole);
        }
      });
    }, options?.timeout);
  }
}
