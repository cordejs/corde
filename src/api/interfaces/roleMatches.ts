import { ColorResolvable, Snowflake } from "discord.js";
import { RoleData } from "../../types";
import { Colors } from "../../utils/colors";

export interface RoleMatches {
  /**
   * Defines the new color that a role should have after
   * a command call.
   *
   * @since 2.0
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

  toDeleteRole(id: Snowflake): void;
  toDeleteRole(name: RoleData): void;

  toDeleteRoleByName(name: string): void;
}
