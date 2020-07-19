import { exec, ExecException } from "child_process";
import * as pack from "../../package.json";
import path from "path";

jest.setTimeout(10000);

test("Code should be 0", async () => {
  try {
    const result = await cli([""]);
    expect(result.code).toBe(0);
  } catch (error) {
    console.log(error);
    fail();
  }
});

test("Should return package.json version", async () => {
  try {
    const result = await cli(["-v"]);
    expect(result.stdout).toContain(pack.version);
  } catch (error) {
    fail();
  }
});

interface CliResult {
  code: number;
  error: ExecException;
  stdout: string;
  stderr: string;
}

function cli(args: string[]): Promise<CliResult> {
  return new Promise((resolve, reject) => {
    exec(
      `yarn ts-node ${path.resolve(process.cwd(), "./src/cli/cli")} ${args.join(" ")}`,
      (error, stdout, stderr) => {
        if (error) {
          reject(error);
        }
        resolve({
          code: error && error.code ? error.code : 0,
          error,
          stdout,
          stderr,
        });
      },
    );
  });
}
