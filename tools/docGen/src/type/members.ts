import { Symbol, Type, TypeChecker, __String } from 'typescript';
import { renderType } from '.';
import { RenderContext } from '../context';
import { renderDescription } from '../description';
import { joinLines, listItem } from '../markdown';
import { getSymbolsType } from './utils';

export function getTypeMembers(
  type: Type,
  typeChecker: TypeChecker
): { name?: string; description?: string; type: Type }[] {
  if (type.symbol && type.symbol.members) {
    const membersList: {
      name: string;
      description?: string;
      type: Type;
    }[] = [];

    type.symbol.members.forEach((value: Symbol, key: __String) => {
      membersList.push({
        name: key.toString(),
        description: renderDescription(
          value.getDocumentationComment(typeChecker)
        ),
        type: getSymbolsType(value, typeChecker),
      });
    });

    return membersList;
  }

  /* istanbul ignore else */
  if (type.isUnion()) {
    return type.types.map((type) => ({ type }));
  }

  /* istanbul ignore next */
  return [];
}

export function renderTypeMembers(
  type: Type,
  context: RenderContext,
  nestingLevel = 1
): string {
  return joinLines(
    getTypeMembers(type, context.typeChecker).map(
      ({ name, description, type }) =>
        listItem(
          renderType(type, context, {
            name,
            description,
            nestingLevel: nestingLevel + 1,
          }),
          nestingLevel
        )
    )
  );
}
