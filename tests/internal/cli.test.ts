import expect from "expect";
import { resolve } from "path";
import * as ts from "typescript";
import { Documentation, Options } from "../src";
import { rewiremock } from "./utils";

type CLIResult = {
  options: Options;
  output: { [file: string]: string };
};

function runCLI(): CLIResult {
  const result: CLIResult = {
    options: {} as Options,
    output: {},
  };

  rewiremock.proxy("../src/cli", {
    ".": {
      createDocumentation: (options: Options): Documentation => {
        result.options = options;
        const docs = new Map<string, string>();
        docs.set("default", "test docs");
        docs.set("section1", "test section");
        return docs;
      },
    },
    fs: {
      writeFileSync: (file: string, content: string): void => {
        result.output[file] = content;
      },
      //eslint-disable-next-line @typescript-eslint/no-empty-function
      mkdirSync: (): void => {},
    },
    typescript: {
      ...ts,
      sys: {
        ...ts.sys,
        readFile: (file: string): string => {
          if (file === resolve(process.cwd(), "test.tsconfig.json")) {
            return '{"compilerOptions": {"strict": true}}';
          }
          if (file === resolve(process.cwd(), "tsconfig.json")) {
            return '{"compilerOptions": {"strict": false}}';
          }
          return "";
        },
        fileExists: (): boolean => true,
      },
    },
  });

  return result;
}

describe("CLI", () => {
  it("reads compiler options from default config file location", () => {
    process.argv = ["node", "typescript-documentation"];
    expect(runCLI().options.compilerOptions.strict).toBe(false);
  });

  it("reads compiler options from provided config file (long)", () => {
    process.argv = ["node", "typescript-documentation", "--project", "./test.tsconfig.json"];
    expect(runCLI().options.compilerOptions.strict).toBe(true);
  });

  it("reads compiler options from provided config file (short)", () => {
    process.argv = ["node", "typescript-documentation", "-p", "./test.tsconfig.json"];
    expect(runCLI().options.compilerOptions.strict).toBe(true);
  });

  it("reads compiler options from provided config file (absolute)", () => {
    const path = resolve(process.cwd(), "test.tsconfig.json");
    process.argv = ["node", "typescript-documentation", "--project", path];
    expect(runCLI().options.compilerOptions.strict).toBe(true);
  });

  it("reads from default entry file", () => {
    process.argv = ["node", "typescript-documentation"];
    expect(runCLI().options.entry).toEqual(resolve(process.cwd(), "src/index.ts"));
  });

  it("reads entry file path from command line options (long)", () => {
    process.argv = ["node", "typescript-documentation", "--entry", "./src/main.ts"];
    expect(runCLI().options.entry).toEqual(resolve(process.cwd(), "src/main.ts"));
  });

  it("reads entry file path from command line options (short)", () => {
    process.argv = ["node", "typescript-documentation", "-e", "./src/main.ts"];
    expect(runCLI().options.entry).toEqual(resolve(process.cwd(), "src/main.ts"));
  });

  it("reads entry file path from command line options (absolute)", () => {
    const path = resolve(process.cwd(), "src/main.ts");
    process.argv = ["node", "typescript-documentation", "--entry", path];
    expect(runCLI().options.entry).toEqual(path);
  });

  it("reads output file from command line options (long)", () => {
    process.argv = ["node", "typescript-documentation", "--output", "test.md"];
    expect(runCLI().output[resolve(process.cwd(), "test.md")]).toEqual("test docs");
  });

  it("reads output file from command line options (short)", () => {
    process.argv = ["node", "typescript-documentation", "-o", "test.md"];
    expect(runCLI().output[resolve(process.cwd(), "test.md")]).toEqual("test docs");
  });

  it("reads output file from command line options (absolute)", () => {
    const path = resolve(process.cwd(), "test.md");
    process.argv = ["node", "typescript-documentation", "--output", path];
    expect(runCLI().output[path]).toEqual("test docs");
  });

  it("writes markdown to provided output file", () => {
    const path = resolve(process.cwd(), "test.md");
    process.argv = ["node", "typescript-documentation", "--output", path];
    expect(runCLI().output[path]).toEqual("test docs");
  });

  it("writes sections to separate output files", () => {
    process.argv = ["node", "typescript-documentation", "--output", "test.md"];
    expect(runCLI().output[resolve(process.cwd(), "section1.md")]).toEqual(
      "# section1\n\ntest section",
    );
  });
});
