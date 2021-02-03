import cli from "../cliRunner";
import { assert, spec } from "../pipeline";
import Utils from "../testUtils";

spec("should return the sent message", async () => {
  const command = Utils.buildCommandWithConfigPath("sendMessage", "bot_case1.test.ts");
  const result = await cli.exec(command);
  assert(result.stdout).toContain("TEST MESSAGE");
  assert(result.statusCode).toEqual(0);
});
