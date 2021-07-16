import chalk from "chalk";
import path from "path";
import { IConfigOptions } from "./types";

export const DEFAULT_TEST_TIMEOUT = 5000;
export const MESSAGE_TAB_SPACE = "   ";
export const EXPECT_RECEIVED_TAB_SPACE = "    ";
export const DEFAULT_STACK_TRACE_LIMIT = 3;

export const TEXT_PASS = chalk.green;
export const TEXT_FAIL = chalk.red;
export const TEXT_PENDING = chalk.yellow;
export const TEXT_EMPTY = chalk.yellowBright;
export const ROOT_DIR = "<rootDir>";

export const DEFAULT_CONFIG: IConfigOptions = {
  botPrefix: "",
  botTestId: "",
  channelId: "",
  cordeBotToken: "",
  guildId: "",
  testMatches: [""],
  botToken: "",
  project: path.resolve(process.cwd(), "tsconfig.json"),
  timeout: DEFAULT_TEST_TIMEOUT,
  exitOnFileReadingError: true,
  extensions: [".js", ".ts"],
  modulePathIgnorePatterns: ["(?:^|/)node_modules/"],
  rootDir: ".",
};

export const TAG_PENDING = (text = "RUNS") => chalk.bgYellow(chalk.black(` ${text} `));

// Tags FAIL and PASS must have an additional space to align with the tag EMPTY
// I.E:
//
//  PASS    D:/github/corde/example/test/bot.test.js
//  EMPTY   D:/github/corde/example/test/bot.test.js
//  PASS    D:/github/corde/example/test/bot.test.js

export const TAG_FAIL = (text = "FAIL") => {
  return chalk.bgRed(chalk.black(` ${text} `)) + " ";
};

export const TAG_PASS = (text = "PASS") => {
  return chalk.bgGreen(chalk.black(` ${text} `)) + " ";
};

export const TEST_RUNNING_ICON = "●";

// This must be a adicional space because the icon gets overlayed by the text.
export const TEST_PASSED_ICON = TEXT_PASS("✔ ");
export const TEST_FAIL_ICON = TEXT_FAIL("x");
