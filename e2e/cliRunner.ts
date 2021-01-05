import cp from "child_process";

interface CliResult {
  value: string;
  statusCode: number;
}

export class CliRunner {
  async execCordeCommand(command: string) {
    return this.exec(`node ./lib/src/cli/cli ${command}`);
  }

  async exec(command: string) {
    return new Promise<CliResult>((resolve, reject) => {
      cp.exec(command, { cwd: "." }, (error, stdout, stderr) => {
        if (error) {
          return reject({ value: error.message, statusCode: error.code });
        }
        resolve({ value: stdout, statusCode: 0 });
      });
    });
  }
}

const cli = new CliRunner();
export default cli;
