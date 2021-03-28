import { runCLI } from "../cliRunner";
import Utils from "../testUtils";

it("tests should be not be sucessfull", async () => {
  const command = Utils.buildCommandWithConfigPath("toRenameRole", "bot_case2.test.ts");
  const results = await cli.exec(command);
  expect(results.statusCode).toEqual(1);
  expect(results.stdout).toMatchSnapshot();
});
