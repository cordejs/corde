import { ColorResolvable, Snowflake } from "discord.js";
import { RoleIdentifier } from "../../types";
import { Colors, RolePermission } from "../../utils";

export interface RoleMatches {
  /**
   * Defines the new color that a role should have after
   * a command call.
   *
   * @param color The new color for the role.
   * @param name Identifier of the role. It can be its it or it's name.
   * Can also use RoleIdentifier to filter it.
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
   *
   * @since 2.0
   */
  toSetRoleColor(color: ColorResolvable, id: string): void;
  toSetRoleColor(color: ColorResolvable, roleIdentifier: RoleIdentifier): void;
  toSetRoleColor(color: Colors, id: string): void;
  toSetRoleColor(color: Colors, roleIdentifier: RoleIdentifier): void;

  /**
   * Defines a role that should be removed.
   * @param id Id of the role. Can also use RoleIdentifier to filter it.
   *
   * @example
   *
   * // Being the command:
   * let msg: Message;
   * const data = msg.guild.roles.cache.find((r) => r.name === roleName);
   * await data.delete();
   *
   * //The test operation should be
   *
   * expect("commandThatChangeColorOf player-one").toDeleteRole({name: "player-one"})
   *
   * @since 2.0
   */
  toDeleteRole(id: string): void;
  toDeleteRole(roleIdentifier: RoleIdentifier): void;

  /**
   * Defines a role that should have his *mentionable* property state.
   *
   * @param mentionable If the role can or can not be mentionable.
   * @param id Identifier of the role. Can also use RoleIdentifier to filter it.
   * @since 2.0
   */
  toSetRoleMentionable(mentionable: boolean, id: Snowflake): void;
  toSetRoleMentionable(mentionable: boolean, roleIdentifier: RoleIdentifier): void;

  /**
   * Defines if a role should be hoist or not.
   *
   * @param hoist if this role is pinned in the user listing.
   * @param id Identifier of the role. Can also use RoleIdentifier to filter it.
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
   * @since 2.0
   */
  toSetRoleHoist(hoist: boolean, id: string): void;
  toSetRoleHoist(hoist: boolean, roleIdentifier: RoleIdentifier): void;

  /**
   * Defines a new name for a role.
   *
   * @param newName new name of the role
   * @param id Identifier of the role. Can also use RoleIdentifier to filter it.
   * @since 2.0
   */
  toRenameRole(newName: string, id: string): void;
  toRenameRole(newName: string, roleIdentifier: RoleIdentifier): void;

  /**
   * Defines a new position for the role.
   *
   * @param newPosition The new position of the role.
   * @param id Identifier of the role. Can also use RoleIdentifier to filter it.
   *
   * @description Role's maximum value depends of the amount of roles the guid Have.
   * So, if there is only 3 roles (including the default *everyone*), the maximum
   * position that a role can have is 2 (The count begins with 0, So: 0, 1, 2).
   *
   * @see https://discord.com/developers/docs/topics/permissions
   * @since 2.0
   */
  toSetRolePosition(newPosition: number, id: string): void;
  toSetRolePosition(newPosition: number, roleIdentifier: RoleIdentifier): void;

  /**
   * Defines a list of
   * [Permissions](https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags)
   * that a role should have.
   *
   * @param id Identifier of the role. Can also use RoleIdentifier to filter it.
   * @param permissions List of permissions allowed by Discord.
   *
   * @example
   *
   * corde.test("change role color", () => {
   *    const role = getRole();
   *    expect("changeRole " + role.id).toSetRolePermission(role.id, "ADMINISTRATOR", "BAN_MEMBERS");
   * });
   *
   * @see https://discord.com/developers/docs/topics/permissions#permissions
   * @since 2.0
   */
  toSetRolePermission(id: string, ...permissions: RolePermission[]): void;
  toSetRolePermission(roleIdentifier: RoleIdentifier, ...permissions: RolePermission[]): void;
}
