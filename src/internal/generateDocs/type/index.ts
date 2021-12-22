/* eslint-disable @typescript-eslint/ban-types */
import { ObjectFlags, Symbol, SymbolFlags, Type, TypeReference } from "typescript";
import { DependencyContext, RenderContext } from "../context";
import { joinLines } from "../markdown";
import { getSymbolDependencies } from "../symbol";
import { TypeContext } from "./context";
import { renderTypeDeclaration } from "./declaration";
import { renderTypeMembers } from "./members";
import { getNonOptionalType } from "./utils";

function hasMembers(type: Type): boolean {
  const objectFlags = (type as TypeReference).objectFlags;

  return !type.aliasSymbol && !!(objectFlags & ObjectFlags.Anonymous);
}

export function getTypeLiteralDependencies(symbol: Symbol, context: DependencyContext): Symbol[] {
  const members: Symbol[] = [];

  /* istanbul ignore else */
  if (symbol.members) {
    symbol.members.forEach((member) => {
      members.push(member);
    });
  }

  return members.reduce<Symbol[]>(
    (dependencies, member) => [...dependencies, ...getSymbolDependencies(member, context)],
    [],
  );
}

export function getTypeDependencies(
  symbol: Symbol | undefined,
  type: Type,
  context: DependencyContext,
): Symbol[] {
  const symbolFlags = symbol ? symbol.getFlags() : 0;
  const typeSymbol = type.getSymbol();

  if (typeSymbol && typeSymbol.getFlags() & SymbolFlags.Enum) {
    return [];
  }

  if (!(symbolFlags & SymbolFlags.TypeAlias) && type.aliasSymbol) {
    return [
      ...(context.exportedSymbols.includes(type.aliasSymbol) ? [type.aliasSymbol] : []),
      ...getSymbolDependencies(type.aliasSymbol, context),
    ];
  }

  if (type.isUnion()) {
    return type.types.reduce<Symbol[]>(
      (dependencies, type) => [...dependencies, ...getTypeDependencies(undefined, type, context)],
      [],
    );
  }

  if (!typeSymbol) {
    return [];
  }

  const typeReference = type as TypeReference;
  const typeArguments = typeReference.typeArguments || [];
  const typeArgumentDependencies = typeArguments.reduce<Symbol[]>((dependencies, typeArgument) => {
    const symbol = typeArgument.getSymbol();

    return [...dependencies, ...getTypeDependencies(symbol, typeArgument, context)];
  }, []);

  return [
    ...(context.exportedSymbols.includes(typeSymbol) ? [typeSymbol] : []),
    ...getSymbolDependencies(typeSymbol, context),
    ...typeArgumentDependencies,
  ];
}

export function renderType(
  type: Type,
  context: RenderContext,
  typeContext: TypeContext = {},
): string {
  const nonOptionalType = getNonOptionalType(type);

  return joinLines([
    renderTypeDeclaration(type, context, typeContext),
    hasMembers(nonOptionalType)
      ? renderTypeMembers(nonOptionalType, context, typeContext.nestingLevel)
      : "",
  ]);
}
