import { Symbol, UnionType } from 'typescript';
import { renderAdditionalLinks } from './additionalLinks';
import { RenderContext } from './context';
import { renderDescription } from './description';
import { renderExamples } from './examples';
import {
  heading,
  joinLines,
  joinSections,
  listItem,
  subSection,
} from './markdown';
import { renderType } from './type';

function renderEnumerationItems(
  type: UnionType,
  context: RenderContext
): string {
  return joinSections([
    subSection('Possible values'),
    joinLines(type.types.map((type) => listItem(renderType(type, context)))),
  ]);
}

export function renderEnumeration(
  symbol: Symbol,
  aliasedSymbol: Symbol,
  type: UnionType,
  context: RenderContext
): string {
  return joinSections([
    heading(symbol.getName(), 2),
    renderDescription(
      aliasedSymbol.getDocumentationComment(context.typeChecker)
    ),
    renderEnumerationItems(type, context),
    renderExamples(aliasedSymbol.getJsDocTags()),
    renderAdditionalLinks(aliasedSymbol.getJsDocTags()),
  ]);
}
