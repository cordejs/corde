/**
 * Corde script for end-to-end tests. In comparation with Jest, this script,
 * runs tests with avarage of ~5 seconds faster.
 * usage: ts-node pipeline.ts
 *
 * This script must be executed outside ./e2e folder witch means, in the root
 * of corde folder.
 *
 */

import { login, bot } from "./bot";
import glob from "glob";
import path from "path";

let failues = 0;
let success = 0;

const operations = new Array<Operation>();

interface Operation {
  testName: string;
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
      failues++;
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
    return (this.value as any) === toMatchValue;
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

export function spec(name: string, action: () => void | Promise<void>) {
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

async function main() {
  const testsMeasureName = "tests end";
  console.time(testsMeasureName);

  print("loading test files...");
  const files = await loadTests();

  print(`loaded ${files.length}\n`);

  print("requiring files...");
  for (const file of files) {
    const absPath = path.resolve(process.cwd(), file);
    require(absPath);
  }
  print(" Done\n");

  print("loging example bot...");
  await login();
  print(" Done\n");

  for (const operation of operations) {
    console.time(operation.testName);
    await operation.fn();
    console.timeEnd(operation.testName);
    print("\n");
  }

  bot.destroy();
  console.time(testsMeasureName);
  print("\n");
  print(`Results: success: ${success}, fails: ${failues}`);

  if (failues > 0) {
    process.exit(1);
  }
}

main();
