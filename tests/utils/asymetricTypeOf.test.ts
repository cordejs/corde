import { any } from "../../src/expect/asymmetricMatcher";
import * as utils from "../../src/utils";

describe("testing asymmetricTypeOf", () => {
  it("should get correct typeof asymetric", () => {
    expect(utils.asymmetricTypeOf(any(""))).toEqual(any("").toString());
  });

  it("should get type for non asymetric value", () => {
    expect(utils.asymmetricTypeOf("")).toEqual("string");
  });
});
