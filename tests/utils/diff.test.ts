// Since diff is just a binder for a external lib,
// we just have to ensure that this lib is being called.

import * as jestDiff from "jest-diff";
import { diff } from "../../src/utils";

describe("testing diff function", () => {
  test("should call jest-diff", () => {
    const differ = jest.spyOn(jestDiff, "diff");
    diff({}, {});
    expect(differ).toBeCalled();
  });
});
