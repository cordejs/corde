import { _main } from "../../lib/src/cli/cli";
import { runCLI } from "../cliRunner";
import pack from "../../package.json";

// For some reason, when testing the version,
// The code throws error because it runs the validator.
// As we are checking the version, there is no files to test,
// so when validator is executed, it throws a error.
// But if run "yarn corde -v" it runs perfectly. lol

it("Should get correct version using --version", async () => {
  const [mockProcess, stdout] = await runCLI("--version");
  expect(mockProcess).toBeCalledWith(0);
  expect(stdout).toContain(pack.version);
});

it("Should get correct version using --version", async () => {
  const [mockProcess, stdout] = await runCLI("-v");
  expect(mockProcess).toBeCalledWith(0);
  expect(stdout).toContain(pack.version);
});
