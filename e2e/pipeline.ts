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
import * as childProcess from "child_process";
import { Stopwatch } from "../src/utils/Stopwatch";

function logoutBot() {
  console.log(chalk.cyanBright("logout bot"));
  bot.destroy();
}

function buildProject() {
  childProcess.execSync("yarn build");
}

async function main() {
  console.log(`Environment: ${chalk.cyan(testUtils.env())}`);

  if (shouldBuild()) {
    console.log("Building project... ");
    buildProject();
    console.log("Done\n");
  } else {
    console.log("Skipping build");
  }

  let exitCode = 0;
  let _testsPass = true;
  console.log(chalk.cyanBright("logging example bot..."));

  await login();

  try {
    console.log(chalk.green(" Done\n"));

    const selectedTests = process.argv
      .slice(process.argv.indexOf("--tests"))
      .filter((el: any) => !isNaN(el));

    const timer = new Stopwatch();
    for (const [fileObj, testFn] of generator) {
      if (selectedTests.length === 0 || selectedTests.includes(fileObj.id.toString())) {
        timer.start();
        const output = await testFn();
        timer.stop();

        if (testFailed(output, fileObj)) {
          _testsPass = false;
          process.stdout.write(`${chalk.red(" Failed")}\n`);
          logoutBot();
          console.log(
            `${chalk.bgRed.black(" FAIL ")} Exit code: ${output.exitCode}. Expected: ${
              fileObj.exitCodeExpectation
            }`,
          );
          return 1;
        } else {
          process.stdout.write(
            `${chalk.green(" OK")} in ${chalk.yellow(timer.elapsedFormatted)}\n`,
          );
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

function shouldBuild() {
  return process.argv.indexOf("--skip-build") !== -1;
}

function removeDuplicates(val: string) {
  return Array.from(new Set(val.split("\n")))
    .join("\n")
    .toString();
}

function testFailed(output: CliOutput, fileObj: ITestFile) {
  return output.exitCode !== fileObj.exitCodeExpectation;
}

main().then((exitCode) => process.exit(exitCode));
