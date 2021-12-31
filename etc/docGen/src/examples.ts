import { JSDocTagInfo } from 'typescript';
import { subSection, code, joinSections } from './markdown';
import { getSymbolDisplayText } from './utils';

export function renderExamples(tags: JSDocTagInfo[]): string {
  const examples = tags.filter((tag) => tag.name === 'example');

  if (!examples.length) {
    return '';
  }

  return joinSections([
    subSection('Examples'),
    joinSections(
      examples.map((example: JSDocTagInfo) =>
        code(getSymbolDisplayText(example).trim())
      )
    ),
  ]);
}
