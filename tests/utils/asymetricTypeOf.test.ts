import { any } from "../../src/expect/asymmetricMatcher";
import * as utils from "../../src/utils";

describe("testing asymetricTypeOf", () => {
  it("should get correct typeof asymetric", () => {
    expect(utils.asymetricTypeOf(any(""))).toEqual(any("").toString());
  });

  it("should get type for non asymetric value", () => {
    expect(utils.asymetricTypeOf("")).toEqual("string");
  });
});
