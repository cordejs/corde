/**
 * @internal
 */
export function importFile(path: string): Promise<any> {
  return import(path);
}
