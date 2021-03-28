import Utils from "../testUtils";
import { runCLI } from "../cliRunner";

it("should set role permissions", async () => {
  const command = Utils.buildCommandWithConfigPath("toSetRolePermission", "bot_case1.test.ts");
  const results = await cli.exec(command);
  expect(results.statusCode).toEqual(0);
  expect(results.stdout).toMatchSnapshot();
});
