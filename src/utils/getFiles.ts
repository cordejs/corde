import glob from "glob";
import fs from "fs";
import path from "path";

/**
 * Get the absolute path of files based on a pattern and a ignore patern.
 *
 * @param patern Definition for files search
 * @param ignorePaterns Files to be ignored following a pattern
 * @returns Absolute path of all files
 * @interal
 */
export async function getFiles(patern: string, ignorePaterns?: string[]) {
  return new Promise<string[]>((resolve, reject) => {
    glob(
      patern,
      {
        ignore: ignorePaterns ?? [],
      },
      (error, matches) => {
        if (error) {
          reject(error);
        }

        const result: string[] = [];
        for (const match of matches) {
          if (fs.lstatSync(match).isDirectory()) {
            const files = fs.readdirSync(path.resolve(process.cwd(), match));
            result.push(...files.map((file) => path.resolve(process.cwd(), file)));
          } else {
            result.push(path.resolve(process.cwd(), match));
          }
        }

        resolve(result);
      },
    );
  });
}
