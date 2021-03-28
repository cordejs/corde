import { runCLI } from "../cliRunner";
import Utils from "../testUtils";

it("tests should be sucessfull", async () => {
  const command = Utils.buildCommandWithConfigPath("toAddReaction", "bot_case1.test.ts");
  const results = await cli.exec(command);
  expect(results.statusCode).toEqual(0);
  expect(results.stdout).toMatchSnapshot();
});
