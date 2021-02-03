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

let failues = 0;
let success = 0;

const operations = new Array<Operation>();

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
      "./e2e/**/*.test.ts",
      {
        ignore: ["./e2e/**/__cordeTest__/**"],
      },
      function (error, files) {
        if (error) {
          reject(error);
        } else {
          resolve(files);
        }
      },
    );
  });
}

function print(stdout: any) {
  process.stdout.write(stdout);
}

let actualTestingFile = "";

async function main() {
  const testsMeasureName = "tests end";
  try {
    console.time(testsMeasureName);

    print("loading test files...");
    const files = await loadTests();

    print(`loaded ${files.length}\n`);

    print("requiring files...");
    for (const file of files) {
      const absPath = path.resolve(process.cwd(), file);
      require(absPath);
      operations[operations.length - 1].filePath = file;
    }

    await operations[0].fn();
    print(" Done\n");

    print("loging example bot...");
    await login();
    print(" Done\n");

    for (const operation of operations) {
      actualTestingFile = operation.filePath;
      const label = `${chalk.bgGreen.black(" SUCESS ")} ${operation.filePath}`;
      console.time(label);
      await operation.fn();
      console.timeEnd(label);
    }

    bot.destroy();
    console.time(testsMeasureName);
    print("\n");
    print(`Results: success: ${success}, fails: ${failues}`);
  } catch (error) {
    bot.destroy();
    console.log(`${chalk.bgRed.black(" FAIL ")} ${actualTestingFile}`);
    throw error;
  }
}

main();
