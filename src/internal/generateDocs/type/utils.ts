/* eslint-disable @typescript-eslint/ban-types */
import { ObjectFlags, Type, TypeChecker, Symbol, TypeFlags, TypeReference } from "typescript";
import { RenderContext } from "../context";
import { SupportError } from "../utils";

export function getSymbolsType(symbol: Symbol, typeChecker: TypeChecker): Type {
  const declarations = symbol.getDeclarations();

  /* istanbul ignore if */
  if (!declarations) {
    throw new SupportError(`No declaration found for symbol ${symbol.getName()}`);
  }

  return typeChecker.getTypeOfSymbolAtLocation(symbol, declarations[0]);
}

export function getNonOptionalType(type: Type): Type {
  return (
    (type.isUnion() &&
      type.types.length === 2 &&
      type.types.some((type) => type.getFlags() & TypeFlags.Undefined) &&
      type.types.find((type) => !(type.getFlags() & TypeFlags.Undefined))) ||
    type
  );
}

export function isOptionalBoolean(type: Type): boolean {
  return (
    type.isUnion() &&
    type.types.length === 3 &&
    type.types.every((type) => {
      const flags = type.getFlags();
      return flags & TypeFlags.Undefined || flags & TypeFlags.BooleanLiteral;
    })
  );
}
export function isOptionalType(type: Type): boolean {
  return isOptionalBoolean(type) || getNonOptionalType(type) !== type;
}

export function isArrayType(type: Type): boolean {
  const name = type.symbol && type.symbol.getName();

  return (
    !!(type.getFlags() & TypeFlags.Object) &&
    !!((type as TypeReference).objectFlags & ObjectFlags.Reference) &&
    name === "Array"
  );
}

export function getArrayType(type: Type): Type | undefined {
  const typeArguments = (type as TypeReference).typeArguments;

  return typeArguments && typeArguments[0];
}

export function getExportedSymbolByType(type: Type, context: RenderContext) {
  const isExportedTypeAlias =
    type.aliasSymbol && context.exportedSymbols.includes(type.aliasSymbol);
  const isExportedObject =
    !!(type.getFlags() & TypeFlags.Object) && context.exportedSymbols.includes(type.symbol);

  if (isExportedTypeAlias) {
    return type.aliasSymbol;
  }

  if (isExportedObject) {
    return type.symbol;
  }
  return undefined;
}
