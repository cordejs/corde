import { Symbol, Type } from 'typescript';
import { renderAdditionalLinks } from './additionalLinks';
import { RenderContext } from './context';
import { renderDescription } from './description';
import { renderExamples } from './examples';
import { heading, joinSections, subSection } from './markdown';
import { renderType } from './type';

export function renderVariable(
  symbol: Symbol,
  aliasedSymbol: Symbol,
  type: Type,
  context: RenderContext
): string {
  return joinSections([
    heading(symbol.getName(), 2),
    renderDescription(
      aliasedSymbol.getDocumentationComment(context.typeChecker)
    ),
    subSection('Type'),
    renderType(type, context),
    renderExamples(aliasedSymbol.getJsDocTags()),
    renderAdditionalLinks(aliasedSymbol.getJsDocTags()),
  ]);
}
