export function tryImport(file: string) {
  try {
    return require(file);
  } catch (error) {
    throw new Error("could not import file: " + file + "\n" + error);
  }
}
