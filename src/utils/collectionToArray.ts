import { Collection } from "discord.js";

/**
 * Pick all values of a collection and returns it in an array
 *
 * @param col Collection
 * @returns Values of the collection
 * @internal
 */
export function collectionToArray<K, Holds>(col: Collection<K, Holds>): Holds[] {
  const arr: Holds[] = [];
  col.each((v) => arr.push(v));
  return arr;
}
