import Utils from "../testUtils";
import { runCLI } from "../cliRunner";

it("should unPin message", async () => {
  const command = Utils.buildCommandWithConfigPath("toUnPinMessage", "bot_case1.test.ts");
  const results = await cli.exec(command);
  expect(results.statusCode).toEqual(0);
  expect(results.stdout).toMatchSnapshot();
});
