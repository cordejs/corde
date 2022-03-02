/// <reference types="../../lib/src/global" />

it("should fail to edit a message", async () => {
  const newValue = "newMessageEdited";
  await command(`editMessage 11241241241 ${newValue}`).should.editMessage("wrongValue", {
    id: "11241241241",
  });
});
