/**
 * node < 15 compatibility of string.ReplaceAll
 *
 * @see https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll
 * @internal
 *
 */
export function replaceAll(text: string, search: string, replacement: string) {
  const regex = new RegExp(search, "g");
  return text.replace(regex, replacement);
}
