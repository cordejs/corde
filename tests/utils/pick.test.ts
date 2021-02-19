import { pick } from "../../src/utils";

describe("Testing pick function", () => {
  it("Should pick only a property", () => {
    const obj = {
      id: "1",
      name: "name",
    };
    const newObj = pick(obj, "name");
    expect(newObj).toEqual({ id: undefined, name: "name" });
  });
});
