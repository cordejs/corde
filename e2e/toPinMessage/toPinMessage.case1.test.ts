import Utils from "../testUtils";
import { runCLI } from "../cliRunner";

it("should pin message", async () => {
  const command = Utils.buildCommandWithConfigPath("toPinMessage", "bot_case1.test.ts");
  const results = await cli.exec(command);
  expect(results.statusCode).toEqual(0);
  expect(results.stdout).toMatchSnapshot();
});
