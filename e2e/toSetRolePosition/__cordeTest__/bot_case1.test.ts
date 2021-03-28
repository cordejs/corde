// @ts-nocheck

import corde from "../../../lib";

let role = null;
const roleName = "role-color";

corde.test("should increase a role position", () => {
  role = corde.getRole({ name: roleName });
  corde.expect(`increaseRolePosition ${role.id}`).toSetRolePosition(role.position + 1, role.id);
});

corde.afterAll(async () => {
  const _role = role;
  if (_role) {
    await _role.updatePosition(_role.position - 1);
  }
});
