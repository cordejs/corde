import shell from "shelljs";
import config from "./init";

export function runTest(dir: string | string[]) {
  if (dir) {
    (dir as Array<string>).forEach(function(file) {
      // Execute all test cases
      runShell(`${config.testFilesDir}/${file}`);
    });
  } else {
    runShell(`${config.testFilesDir}/${dir}`);
  }
}

function runShell(fileName: string) {
  if (shell.exec(`ts-node ${fileName}`).code !== 0) {
    shell.echo("Fail in file read");
    shell.exit(1);
  }
}
