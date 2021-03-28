import { runCLI } from "../cliRunner";
import Utils from "../testUtils";

it("should print on console in async function", async () => {
  const command = Utils.buildCommandWithConfigPath("afterAll", "bot_case2.test.ts");
  const results = await cli.exec(command);
  expect(results.statusCode).toEqual(1);
  expect(results.stdout).toMatchSnapshot();
});
