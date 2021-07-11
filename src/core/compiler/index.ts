import * as fs from "fs";
import * as path from "path";

import { importJS, wasFileModified } from "./utils";

import ts from "typescript";

const DEFAULT_COMPILER_OPTIONS: ts.CompilerOptions = {
  noEmitOnError: true,
  noImplicitAny: false,
  strict: false,
  resolveJsonModule: true,
  outDir: path.resolve(__dirname, "../../../@cache"),
  target: ts.ScriptTarget.ES5,
  // Avoid default imports error: "can only be default-imported using the 'esModuleInterop' flag"
  esModuleInterop: true,
  module: ts.ModuleKind.CommonJS,
  allowJs: false,
  moduleResolution: ts.ModuleResolutionKind.NodeJs,
};

export interface CompilationContext {
  cwd: string;
  tsPath: string;
  tsDir: string;
}

export class TsCompiler {
  private _options: ts.CompilerOptions;

  constructor(options?: ts.CompilerOptions) {
    this._options = options ?? DEFAULT_COMPILER_OPTIONS;
  }

  /**
   * Compile a `.ts` file to `.js` file in a `@cache` folder, preserving
   * folders tree informed in `cwd` argument.
   *
   * @param relativeTsPath Path of file to compile
   * @param cwd Working DIR for compiler base from.
   * @returns Exports from compiled file.
   *
   * @description
   *
   * If all files have already been transpiled and there is no change on them, so the compiler will only
   * import all files from `@cache` folder.
   *
   * @example
   *
   * ```txt
   * ├───project
   * |   ├───src
   * |       └───bot.ts
   * |   ├───test
   * |       └───bot.test.ts
   * ```
   *
   * ```typescript
   * const compiler = new Compiler();
   * compiler.compile("./test/bot.test.ts", "D:\\project");
   * ```
   *
   */
  async compile<TExports extends any>(relativeTsPath = "", cwd = process.cwd()) {
    // Check if file exists.
    const tsPath = path.resolve(cwd, relativeTsPath);
    if (!fs.existsSync(tsPath)) {
      throw new Error(`File ${tsPath} not found to compile.`);
    }

    // Get file name and directory path.
    const tsDir = path.dirname(tsPath);

    // Create compilation context.
    const ctx: CompilationContext = {
      cwd,
      tsPath,
      tsDir,
    };

    return await this.compileOrFail<TExports>(ctx);
  }

  private async compileOrFail<TExports extends any>(ctx: CompilationContext) {
    const { tsPath, tsDir, cwd } = ctx;

    const tsFileName = path.basename(tsPath);
    const jsFileName = tsFileName.replace(/\.[^/.]+$/u, ".js");

    const cacheDir = path.resolve(process.cwd(), this._options.outDir || "");
    const internalPath = (path.dirname(tsPath) + "\\" + jsFileName).replace(process.cwd(), "");
    const jsPath = path.join(cacheDir, internalPath);

    // Check if cached scripts.js exist.
    if (fs.existsSync(jsPath)) {
      // Cache is correct, do nothing.
      const tsWasModified = await wasFileModified(tsPath, jsPath);
      if (!tsWasModified) {
        return await importJS<TExports>(cwd, jsPath, tsDir);
      }

      this.transpileTStoJSFiles([tsPath], cwd);
      return await importJS<TExports>(cwd, jsPath, tsDir);
    }

    // Create cache directory if it does not exist.
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir);
    }

    // Build cache.
    this.transpileTStoJSFiles([tsPath], cwd);

    return await importJS<TExports>(cwd, jsPath, tsDir);
  }

  private transpileTStoJSFiles(fileNames: string[], projectRootDir: string) {
    const host: ts.ParseConfigFileHost = ts.sys as any;
    host.onUnRecoverableConfigFileDiagnostic = () => null;

    projectRootDir = path.normalize(projectRootDir);
    this._options.outDir = path.join(
      this._options.outDir || "",
      projectRootDir.replace(process.cwd(), ""),
    );

    const program = ts.createProgram(fileNames, this._options);

    //const sourceFile = program.getSourceFile(fileNames[0]);

    const emitResult = program.emit();

    let errorMsg = "";
    ts.getPreEmitDiagnostics(program)
      .concat(emitResult.diagnostics)
      .forEach((diagnostic) => {
        errorMsg = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
        if (diagnostic.file) {
          const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(
            diagnostic.start ?? 0,
          );
          errorMsg = `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${errorMsg}`;
        }
      });

    if (errorMsg) {
      throw new Error(errorMsg);
    }
  }
}
