import { ColorResolvable, Role as DiscordRole } from "discord.js";
import { Colors } from "..";
import { BaseRole } from "../types";
import { resolveColor, RolePermission } from "../utils";

/**
 * @see https://discord.com/developers/docs/topics/permissions#role-object
 */
export class Role {
  constructor(private readonly _role: DiscordRole) {}

  /**
   * Integer representation of hexadecimal color code.
   */
  get color() {
    return this._role.color;
  }

  get createdAt() {
    return this._role.createdAt;
  }

  get isDeleted() {
    return this._role.deleted;
  }

  get isEditable() {
    return this._role.editable;
  }

  get hexColor() {
    return this._role.hexColor;
  }

  /**
   * If this role is pinned in the user listing
   */
  get isHoist() {
    return this._role.hoist;
  }

  get id() {
    return this._role.id;
  }

  /**
   * Whether this role is managed by an integration
   */
  get isManaged() {
    return this._role.managed;
  }

  /**
   * Whether this role is mentionable
   */
  get isMentionable() {
    return this._role.mentionable;
  }

  get name() {
    return this._role.name;
  }

  get position() {
    return this._role.position;
  }

  get rawPosition() {
    return this._role.rawPosition;
  }

  /**
   * Delete this role. Requires the `MANAGE_ROLES` permission.
   * Returns a `204` empty response on success.
   * Fires a [Guild Role Delete](https://discord.com/developers/docs/topics/gateway#guild-role-update) Gateway event
   *
   * @see https://discord.com/developers/docs/resources/guild#delete-guild-role
   */
  async delete() {
    await this._role.delete();
  }

  /**
   * Updates this role's position.
   * Requires the `MANAGE_ROLES` permission.
   *
   * @param position new position for this role.
   */
  async updatePosition(position: number) {
    await this._role.setPosition(position);
  }

  /**
   * Updates this role's name.
   * Requires the `MANAGE_ROLES` permission.
   *
   * @param newName new value for this role's name
   */
  async updateName(newName: string) {
    await this._role.setName(newName);
  }

  /**
   * Update this role mentionable property.
   * Requires the `MANAGE_ROLES` permission.
   *
   * @param mentionable New value for mentionable
   */
  async updateMentionable(mentionable: boolean) {
    await this._role.setMentionable(mentionable);
  }

  /**
   * Update this role hoist.
   * Defines if the role should be displayed separately in the sidebar.
   * Requires the `MANAGE_ROLES` permission.
   *
   * @param hoist New value for hoist
   */
  async updateHoist(hoist: boolean) {
    await this._role.setHoist(hoist);
  }

  /**
   * Update this role color.
   * Requires the `MANAGE_ROLES` permission.
   *
   * @param newColor New color.
   */
  async updateColor(newColor: ColorResolvable | Colors) {
    const color = resolveColor(newColor);
    await this._role.setColor(color);
  }

  /**
   * Update this role permission.
   * Requires the `MANAGE_ROLES` permission.
   *
   * @param permissions New permissions for this role, it can be an
   * empty array.
   */
  async updatePermissions(...permissions: RolePermission[]) {
    await this._role.setPermissions(permissions);
  }

  /**
   * Modify a guild role. Requires the `MANAGE_ROLES` permission.
   * Returns the updated role on success.
   * Fires a Guild Role Update Gateway event.
   *
   * @param data Informations to be updated.
   * @see https://discord.com/developers/docs/resources/guild#delete-guild-role
   */
  async update(data: BaseRole) {
    if (!data) {
      return;
    }

    await this._role.edit({
      color: data.color ? resolveColor(data.color) : null,
      hoist: data.isHoist,
      mentionable: data.isMentionable,
      name: data.name,
      permissions: data.permissions,
      position: data.position,
    });
  }
}
