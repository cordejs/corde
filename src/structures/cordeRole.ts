import { ColorResolvable, Role } from "discord.js";
import { BaseRole } from "../types/types";
import { Colors, resolveColor, RolePermission } from "../utils";

/**
 * Encapsulation of [Discord.js Role](https://discord.js.org/#/docs/main/stable/class/Role).
 * @see https://discord.com/developers/docs/topics/permissions#role-object
 */
export class CordeRole {
  constructor(private _role: Role) {}

  /**
   * Integer representation of hexadecimal color code.
   */
  get color(): number {
    return this._role.color;
  }

  /**
   * Creation time of the role.
   */
  get createdAt(): Date {
    return this._role.createdAt;
  }

  /**
   * Inform if this role was deleted.
   */
  get isDeleted(): boolean {
    return this._role.deleted;
  }

  /**
   * Inform if this role can be edited.
   */
  get isEditable(): boolean {
    return this._role.editable;
  }

  /**
   * This role's color in hexadecimal.
   */
  get hexColor(): string {
    return this._role.hexColor;
  }

  /**
   * If this role is pinned in the user listing
   */
  get isHoist(): boolean {
    return this._role.hoist;
  }

  /**
   * Id of this role.
   */
  get id(): string {
    return this._role.id;
  }

  /**
   * Whether this role is managed by an integration
   */
  get isManaged(): boolean {
    return this._role.managed;
  }

  /**
   * Whether this role is mentionable
   */
  get isMentionable(): boolean {
    return this._role.mentionable;
  }

  /**
   * Name of this role.
   */
  get name(): string {
    return this._role.name;
  }

  /**
   * Position of this role.
   *
   * @see https://discord.com/developers/docs/topics/permissions#permission-hierarchy
   */
  get position(): number {
    /**
     * see https://discord.js.org/#/docs/main/stable/class/Role?scrollTo=position
     * Position in Discord.js is relative to the roleManager.
     *
     * We want the position relative to Discord itself, which is the RAWPOSITION.
     *
     * To avoid the confusion, we will not expose position and rawPosition distinctly.
     */
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
    this._role = await this._role.setPosition(position);
    return this;
  }

  /**
   * Updates this role's name.
   * Requires the `MANAGE_ROLES` permission.
   *
   * @param newName new value for this role's name
   */
  async updateName(newName: string) {
    this._role = await this._role.setName(newName);
    return this;
  }

  /**
   * Update this role mentionable property.
   * Requires the `MANAGE_ROLES` permission.
   *
   * @param mentionable New value for mentionable
   */
  async updateMentionable(mentionable: boolean) {
    this._role = await this._role.setMentionable(mentionable);
    return this;
  }

  /**
   * Update this role hoist.
   * Defines if the role should be displayed separately in the sidebar.
   * Requires the `MANAGE_ROLES` permission.
   *
   * @param hoist New value for hoist
   */
  async updateHoist(hoist: boolean) {
    this._role = await this._role.setHoist(hoist);
    return this;
  }

  /**
   * Update this role color.
   * Requires the `MANAGE_ROLES` permission.
   *
   * @param newColor New color.
   */
  async updateColor(newColor: ColorResolvable | Colors) {
    const color = resolveColor(newColor);
    this._role = await this._role.setColor(color);
    return this;
  }

  /**
   * Update this role permission.
   * Requires the `MANAGE_ROLES` permission.
   *
   * @param permissions New permissions for this role, it can be an
   * empty array.
   */
  async updatePermissions(...permissions: RolePermission[]) {
    this._role = await this._role.setPermissions(permissions);
    return this;
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
      return this;
    }

    this._role = await this._role.edit({
      color: data.color ? resolveColor(data.color) : undefined,
      hoist: data.isHoist,
      mentionable: data.isMentionable,
      name: data.name,
      permissions: data.permissions,
      position: data.position,
    });
    return this;
  }
}
