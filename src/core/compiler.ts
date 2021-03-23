import ts from "typescript";

interface FileType {
  [value: string]: string;
}

function requireFromString(src: string, filename: string) {
  const Module = module.constructor;
  const m = new (Module as any)();
  m._compile(src, filename);
  return m.exports;
}

function compile(fileNames: string[], options: ts.CompilerOptions): void {
  const files: FileType = {};
  // tslint:disable-next-line no-any
  const host: ts.ParseConfigFileHost = ts.sys as any;
  host.onUnRecoverableConfigFileDiagnostic = undefined;

  const program = ts.createProgram(fileNames, options);

  const emitResult = program.emit(
    undefined,
    (fileName, content) => {
      files[fileName] = content;
      const test = requireFromString(content, fileName);
      console.log(test.b1);
    },
    undefined,
    undefined,
  );

  ts.getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics)
    .forEach((diagnostic) => {
      let msg = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
      if (diagnostic.file) {
        const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
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

compile(process.argv.slice(2), {
  noEmitOnError: true,
  noImplicitAny: true,
  strict: false,
  target: ts.ScriptTarget.ES5,
  module: ts.ModuleKind.CommonJS,
});
