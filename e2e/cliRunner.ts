import cp from "child_process";

interface CliResult {
  value: string;
  statusCode: number;
}

export class CliRunner {
  async exec(command: string) {
    return new Promise<CliResult>((resolve, reject) => {
      cp.exec(command, { cwd: "." }, (error, stdout, stderr) => {
        if (error) {
          return reject({ value: error.message, statusCode: error.code });
        }
        // remove trash data
        stdout = stdout.replace("node ./bin/corde --version", "");
        resolve({ value: stdout, statusCode: 0 });
      });
    });
  }
}

const cli = new CliRunner();
export default cli;
