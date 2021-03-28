import corde from "../../../lib";

corde.test("should fail to edit a message", async () => {
  const newValue = "newMessageEdited";
  corde
    .expect(`editMessage 11241241241 ${newValue}`)
    .toEditMessage("wrongValue", { id: "11241241241" });
});
