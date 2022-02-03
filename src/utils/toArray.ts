import { Collection } from "discord.js";

/**
 * Gets all elements from a `collection` and add them to an array.
 * @param collection Elements to be added to array
 * @returns Array elements of the collection
 */
export function convertToArray<T, U>(collection: Collection<T, U>) {
  const array: U[] = [];
  collection.forEach((v) => array.push(v));
  return array;
}
