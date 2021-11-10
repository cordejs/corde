import fg from "fast-glob";

/**
 * Get the absolute path of files based on a pattern and a ignore patern.
 *
 * @param patern Definition for files search
 * @param ignorePaterns Files to be ignored following a pattern
 * @returns Absolute path of all files
 * @interal
 */
export function getFiles(pattern: string | string[], ignorePaterns?: string[]) {
  return fg(pattern, {
    ignore: ignorePaterns ?? [],
    absolute: true,
    extglob: true,
  });
}
