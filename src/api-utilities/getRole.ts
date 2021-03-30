import { RoleIdentifier } from "../types/types";
import { Role } from "discord.js";
import { CordeRole } from "../discord-structures/role";
import { runtime } from "../common/runtime";
import { CordeClientError } from "../errors";

/**
 * Reach for a `role` in the informed guild in settings,
 * basing on it's **id** or **name**.
 *
 * @param id Id of the role.
 * @throws CordeClientError if corde's bot is not connected.
 * @returns Role that matches the provided **id** or **name**
 */
export function getRole(id: string): CordeRole;
/**
 * Reach for a `role` in the informed guild in settings,
 * basing on it's **id** or **name**.
 *
 * @param data Data of the role. It can be it's **name** or **id**.
 * if both informations be provided, and they are from two differents
 * roles, the result will correspond to the role that matchs with the parameter
 * **id**.
 *
 * @throws CordeClientError if corde's bot is not connected.
 * @returns Role that matches the provided **id** or **name**
 */
export function getRole(data: RoleIdentifier): CordeRole;
export function getRole(data: string | RoleIdentifier): CordeRole {
  if (!runtime.isBotLoggedIn()) {
    throw new CordeClientError("Bot is not connected yet. No role can be searched");
  }

  const _role = _getRole(data);
  if (_role) {
    return convertToCordeRole(_role);
  }
  return null;
}

function _getRole(data: string | RoleIdentifier) {
  if (typeof data === "string") {
    return runtime.bot.getRoles().find((r) => r.id === data);
  }
  return runtime.bot.getRoles().find((r) => r.id === data.id || r.name === data.name);
}

function convertToCordeRole(role: Role) {
  if (role) {
    return new CordeRole(role);
  }
  return null;
}
