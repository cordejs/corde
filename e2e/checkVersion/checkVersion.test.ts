import pack from "../../package.json";
import cli from "../cliRunner";
import { assert, spec } from "../pipeline";

spec("Should get correct version using -v", async () => {
  const result = await cli.exec("-v");
  assert(result.stdout).toContain(`v${pack.version}`);
  assert(result.statusCode).toEqual(0);
});

spec("Should get correct version using --version", async () => {
  const result = await cli.exec("--version");
  assert(result.stdout).toContain(`v${pack.version}`);
  assert(result.statusCode).toEqual(0);
});
