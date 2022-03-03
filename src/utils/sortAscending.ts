/**
 * Sorts by `ascending` an array by a key (if is an array of objects). If isn't an array
 * of objects, sorts by their values.
 *
 * @internal
 *
 * @param arr Array to be sorted
 */
export function sortAscending<T extends string | number | boolean>(arr: T[]): T[];
export function sortAscending<T extends object>(arr: T[], key: keyof T): T[];
export function sortAscending<T extends object>(arr: T[], key?: keyof T) {
  if (arr.length === 0) {
    return arr;
  }
  if (!key) {
    return arr.sort((a, b) => (a > b ? -1 : 1));
  }
  return arr.sort((a, b) => (a[key] > b[key] ? -1 : 1));
}
