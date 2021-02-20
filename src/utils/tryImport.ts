/**
 * Bind `require` function arround with a try-catch clausure.
 * @param file File full path to be required.
 * @internal
 */
export function tryImport(file: string) {
  try {
    return require(file);
  } catch (error) {
    throw new Error("could not import file: " + file + "\n" + error);
  }
}
