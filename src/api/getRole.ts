import { runtime } from "../common";
import { CordeClientError } from "../errors";
import { Role } from "../structures/role";
import { RoleData } from "../types";

/**
 * Reach for a `role` in the informed guild in settings,
 * basing on it's **id** or **name**.
 *
 * @param id Id of the role.
 * @throws CordeClientError if corde's bot is not connected.
 * @returns Role that matches the provided **id** or **name**
 */
export function getRole(id: string): Role;
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
export function getRole(data: RoleData): Role;
export function getRole(data: string | RoleData) {
  if (!runtime.isBotLoggedIn()) {
    throw new CordeClientError("bot is not connected yet. No role can be searched");
  }

  if (typeof data === "string") {
    return runtime.bot.getRoles().find((r) => r.id === data);
  }
  return runtime.bot.getRoles().find((r) => r.id === data.id || r.name === data.name);
}
