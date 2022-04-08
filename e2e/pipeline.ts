/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */

/**
 * package.json script: "e2e": "ts-node ./e2e/pipeline"
 */

/**
 * Corde script for end-to-end tests. In comparative with Jest, this script,
 * runs tests with average of ~5 seconds faster.
 * usage: yarn e2e
 *
 * This script must be executed outside ./e2e folder witch means, in the root
 * of corde folder.
 *
 * This script also support specifics execution,
 * just add --tests followed by the test id
 *
 */

import chalk from "chalk";
import { login, bot } from "./@bot";
import { generator } from "./tests";
import testUtils from "./testUtils";
import { CliOutput, ITestFile } from "./types";

function logoutBot() {
  console.log(chalk.cyanBright("logout bot"));
  bot.destroy();
}

async function main() {
  console.log(`Environment: ${chalk.cyan(testUtils.env())}`);
  let exitCode = 0;
  let _testsPass = true;
  process.stdout.write(chalk.cyanBright("logging example bot..."));

  await login();

  try {
    process.stdout.write(chalk.green(" Done\n"));

    const selectedTests = process.argv
      .slice(process.argv.indexOf("--tests"))
      .filter((el: any) => !isNaN(el));

    for (const [fileObj, testFn] of generator) {
      if (selectedTests.length === 0 || selectedTests.includes(fileObj.id.toString())) {
        const output = await testFn();
        console.log(chalk.cyanBright(`Output of: ${fileObj.testFile}\n`));

        if (output.stdout.trim()) {
          console.log(removeDuplicates(output.stdout));
        }

        if (output.stderr.trim()) {
          console.error(removeDuplicates(output.stderr));
        }

        //testUtils.saveOutput(fileObj.testFile, output);

        if (testsPass(output, fileObj)) {
          _testsPass = false;
          logoutBot();
          console.log(
            `${chalk.bgRed.black(" FAIL ")} Exit code: ${output.exitCode}. Expected: ${
              fileObj.exitCodeExpectation
            }`,
          );
          return 1;
        }
      }
    }

    logoutBot();
  } catch (error) {
    logoutBot();
    console.log(`${chalk.bgRed.black(" FAIL ")} ${error}`);
    exitCode = 1;
  } finally {
    console.log("\n");
    if (_testsPass) {
      console.log(`${chalk.bgGreen(" SUCCESS ")}: All tests passed`);
    }
  }
  return exitCode;
}

function removeDuplicates(val: string) {
  return Array.from(new Set(val.split("\n")))
    .join("\n")
    .toString();
}

function testsPass(output: CliOutput, fileObj: ITestFile) {
  return output.exitCode !== fileObj.exitCodeExpectation;
}

main().then((exitCode) => process.exit(exitCode));
