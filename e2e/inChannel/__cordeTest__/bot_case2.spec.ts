import corde from "../../../lib";

corde.test("", () => {
  corde.expect("sendMultiple 829873348309155851").inChannel("123").toReturn("hello2");
});
