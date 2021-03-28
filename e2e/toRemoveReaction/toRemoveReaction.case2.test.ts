import Utils from "../testUtils";
import { runCLI } from "../cliRunner";

it("should not a message Reaction", async () => {
  const command = Utils.buildCommandWithConfigPath("toRemoveReaction", "bot_case2.test.ts");
  const results = await cli.exec(command);
  expect(results.statusCode).toEqual(1);
  expect(results.stdout).toMatchSnapshot();
});
