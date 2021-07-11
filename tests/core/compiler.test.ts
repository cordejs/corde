import { TsCompiler } from "../../src/core/compiler";

const helperFolder = __dirname + "/__helper__";
const compiler = new TsCompiler();

describe("testing compiler", () => {
  it("should throw error when path is not found", async () => {
    try {
      await compiler.compile(null, null);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should compile file1.ts", async () => {
    const _exports = await compiler.compile("./file1.ts", helperFolder);
    expect(_exports).toEqual({ foo: 1 });
  });

  it("should compile file2.ts", async () => {
    const _exports = await compiler.compile<{ chalk: any; fn: any; foo: any }>(
      "./file2.ts",
      helperFolder,
    );
    expect(_exports.chalk).toBeDefined();
    expect(_exports.chalk).toBeDefined();
    expect(_exports.chalk).toBeDefined();
  });

  it("should compile file3.ts", async () => {
    const _exports = await compiler.compile("./file3.ts", helperFolder);
    expect(_exports).toEqual({
      default: {},
    });
  });

  it("should compile file4.ts", async () => {
    const _exports = await compiler.compile<any>("./file4.ts", helperFolder);
    expect(_exports.chalk).toBeDefined();
    expect(_exports.f1).toBeDefined();
    expect(_exports.f2).toBeDefined();
  });

  it("should compile file5.ts", async () => {
    const compiler = new TsCompiler();
    const _exports = await compiler.compile<any>("./file5.ts", helperFolder);
    expect(_exports.numb2).toEqual(2);
  });

  it("should not compile file6.ts", async () => {
    try {
      await compiler.compile<any>("./file6.ts", helperFolder);
    } catch (error) {
      expect(error.message).toBeDefined();
      return;
    }
    fail();
  });
});
