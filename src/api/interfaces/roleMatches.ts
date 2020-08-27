import { ColorResolvable, Snowflake } from "discord.js";
import { RoleData } from "../../types";
import { Colors } from "../../utils/colors";

export interface RoleMatches {
  /**
   * Defines the new color that a role should have after
   * a command call.
   *
   * @param color The new color for the role.
   * @param name Identifier of the role. It can be its it or it's name.
   *
   * @example
   *
   * // Being the command:
   * let msg: Message;
   * msg.guild.roles.cache.find((r) => r.name === "player-one").setColor("GREEN");
   *
   * //The test operation shuld be
   *
   * expect("commandThatChangeColorOf player-one").toSetRoleColor("GREEN", {name: "player-one"})
   *
   * // You can also use the Colors helper.
   *
   * expect("commandThatChangeColorOf player-one").toSetRoleColor(Colors.GREEN, {name: "player-one"})
   */
  toSetRoleColor(color: ColorResolvable, id: Snowflake): void;
  toSetRoleColor(color: ColorResolvable, roleData: RoleData): void;
  toSetRoleColor(color: Colors, id: Snowflake): void;
  toSetRoleColor(color: Colors, roleData: RoleData): void;

  /**
   * Defines a role that should be removed.
   * @param id Id of the role.
   *
   * @example
   *
   * // Being the command:
   * let msg: Message;
   * const data = msg.guild.roles.cache.find((r) => r.name === roleName);
   * await data.delete();
   *
   * //The test operation shuld be
   *
   * expect("commandThatChangeColorOf player-one").toDeleteRole({name: "player-one"})
   *
   */
  toDeleteRole(id: Snowflake): void;
  toDeleteRole(name: RoleData): void;
}
