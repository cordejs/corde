import { exec, ExecException } from "child_process";
import * as pack from "../../package.json";

test("Code should be 0", async () => {
  const result = await cli(["-v"]);
  expect(result.code).toBe(0);
}, 5000);

test("Should return package.json version", async () => {
  const result = await cli(["-v"]);
  expect(result.stdout).toContain(pack.version);
}, 5000);

interface CliResult {
  code: number;
  error: ExecException;
  stdout: string;
  stderr: string;
}

function cli(args: string[]): Promise<CliResult> {
  return new Promise((resolve) => {
    console.log(`node ./bin/corde ${args.join(" ")}`);
    exec(`node ./bin/corde ${args.join(" ")}`, (error, stdout, stderr) => {
      console.log(error);
      resolve({
        code: error && error.code ? error.code : 0,
        error,
        stdout,
        stderr,
      });
    });
  });
}
