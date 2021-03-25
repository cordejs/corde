import { ColorResolvable } from "discord.js";
import { RoleIdentifier } from "../../types";
import { Colors, RolePermission } from "../../utils";

/**
 * Tests for a **Role** structure.
 */
export interface RoleMatches {
  /**
   * Check if a command changed a role color.
   *
   * @param color The new color for the role.
   * @param roleId Id of the role.
   * @since 2.0
   */
  toSetRoleColor(color: ColorResolvable, roleId: string): void;
  /**
   * Check if a command changed a role color.
   *
   * @param color The new color for the role.
   * @param roleIdentifier Object with the **id** or the **name** of the role.
   * @since 2.0
   */
  toSetRoleColor(color: ColorResolvable, roleIdentifier: RoleIdentifier): void;
  /**
   * Check if a command changed a role color.
   *
   * @param color Color enum in hexadecimal format.
   * @param roleId Object with the **id** or the **name** of the role.
   * @since 2.0
   */
  toSetRoleColor(color: Colors, roleId: string): void;
  /**
   * Check if a command changed a role color.
   *
   * @param color Color enum in hexadecimal format.
   * @param roleId Object with the **id** or the **name** of the role.
   * @since 2.0
   */
  toSetRoleColor(color: Colors, roleIdentifier: RoleIdentifier): void;

  /**
   * Check if a command deletes a role.
   *
   * @param roleId Id of the role.
   * @since 2.0
   */
  toDeleteRole(roleId: string): void;

  /**
   * Check if a command deletes a role.
   *
   * @param roleIdentifier Object with **id** or **name** of the role.
   * @since 2.0
   */
  toDeleteRole(roleIdentifier: RoleIdentifier): void;

  /**
   * Check if a command define a role as mentionable.
   *
   * @param mentionable If the role can or can not be mentionable.
   * @param roleId Id of the role.
   * @since 2.0
   */
  toSetRoleMentionable(mentionable: boolean, roleId: string): void;
  /**
   * Check if a command define a role as mentionable.
   *
   * @param mentionable If the role can or can not be mentionable.
   * @param roleIdentifier Object with **id** or **name** of the role.
   * @since 2.0
   */
  toSetRoleMentionable(mentionable: boolean, roleIdentifier: RoleIdentifier): void;

  /**
   * Check if a commend define a role as hoist.
   *
   * @param hoist if this role is pinned in the user listing.
   * @param roleId Id of the role.
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
  toSetRoleHoist(hoist: boolean, roleId: string): void;
  /**
   * Check if a commend define a role as hoist.
   *
   * @param hoist if this role is pinned in the user listing.
   * @param roleIdentifier Object with **id** or **name** of the role.
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
  toSetRoleHoist(hoist: boolean, roleIdentifier: RoleIdentifier): void;

  /**
   * Check if a command rename a role.
   *
   * @param newName new name of the role
   * @param roleId Id of the role.
   * @since 2.0
   */
  toRenameRole(newName: string, roleId: string): void;
  /**
   * Check if a command rename a role.
   *
   * @param newName new name of the role
   * @param roleIdentifier Object with **id** or **name** of the role.
   * @since 2.0
   */
  toRenameRole(newName: string, roleIdentifier: RoleIdentifier): void;

  /**
   * Check if a command change a role's position.
   *
   * @param newPosition The new position of the role.
   * @param roleId Id of the role.
   *
   * @description Role's maximum value depends of the amount of roles the guid Have.
   * So, if there is only 3 roles (including the default *everyone*), the maximum
   * position that a role can have is 2 (The count begins with 0, So: 0, 1, 2).
   *
   * @see https://discord.com/developers/docs/topics/permissions
   * @since 2.0
   */
  toSetRolePosition(newPosition: number, roleId: string): void;
  /**
   * Check if a command change a role's position.
   *
   * @param newPosition The new position of the role.
   * @param roleIdentifier Object with **id** or **name** of the role.
   *
   * @description Role's maximum value depends of the amount of roles the guid Have.
   * So, if there is only 3 roles (including the default *everyone*), the maximum
   * position that a role can have is 2 (The count begins with 0, So: 0, 1, 2).
   *
   * @see https://discord.com/developers/docs/topics/permissions
   * @since 2.0
   */
  toSetRolePosition(newPosition: number, roleIdentifier: RoleIdentifier): void;

  /**
   * Check if a command change the
   * [permissions](https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags)
   * of a role.
   *
   * @param roleId Id of the role.
   * @param permissions List of permissions allowed by Discord.
   *
   * @see https://discord.com/developers/docs/topics/permissions#permissions
   * @since 2.0
   */
  toSetRolePermission(roleId: string, ...permissions: RolePermission[]): void;
  /**
   * Check if a command change the
   * [permissions](https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags)
   * of a role.
   *
   * @param roleIdentifier Object with **id** or **name** of the role.
   * @param permissions List of permissions allowed by Discord.
   *
   * @see https://discord.com/developers/docs/topics/permissions#permissions
   * @since 2.0
   */
  toSetRolePermission(roleIdentifier: RoleIdentifier, ...permissions: RolePermission[]): void;
}
