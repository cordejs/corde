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

import { login, bot } from "./bot";
import { generator } from "./tests";

function print(stdout: any) {
  process.stdout.write(stdout);
}

async function main() {
  const testsMeasureName = "tests end";
  let exitCode = 0;
  try {
    console.time(testsMeasureName);

    print("loading test files...");

    print("loging example bot...");
    await login();
    print(" Done\n");

    let actual = null;

    do {
      actual = generator.next();
      console.log(actual);
      await actual.value;
    } while (actual === null || actual.done);

    bot.destroy();
    console.time(testsMeasureName);
    print("\n");
    //print(`Results: ${success} tests pass`);
  } catch (error) {
    bot.destroy();
    console.log(error.message);
    //console.log(`${chalk.bgRed.black(" FAIL ")} ${actualTestingFile}`);
    exitCode = 1;
  } finally {
    process.exit(exitCode);
  }
}

main();
