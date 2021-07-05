/**
 * @internal
 * @param cwd
 * @param jsPath
 * @param importDirectory
 * @returns
 */
export async function importJS(cwd: string, jsPath: string, importDirectory: string) {
  process.chdir(importDirectory);
  const compiled = await import(jsPath);
  process.chdir(cwd);
  return compiled;
}
