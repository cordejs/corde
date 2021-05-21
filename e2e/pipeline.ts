#!/usr/bin/env ts-node-script

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
import glob from "glob";
import path from "path";
import chalk from "chalk";
import fs from "fs";

let success = 0;
let filesPatern = "./e2e/**/*.test.ts";

const operations = new Array<Operation>();

const args = process.argv.slice(2);

if (args.length) {
  filesPatern = args[0];
}

interface Operation {
  testName: string;
  filePath?: string;
  fn: () => void | Promise<void>;
}

/**
 * Class used only for e2e tests.
 * @private
 */
class AssertionMatch<T> {
  constructor(private readonly value: T) {}
  /**
   * If string, check if the string defined in **assert** contains
   * another string. If that value is of another type, then is made
   * an `===` comparation.
   *
   * This functions is to simulate jest function `toContain` function but, this
   * goal is to internal usage.
   *
   * @param toMatchValue Value to compare defined in **assert**
   * @private
   */
  toContain<T>(toMatchValue: T) {
    if (
      (typeof this.value === "string" &&
        typeof toMatchValue === "string" &&
        this.value.includes(toMatchValue)) ||
      (this.value as any) === toMatchValue
    ) {
      success++;
    } else {
      throw new Error(
        `testing value ${chalk.red(this.value)} do not contains ${chalk.red(toMatchValue)}`,
      );
    }
  }

  /**
   * Compare `toMatchValue` with the value defined in **assert** using `===`.
   * Simulates jest function `toEqual` but it's for internal usage.
   *
   * @param toMatchValue Value to check if is equal to the value defined in **assert**
   * @private
   */
  toEqual<T>(toMatchValue: T) {
    if ((this.value as any) === toMatchValue) {
      success++;
    } else {
      throw new Error(
        `testing value ${chalk.red(this.value)} is not equal to ${chalk.red(toMatchValue)}`,
      );
    }
  }
}

/**
 * Corde internal function for match values used in e2e tests.
 * @param value Define a value to if it match with another object.
 * @private
 */
export function assert<T>(value: T) {
  return new AssertionMatch<T>(value);
}

/**
 * @private
 */
export function spec(name: string, action: () => void | Promise<void>) {
  if (!name) {
    throw new Error("testName can not be empty!");
  }
  operations.push({ testName: name, fn: action });
}

function loadTests() {
  return new Promise<string[]>((resolve, reject) => {
    glob(
      filesPatern,
      {
        ignore: ["./e2e/**/__cordeTest__/**", "./e2e/log/**"],
      },
      function (error, matches) {
        if (error) {
          reject(error);
        } else {
          const result: string[] = [];
          matches.forEach((m) => {
            if (fs.lstatSync(m).isDirectory()) {
              const files = fs.readdirSync(path.resolve(process.cwd(), m));
              result.push(
                ...files.filter((f) => !f.includes("__cordeTest__")).map((f) => path.resolve(m, f)),
              );
            } else {
              result.push(m);
            }
          });
          resolve(result);
        }
      },
    );
  });
}

function print(stdout: any) {
  process.stdout.write(stdout);
}

async function main() {
  const testsMeasureName = "tests end";
  let actualTestingFile = "";
  let exitCode = 0;
  try {
    console.time(testsMeasureName);

    print("loading test files...");
    const files = await loadTests();

    if (!files.length) {
      console.log("no test file(s) founded");
      process.exit(0);
    }

    print(`loaded ${files.length}\n`);
    print("loging example bot...");
    await login();
    print(" Done\n");

    for (const file of files) {
      const absPath = path.resolve(process.cwd(), file);
      require(absPath);
      operations[operations.length - 1].filePath = file;
    }

    // STUCK TEST: ./e2e/toDeleteRole/toDeleteRole.case1.test.ts
    for (const operation of operations) {
      actualTestingFile = operation.filePath;
      const label = `${chalk.bgGreen.black(" DONE ")}`;
      print(`testing ${operation.filePath} `);
      console.time(label);
      await operation.fn();
      console.timeEnd(label);
    }

    bot.destroy();
    console.time(testsMeasureName);
    print("\n");
    print(`Results: ${success} tests pass`);
  } catch (error) {
    bot.destroy();
    console.log(error.message);
    console.log(`${chalk.bgRed.black(" FAIL ")} ${actualTestingFile}`);
    exitCode = 1;
  } finally {
    process.exit(exitCode);
  }
}

main();
