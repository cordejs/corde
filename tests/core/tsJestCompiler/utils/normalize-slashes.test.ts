import { normalizeSlashes } from "../../../../src/core/tsJestCompiler/utils/normalizeSlashes";

it("should replace windows slashes", () => {
  expect(normalizeSlashes("path/to\\something/here\\and\\there.js")).toBe(
    "path/to/something/here/and/there.js",
  );
});
