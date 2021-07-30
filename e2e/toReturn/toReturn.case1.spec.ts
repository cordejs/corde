/* eslint-disable no-console */
import { runCLI } from "../cliRunner";
import testUtils from "../testUtils";

const command = testUtils.buildCommandWithConfigPath("toReturn", "bot_case1.spec.ts");
runCLI(command).then((response) => {
  testUtils.saveOutput;
});
