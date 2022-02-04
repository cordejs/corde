import { any } from "../../src/expect/asymmetricMatcher";
import { asymmetricTypeOf } from "../../src/utils/asymmetricTypeOf";

describe("testing asymmetricTypeOf", () => {
  it("should get correct typeof asymmetric", () => {
    expect(asymmetricTypeOf(any(""))).toEqual(any("").toString());
  });

  it("should get type for non asymmetric value", () => {
    expect(asymmetricTypeOf("")).toEqual("string");
  });
});
