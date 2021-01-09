import cp, { ExecException } from "child_process";

interface CliResult {
  stdout: string;
  error: ExecException;
  stderr: string;
  statusCode: number;
}

export class CliRunner {
  /**
   * Execute corde commands
   * @param command
   */
  async exec(command: string) {
    return new Promise<CliResult>((resolve) => {
      cp.exec(command, { cwd: "." }, (error, stdout, stderr) => {
        if (error) {
          return resolve({ stdout, statusCode: 1, stderr, error });
        }
        // remove trash data
        stdout = stdout.replace("node ./bin/corde --version", "");
        resolve({ stdout, statusCode: 0, stderr, error });
      });
    });
  }
}

const cli = new CliRunner();
export default cli;
