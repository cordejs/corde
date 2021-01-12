import { corde } from "../../../lib";

corde.test("", async () => {
  const msg = await corde.sendMessage("oldValue");
  corde.expect("edit").toEditMessage({ id: msg.id }, "newValue");
});
