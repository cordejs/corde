import sh from "shelljs";
import { logout } from "./bot";
import { getConfig } from "./init";

export const result: string[] = [];
export async function execFiles(dir: string | string[]) {
  if (dir) {
    (dir as string[]).forEach(async file => {
      // Execute all test cases
      try {
        await runShell(
          `ts-node ${process.cwd()}/${getConfig().testFilesDir}/${file}`
        );
      } catch (error) {
        console.log(error);
        logout();
        process.exit(1);
      }
    });
  } else {
    runShell(`${getConfig().testFilesDir}/${dir}`);
  }
}

async function runShell(command: string) {
  return new Promise((resolve, reject) => {
    sh.exec(command, (code, stdout, stderr) => {
      if (code !== 0) {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
}
