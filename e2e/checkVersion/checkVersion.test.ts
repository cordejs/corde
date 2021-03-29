import { program, _main } from "../../lib/src/cli/cli";
import { runCLI } from "../cliRunner";
import pack from "../../package.json";

it("Should get correct version using -v", async () => {
  program.exitOverride();
  expect(() => {
    program.parse(["node", "test", "-v"]);
  }).toThrow(pack.version);
});

it("Should get correct version using --version", async () => {
  program.exitOverride();
  expect(() => {
    program.parse(["node", "test", "--version"]);
  }).toThrow(pack.version);
});
