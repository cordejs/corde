import { TsCompiler } from "../../src/core/compiler";

describe("testing compiler", () => {
  it("should compile test files", async () => {
    const compiler = new TsCompiler();
    const exports = await compiler.compile("./file1.ts", "D:/github/corde/tests/core/__helper__");
    console.log(exports);
    expect(exports).toEqual({ aa: 1 });
  });
});
