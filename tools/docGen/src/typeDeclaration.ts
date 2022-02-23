import { Symbol, Type, TypeFlags } from 'typescript';
import { renderAdditionalLinks } from './additionalLinks';
import { RenderContext } from './context';
import { renderDescription } from './description';
import { renderExamples } from './examples';
import { heading, joinSections, subSection } from './markdown';
import { renderTypeMembers } from './type/members';

function renderContentTitle(type: Type): string {
  const flags = type.getFlags();

  if (flags & TypeFlags.Object && type.getProperties().length) {
    return subSection('Properties');
  }

  if (type.isUnion()) {
    return subSection('Possible values');
  }

  return '';
}

export function renderTypeDeclaration(
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
    renderContentTitle(type),
    renderTypeMembers(type, context),
    renderExamples(aliasedSymbol.getJsDocTags()),
    renderAdditionalLinks(aliasedSymbol.getJsDocTags()),
  ]);
}
