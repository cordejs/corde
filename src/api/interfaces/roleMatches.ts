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
   * Can also use RoleData to filter it.
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
   * @param id Id of the role. Can also use RoleData to filter it.
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
  toDeleteRole(roleData: RoleData): void;

  /**
   * Defines a role that should have his *mentionable* property state.
   *
   * @param mentionable If the role can or can not be mentionable.
   * @param id Id of the role. Can also use RoleData to filter it.
   */
  toSetRoleMentionable(mentionable: boolean, id: Snowflake): void;
  toSetRoleMentionable(mentionable: boolean, roleData: RoleData): void;

  /**
   * Defines if a role should be hoist or not.
   *
   * @param hoist if this role is pinned in the user listing.
   *
   * @description Discord provides two methods of displaying roles; hoisted and standard.
   * The role hierarchy is visibly clear to server members; roles are sorted and displayed
   * based on which role is higher in the role management menu.
   *
   * However, in a standard configuration, users are sorted alphabetically, meaning someone
   * with the highest role will be sorted wherever their name exists in the alphabet.
   *
   * Source from [discord support](https://support.discord.com/hc/en-us/community/posts/360060076751-Un-hoisted-Role-Hierarchy).
   * @see https://discord.com/developers/docs/topics/permissions
   */
  toSetHoist(hoist: boolean): void;
}
