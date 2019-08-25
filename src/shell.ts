import child from "child_process";
import { getConfig } from "./init";

export function runTest(dir: string | string[]) {
  if (dir) {
    (dir as string[]).forEach((file) => {
      // Execute all test cases
      child.exec(`ts-node ${process.cwd()}/${getConfig().testFilesDir}/${file}`, (output) => {
        console.log(output);
      });
    });
  } else {
    runShell(`${getConfig().testFilesDir}/${dir}`);
  }
}

function runShell(fileName: string) {
  child.exec(`ts-node ${fileName}`, (error) => {
    console.log(error);
    process.exit(1);
  })
}
