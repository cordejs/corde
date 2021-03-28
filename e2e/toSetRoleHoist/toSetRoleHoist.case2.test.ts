import Utils from "../testUtils";
import { runCLI } from "../cliRunner";

it("should change role color", async () => {
  const command = Utils.buildCommandWithConfigPath("toSetRoleHoist", "bot_case2.test.ts");
  const results = await cli.exec(command);
  expect(results.statusCode).toEqual(1);
  expect(results.stdout).toMatchSnapshot();
});
