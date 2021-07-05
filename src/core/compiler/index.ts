import * as fs from "fs";
import * as path from "path";
import util from "util";

import { importJS, wasFileModified } from "./utils";
import { defaults } from "options-defaults";

import ts from "typescript";

const DEFAULT_COMPILER_OPTIONS: ts.CompilerOptions = {
  noEmitOnError: true,
  noImplicitAny: false,
  strict: false,
  resolveJsonModule: true,
  outDir: path.resolve(__dirname, "../../../@cache"),
  target: ts.ScriptTarget.ES5,
  module: ts.ModuleKind.CommonJS,
  allowJs: false,
  moduleResolution: ts.ModuleResolutionKind.NodeJs,
};

export interface CompilerOptions {
  /**
   * If TypeScript compilation fails but there is cached file, should it be loaded? Default: false
   */
  fallback?: boolean;

  /**
   * Typescript tsconfig.json compilerOptions.
   */
  compilerOptions?: CompilerOptions;
}

export interface CompilationContext {
  cwd: string;
  tsPath: string;
  tsDir: string;
}

export class TsCompiler {
  private _options: ts.CompilerOptions;

  constructor(options?: CompilerOptions) {
    this._options = defaults(DEFAULT_COMPILER_OPTIONS, options);
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
  async compile(relativeTsPath = "", cwd = process.cwd()): Promise<any> {
    // Check if file exists.
    const tsPath = path.resolve(cwd, relativeTsPath);
    if (!(await this._exists(tsPath))) {
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

    return await this.compileOrFail(ctx);
  }

  private async compileOrFail(ctx: CompilationContext) {
    const { tsPath, tsDir, cwd } = ctx;

    const tsFileName = path.basename(tsPath);
    const jsFileName = tsFileName.replace(/\.[^/.]+$/u, ".js");

    const cacheDir = path.resolve(process.cwd(), this._options.outDir || "");
    const internalPath = (path.dirname(tsPath) + "\\" + jsFileName).replace(process.cwd(), "");
    const jsPath = path.join(cacheDir, internalPath);

    // Check if cached scripts.js exist.
    if (!(await this._exists(jsPath))) {
      // Cache is correct, do nothing.
      const tsWasModified = await wasFileModified(tsPath, jsPath);
      if (!tsWasModified) {
        return await importJS(cwd, jsPath, tsDir);
      }

      try {
        this.transpileTStoJSFiles([tsPath], cwd);
      } catch (error) {
        // If we don't want to fallback to last working version of compiled file, throw error.
        if (!this._options.fallback && error instanceof Error) {
          throw error;
        }
      }

      return await importJS(cwd, jsPath, tsDir);
    }

    // Create cache directory if it does not exist.
    if (!(await this._exists(cacheDir))) {
      await this._mkdir(cacheDir);
    }

    // Build cache.
    this.transpileTStoJSFiles([tsPath], cwd);

    return await importJS(cwd, jsPath, tsDir);
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

    ts.getPreEmitDiagnostics(program)
      .concat(emitResult.diagnostics)
      .forEach((diagnostic) => {
        let msg = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
        if (diagnostic.file) {
          const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(
            diagnostic.start ?? 0,
          );
          msg = `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${msg}`;
        }
        console.error(msg);
      });

    const exitCode = emitResult.emitSkipped ? 1 : 0;
    if (exitCode) {
      console.log(`Process exiting with code '${exitCode}'.`);
      process.exit(exitCode);
    }
  }

  private async _exists(filePath: string) {
    const stat = util.promisify(fs.stat);
    try {
      const fileStatus = await stat(filePath);
      return !!fileStatus;
    } catch (error) {
      return false;
    }
  }

  private async _mkdir(
    dirPath: string,
    options?:
      | fs.Mode
      | (fs.MakeDirectoryOptions & {
          recursive?: false | undefined;
        })
      | null
      | undefined,
  ) {
    const mkdir = util.promisify(fs.mkdir);
    return await mkdir(dirPath, options);
  }
}
