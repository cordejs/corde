import { ObjectFlags, Type, TypeFlags, TypeReference } from 'typescript';
import { RenderContext } from '../context';
import { inlineCode } from '../markdown';
import {
  findExactMatchingTypeFlag,
  inspectObject,
  SupportError,
} from '../utils';
import { renderTypeDeclaration } from './declaration';
import { isOptionalBoolean } from './utils';

export function getTypeTitle(type: Type, context: RenderContext): string {
  const flags = type.getFlags();
  const objectFlags = (type as TypeReference).objectFlags;

  if (type.aliasSymbol) {
    return type.aliasSymbol.getName();
  }

  if (flags & TypeFlags.Number) {
    return 'number';
  }

  if (flags & TypeFlags.String) {
    return 'string';
  }

  if (flags & TypeFlags.Boolean || isOptionalBoolean(type)) {
    return 'boolean';
  }

  if (flags & TypeFlags.Void) {
    return 'void';
  }

  if (flags & TypeFlags.Any) {
    return 'any';
  }

  if (flags & TypeFlags.Unknown) {
    return 'unknown';
  }

  if (flags & TypeFlags.Null) {
    return 'null';
  }

  if (type.isUnion()) {
    return (
      type.types
        .filter((type) => !(type.getFlags() & TypeFlags.Undefined))
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        .map((type) => renderTypeDeclaration(type, context))
        .join(' | ')
    );
  }

  if (
    flags & TypeFlags.TypeParameter ||
    objectFlags & ObjectFlags.Interface ||
    objectFlags & ObjectFlags.Reference
  ) {
    return type.symbol && type.symbol.getName();
  }

  if (flags & TypeFlags.EnumLiteral) {
    return inlineCode(type.symbol && type.symbol.getName());
  }

  if (type.isStringLiteral()) {
    return inlineCode(`'${type.value}'`);
  }

  /* istanbul ignore else */
  if (objectFlags & ObjectFlags.Anonymous || flags & TypeFlags.NonPrimitive) {
    return 'object';
  }

  /* istanbul ignore next */
  throw new SupportError(
    `Not supported type ${inspectObject(
      type
    )} with flags "${findExactMatchingTypeFlag(flags)}"`
  );
}
