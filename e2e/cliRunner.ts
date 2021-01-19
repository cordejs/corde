import cp, { ExecException, SpawnOptionsWithoutStdio } from "child_process";
import util from "util";

declare module "util" {
  function _extend(obj: object, options: any): any;
}

interface CliResult {
  stdout: string;
  error: ExecException;
  stderr: string;
  statusCode: number;
}

function _spawn(command: string, options: SpawnOptionsWithoutStdio) {
  var file, args;
  if (process.platform === "win32") {
    file = "cmd.exe";
    args = ["/s", "/c", '"' + command + '"'];
    options = util._extend({}, options);
    options.windowsVerbatimArguments = true;
  } else {
    file = "/bin/sh";
    args = ["-c", command];
  }
  return cp.spawn(file, args, options);
}

export class CliRunner {
  /**
   * Execute corde commands.
   * There is no need of inform *yarn corde* for instance.
   *
   * @param command Corde cli command. Put only the sufix of the command.
   * @param showStdout Display stout on test end.
   *
   * This function will complete *-v* with *yarn corde -v* for instance.
   */
  async exec(command: string, showStdout: boolean = false) {
    return new Promise<CliResult>((resolve) => {
      if (!command) {
        throw new Error("No command provided for test");
      }

      const child = _spawn("node ./bin/corde --config ./e2e/corde.config.js " + command, {
        cwd: process.cwd(),
      });
      const stdoutData: any[] = [];
      const stderrData: any[] = [];

      let error: Error = null;

      child.on("error", (err) => {
        error = err;
      });

      child.stdout.on("data", (chunk) => {
        stdoutData.push(chunk);
      });

      child.stderr.on("data", (chunk) => {
        stderrData.push(chunk);
      });

      child.on("close", (exitCode) => {
        let stdout = Buffer.concat(stdoutData).toString();
        const stderr = Buffer.concat(stderrData).toString();

        if (showStdout) {
          console.log(stdout);
          console.log(stderr);
        }

        if (error) {
          return resolve({ stdout, statusCode: exitCode, stderr, error });
        }
        // remove trash data
        stdout = stdout.replace("node ./bin/corde --version", "");
        resolve({ stdout, statusCode: exitCode, stderr, error });
      });
    });
  }
}

const cli = new CliRunner();
export default cli;
