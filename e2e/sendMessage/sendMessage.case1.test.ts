import { runCLI } from "../cliRunner";

import Utils from "../testUtils";

it("should return the sent message", async () => {
  const command = Utils.buildCommandWithConfigPath("sendMessage", "bot_case1.test.ts");
  const result = await cli.exec(command);
  expect(result.statusCode).toEqual(0);
  expect(result.stdout).toMatchSnapshot();
});
