/* eslint-disable @typescript-eslint/ban-types */
import { Symbol, SymbolFlags, Type, TypeFlags } from "typescript";
import { getClassDependencies, renderClass } from "./class";
import { DependencyContext, RenderContext } from "./context";
import { renderEnumeration } from "./enumeration";
import { getFunctionDependencies, renderFunction } from "./function";
import { joinSections } from "./markdown";
import { getTypeDependencies, getTypeLiteralDependencies } from "./type";
import { renderTypeDeclaration } from "./typeDeclaration";
import {
  findExactMatchingSymbolFlags,
  getDeclarationSourceLocation,
  inspectObject,
  SupportError,
} from "./utils";
import { renderVariable } from "./variable";

function renderDeclaration(
  symbol: Symbol,
  aliasedSymbol: Symbol,
  type: Type,
  context: RenderContext,
): string {
  const flags = aliasedSymbol.getFlags();

  if (flags & SymbolFlags.BlockScopedVariable) {
    return renderVariable(symbol, aliasedSymbol, type, context);
  }

  if (flags & SymbolFlags.Function || flags & SymbolFlags.Method) {
    return renderFunction(symbol, aliasedSymbol, type, context);
  }

  if (flags & SymbolFlags.Class) {
    return renderClass(symbol, aliasedSymbol, context);
  }

  /* istanbul ignore next */
  if (flags & SymbolFlags.Property || flags & SymbolFlags.Constructor) {
    return "";
  }

  if (flags & SymbolFlags.TypeAlias || flags & SymbolFlags.Interface) {
    return renderTypeDeclaration(symbol, aliasedSymbol, type, context);
  }

  /* istanbul ignore else */
  if (flags & SymbolFlags.RegularEnum && type.isUnion()) {
    return renderEnumeration(symbol, aliasedSymbol, type, context);
  }

  /* istanbul ignore next */
  throw new SupportError(
    `Unsupported symbol ${inspectObject(symbol)} with flags "${findExactMatchingSymbolFlags(
      flags,
    )}"`,
  );
}

export function getSymbolDependencies(symbol: Symbol, context: DependencyContext): Symbol[] {
  if (context.resolutionPath.find((p) => p === symbol)) {
    return [];
  }

  let flags = symbol.getFlags();

  if (flags & SymbolFlags.Alias) {
    symbol = context.typeChecker.getAliasedSymbol(symbol);
    flags = symbol.getFlags();
  }

  const newContext = {
    ...context,
    resolutionPath: [...context.resolutionPath, symbol],
  };

  const declarations = symbol.getDeclarations() || /* istanbul ignore next */ [];

  return declarations.reduce<Symbol[]>((dependencies, declaration) => {
    const type = context.typeChecker.getTypeAtLocation(declaration);

    if (
      type.getFlags() & TypeFlags.Any ||
      flags & SymbolFlags.TypeParameter ||
      flags & SymbolFlags.RegularEnum
    ) {
      return dependencies;
    }

    if (
      flags & SymbolFlags.Function ||
      flags & SymbolFlags.Method ||
      flags & SymbolFlags.Constructor
    ) {
      return [...dependencies, ...getFunctionDependencies(type, newContext)];
    }

    if (flags & SymbolFlags.TypeLiteral || flags & SymbolFlags.Interface) {
      /* istanbul ignore next */
      if (flags & SymbolFlags.Transient) {
        return [];
      }

      return [...dependencies, ...getTypeLiteralDependencies(symbol, newContext)];
    }

    if (
      flags & SymbolFlags.FunctionScopedVariable ||
      flags & SymbolFlags.BlockScopedVariable ||
      flags & SymbolFlags.TypeAlias ||
      flags & SymbolFlags.Property
    ) {
      return [...dependencies, ...getTypeDependencies(symbol, type, newContext)];
    }

    /* istanbul ignore else */
    if (flags & SymbolFlags.Class) {
      if (!context.exportedSymbols.includes(symbol)) {
        return dependencies;
      }

      return [...dependencies, ...getClassDependencies(symbol, newContext)];
    }

    /* istanbul ignore next */
    throw new SupportError(
      `Unsupported symbol ${inspectObject(symbol)} with flags "${findExactMatchingSymbolFlags(
        flags,
      )}"\n${getDeclarationSourceLocation(declaration)}`,
    );
  }, []);
}

export function renderSymbol(symbol: Symbol, context: RenderContext): string {
  const flags = symbol.getFlags();
  const declarations = symbol.getDeclarations();
  const aliasedSymbol =
    flags & SymbolFlags.Alias ? context.typeChecker.getAliasedSymbol(symbol) : symbol;

  /* istanbul ignore else */
  if (declarations) {
    return joinSections(
      declarations.map<string>((declaration) => {
        try {
          return renderDeclaration(
            symbol,
            aliasedSymbol,
            context.typeChecker.getTypeAtLocation(declaration),
            context,
          );
        } catch (error) {
          /* istanbul ignore next */
          if (error instanceof SupportError) {
            /* istanbul ignore next */
            throw new Error([error.message, getDeclarationSourceLocation(declaration)].join("\n"));
          } else {
            /* istanbul ignore next */
            throw error;
          }
        }
      }),
    );
  } else {
    return "";
  }
}
