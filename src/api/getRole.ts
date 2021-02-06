import { runtime } from "../common";
import { Role } from "../structures/role";
import { RoleData } from "../types";

export function getRole(id: string): Role;
export function getRole(data: RoleData): Role;
export function getRole(data: string | RoleData) {
  if (typeof data === "string") {
    return runtime.bot.getRoles().find((r) => r.id === data);
  }
  return runtime.bot.getRoles().find((r) => r.id === data.id || r.name === data.name);
}
