import {
  CompilerHost,
  createSourceFile,
  Declaration,
  Diagnostic,
  formatDiagnostic,
  JSDocTagInfo,
  ObjectFlags,
  ScriptTarget,
  SourceFile,
  Symbol,
  SymbolDisplayPart,
  SymbolFlags,
  Type,
  TypeFlags,
  TypeReference,
} from 'typescript';
import { inspect } from 'util';

export function isInternalSymbol(symbol: Symbol): boolean {
  return symbol.getJsDocTags().some((tag) => tag.name === 'internal');
}

export function getSymbolSection(symbol: Symbol): string {
  const sectionTag = symbol
    .getJsDocTags()
    .find((tag) => tag.name === 'section');

  return (sectionTag && getSymbolDisplayText(sectionTag)) || 'default';
}

export function createCompilerHost(sourceCode: {
  [name: string]: string;
}): CompilerHost {
  return {
    getSourceFile: (name: string): SourceFile =>
      createSourceFile(
        name,
        (sourceCode && sourceCode[name]) || '',
        ScriptTarget.Latest
      ),
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    writeFile: (): void => {},
    getDefaultLibFileName: (): string => 'lib.d.ts',
    useCaseSensitiveFileNames: (): boolean => false,
    getCanonicalFileName: (filename: string): string => filename,
    getCurrentDirectory: (): string => '',
    getNewLine: (): string => '\n',
    getDirectories: (): string[] => [],
    fileExists: (): boolean => true,
    readFile: (): string => '',
  };
}

function isNumeric(
  value: [string, string | number]
): value is [string, number] {
  return typeof value[1] === 'number';
}

export function getSymbolDisplayText(tag: JSDocTagInfo): string {
  return tag.text?.map(({ text }: SymbolDisplayPart) => text).join('') || '';
}

export function findExactMatchingTypeFlag(flags: TypeFlags): string {
  const match = Object.keys(TypeFlags)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
    .map<[string, string | number]>((key) => [key, TypeFlags[key as any]])
    .filter(isNumeric)
    .find(([, value]) => Math.log2(value) % 1 === 0 && value & flags);

  if (!match) {
    throw new Error(`No exact matching flag for ${flags}`);
  }

  return match[0];
}

export function findMatchingTypeFlags(type: Type): string[] {
  const flags = type.getFlags();

  return (
    Object.keys(TypeFlags)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
      .map<[string, string | number]>((key) => [key, TypeFlags[key as any]])
      .filter(isNumeric)
      .filter(([, value]) => value & flags)
      .map(([key]) => key)
  );
}

export function findMatchingObjectsFlags(type: Type): string[] {
  const flags = (type as TypeReference).objectFlags;

  return (
    Object.keys(ObjectFlags)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
      .map<[string, string | number]>((key) => [key, ObjectFlags[key as any]])
      .filter(isNumeric)
      .filter(([, value]) => value & flags)
      .map(([key]) => key)
  );
}

export function findMatchingSymbolFlags(symbol: Symbol): string[] {
  const flags = symbol.getFlags();

  return (
    Object.keys(SymbolFlags)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
      .map<[string, string | number]>((key) => [key, SymbolFlags[key as any]])
      .filter(isNumeric)
      .filter(([, value]) => value & flags)
      .map(([key]) => key)
  );
}

export function findExactMatchingSymbolFlags(flags: SymbolFlags): string {
  const match = Object.keys(SymbolFlags)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
    .map<[string, string | number]>((key) => [key, SymbolFlags[key as any]])
    .filter(isNumeric)
    .find(([, value]) => Math.log2(value) % 1 === 0 && value & flags);

  if (!match) {
    throw new Error(`No exact matching flag for ${flags}`);
  }

  return match[0];
}

export function formatDiagnosticError(diagnostic: Diagnostic): string {
  return formatDiagnostic(diagnostic, {
    getCurrentDirectory: (): string => process.cwd(),
    getCanonicalFileName: (fileName: string): string => fileName,
    getNewLine: (): string => '\n',
  });
}

export function getDeclarationSourceLocation(declaration: Declaration): string {
  const sourceFile = declaration.getSourceFile();
  const pos = sourceFile.getLineAndCharacterOfPosition(declaration.getStart());
  const fileNameWithPosition = [
    sourceFile.fileName,
    pos.line,
    pos.character,
  ].join(':');
  const line = sourceFile.getFullText().split('\n')[pos.line];
  const indentationMatch = /^([ \t]*)(?=\S)/.exec(line);
  const indentation = indentationMatch ? indentationMatch[1].length : 0;
  const lineWithoutIndentation = indentationMatch
    ? line.substr(indentation)
    : line;
  const posMarker = `${' '.repeat(pos.character - indentation)}^`;
  return [`at ${fileNameWithPosition}`, lineWithoutIndentation, posMarker].join(
    '\n'
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function inspectObject(type: any): string {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const obj = Object.keys(type)
    .filter((key) => ['checker'].includes(key))
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    .reduce((newObj, key) => Object.assign(newObj, { [key]: type[key] }), {});

  return inspect(obj, false, 1, true);
}

export class SupportError extends Error {}
