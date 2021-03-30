/**
 * @internal
 */
export function shortPathForPlataform(fullPath: string) {
  return process.platform === "win32"
    ? fullPath.replace(process.cwd() + "\\", "")
    : fullPath.replace(process.cwd() + "/", "");
}
