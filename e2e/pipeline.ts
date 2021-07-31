#!/usr/bin/env ts-node-script
/* eslint-disable no-console */

/**
 * @deprecated
 * package.json script: "e2e": "ts-node ./e2e/pipeline"
 */

/**
 * Corde script for end-to-end tests. In comparation with Jest, this script,
 * runs tests with avarage of ~5 seconds faster.
 * usage: ts-node pipeline.ts
 *
 * This script must be executed outside ./e2e folder witch means, in the root
 * of corde folder.
 *
 */

// todo: process.env should be using NODE_ENV
// process.env.ENV = "E2E";

import chalk from "chalk";
import { login, bot } from "./bot";
import { generator } from "./tests";
import testUtils from "./testUtils";

function print(stdout: any) {
  process.stdout.write(stdout);
}

function logoutBot() {
  console.log(chalk.cyanBright("logout bot"));
  bot.destroy();
}

async function main() {
  const testsMeasureName = "tests end";
  let exitCode = 0;
  try {
    console.time(testsMeasureName);

    print(chalk.cyanBright("loging example bot..."));

    try {
      await login();
    } catch (error) {
      console.error(error);
      process.exit(1);
    }

    print(chalk.green(" Done\n"));

    for (const [fileObj, testFn] of generator) {
      const output = await testFn();
      console.log(chalk.cyanBright(`Output of: ${fileObj.testFile}\n`));
      console.log(output.stdout);
      testUtils.saveOutput(fileObj.testFile, output);

      if (output.exitCode !== fileObj.exitCodeExpectation) {
        console.log(
          `${chalk.bgRed.black(" FAIL ")} Exit code: ${output.exitCode}. Expected: ${
            fileObj.exitCodeExpectation
          }`,
        );
      }
    }

    logoutBot();
  } catch (error) {
    logoutBot();
    console.log(`${chalk.bgRed.black(" FAIL ")} ${error.message}`);
    exitCode = 1;
  } finally {
    console.time(testsMeasureName);
    print("\n");
    if (exitCode === 0) {
      console.log(`${chalk.bgGreen(" SUCCESS ")}: All tests passed`);
    }
    process.exit(exitCode);
  }
}

main();
