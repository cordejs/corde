import { JSDocTagInfo, Symbol, SymbolFlags } from 'typescript';
import { renderAdditionalLinks } from './additionalLinks';
import { DependencyContext, RenderContext } from './context';
import { renderDescription } from './description';
import { renderExamples } from './examples';
import { heading, joinSections } from './markdown';
import { getSymbolDependencies } from './symbol';
import { getSymbolSection, isInternalSymbol } from './utils';

export function getClassDependencies(
  symbol: Symbol,
  context: DependencyContext
): Symbol[] {
  const members: Symbol[] = [];

  /* istanbul ignore else */
  if (symbol.members) {
    symbol.members.forEach((member) => {
      if (!isInternalSymbol(member)) {
        members.push(member);
      }
    });
  }

  return members.reduce<Symbol[]>(
    (dependencies, member) => [
      ...dependencies,
      ...getSymbolDependencies(member, context),
    ],
    []
  );
}

export function spreadClassProperties(
  symbols: Symbol[],
  getSectionLocation: (section: string) => string
): Symbol[] {
  return symbols.reduce<Symbol[]>((acc, symbol) => {
    if (!(symbol.getFlags() & SymbolFlags.Class) || !symbol.members) {
      return [...acc, symbol];
    }

    const classInstanceName = [
      symbol.name.charAt(0).toLowerCase(),
      symbol.name.slice(1),
    ].join('');
    const section = getSymbolSection(symbol);
    const members: Symbol[] = [];
    const memberSections = new Set<string>();
    symbol.members.forEach((member) => {
      if (!isInternalSymbol(member)) {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        member.getName = (): string => `${classInstanceName}.${member.name}`;
        members.push(member);
        const memberSection = getSymbolSection(member);
        if (memberSection !== 'default' && memberSection !== section) {
          memberSections.add(getSymbolSection(member));
        }
      }
    });

    const originalTags = symbol.getJsDocTags();
    const memberSectionsArray = Array.from<string>(memberSections.values());
    memberSectionsArray.sort();
    const additionalMemberReferences = memberSectionsArray.map<JSDocTagInfo>(
      (section: string) => ({
        name: 'see',
        text: [
          {
            text: `{@link ${getSectionLocation(section)}|${section}}`,
            kind: 'text',
          },
        ],
      })
    );
    // eslint-disable-next-line @typescript-eslint/unbound-method
    symbol.getJsDocTags = (): JSDocTagInfo[] => {
      return [...originalTags, ...additionalMemberReferences];
    };

    return [...acc, symbol, ...members];
  }, []);
}

export function renderClass(
  symbol: Symbol,
  aliasedSymbol: Symbol,
  context: RenderContext
): string {
  const name = symbol.getName();

  return joinSections([
    heading(name, 2),
    renderDescription(
      aliasedSymbol.getDocumentationComment(context.typeChecker)
    ),
    renderExamples(aliasedSymbol.getJsDocTags()),
    renderAdditionalLinks(aliasedSymbol.getJsDocTags()),
  ]);
}
