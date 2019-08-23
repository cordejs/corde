import child from "child_process";
import shell from "shelljs";
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
  if (shell.exec(`ts-node ${fileName}`).code !== 0) {
    shell.echo("Fail in file read");
    shell.exit(1);
  }
}
