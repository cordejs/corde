import { runCLI } from "../cliRunner";

import Utils from "../testUtils";

it("should print on console", async () => {
  const command = Utils.buildCommandWithConfigPath("beforeStart", "bot_case1.test.ts");
  const results = await cli.exec(command);
  expect(results.statusCode).toEqual(0);
  expect(results.stdout).toMatchSnapshot();
});
