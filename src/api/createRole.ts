import { runtime } from "../common";
import { CordeClientError } from "../errors";
import { Role } from "../structures/role";
import { BaseRole } from "../types";

/**
 * Creates a new role to the guild provided in configs.
 *
 * @param roleData Basic informations about the role.
 * @see https://corde.netlify.app/docs/configurations#guildid
 * @throws CordeClientError if corde has not yet connect it's bot.
 * @returns A promise that return the created role.
 * @since 2.1
 */
export async function createRole(roleData: BaseRole) {
  if (!runtime.isBotLoggedIn()) {
    throw new CordeClientError("Bot is not connected yet. Can not create a role");
  }

  try {
    const createdRole = await runtime.bot.roleManager.create({ data: roleData });
    return new Role(createdRole);
  } catch (error) {
    throw Error("Could not create the role. " + error);
  }
}
