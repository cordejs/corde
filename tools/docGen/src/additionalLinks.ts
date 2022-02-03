import { JSDocTagInfo } from 'typescript';
import {
  subSection,
  listItem,
  link,
  joinLines,
  joinSections,
} from './markdown';
import { getSymbolDisplayText } from './utils';

function isLink(
  value?: RegExpExecArray | null | undefined
): value is RegExpExecArray {
  return !!value;
}

function getAdditionalLinks(
  tags: JSDocTagInfo[]
): { href: string; text: string }[] {
  return tags
    .filter((tag) => tag.name === 'see')
    .map((tag) => /{@link (.*?)\|(.*?)}/.exec(getSymbolDisplayText(tag)))
    .filter(isLink)
    .map(([, href, text]) => ({ href, text }));
}

export function renderAdditionalLinks(tags: JSDocTagInfo[]): string {
  const additionalLinks = getAdditionalLinks(tags);

  if (!additionalLinks.length) {
    return '';
  }

  return joinSections([
    subSection('See also'),
    joinLines(
      additionalLinks.map(({ href, text }) =>
        listItem(link(text, href.replace(/ :\/\//g, '://')))
      )
    ),
  ]);
}
