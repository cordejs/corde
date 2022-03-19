import chalk from "chalk";
import { Guild } from "discord.js";
import path from "path";
import { Permission } from "./enums";
import { typeOf } from "./utils/typeOf";

export const DEFAULT_TEST_TIMEOUT = 5000;
export const MESSAGE_TAB_SPACE = "   ";
export const EXPECT_RECEIVED_TAB_SPACE = "    ";
export const DEFAULT_STACK_TRACE_LIMIT = 3;

export const TEXT_PASS = chalk.green;
export const TEXT_FAIL = chalk.red;
export const TEXT_PENDING = chalk.yellow;
export const TEXT_EMPTY = chalk.yellowBright;
export const ROOT_DIR = "<rootDir>";

export const LINE_BREAK = "\n";

export const DEFAULT_CONFIG: Required<corde.IConfigOptions> = {
  botPrefix: "",
  botTestId: "",
  channelId: "",
  cordeBotToken: "",
  guildId: "",
  testMatches: [],
  project: path.resolve(process.cwd(), "tsconfig.json"),
  timeout: DEFAULT_TEST_TIMEOUT,
  exitOnFileReadingError: true,
  extensions: [".js", ".ts"],
  modulePathIgnorePatterns: ["(?:^|/)node_modules/"],
  rootDir: process.cwd(),
  useConfigValuesInEventsDefaultParameters: false,
  useTimeoutValueInEventsDefaultParameters: true,
  loginCordeBotOnStart: true,
  loginTimeout: 10000,
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

// This must be a additional space because the icon gets overlay by the text.
export const TEST_PASSED_ICON = TEXT_PASS("✔ ");
export const TEST_FAIL_ICON = TEXT_FAIL("x");

export const PERMISSIONS: [keyof typeof Permission] = Object.keys(Permission) as any;

function addLineBreak(...messages: string[]) {
  return LINE_BREAK + messages.join("") + LINE_BREAK;
}

export const errors = {
  channel: {
    notFound(channelId: string) {
      return addLineBreak(`Channel ${channelId} was not found`);
    },
    isNotVoice(channelId: string) {
      return addLineBreak(`Channel ${chalk.cyan(channelId)} is not a voice channel`);
    },
    cantSendMessageToNonTextChannel() {
      return addLineBreak("Can not send a message to a non text channel");
    },
    invalidChannelId() {
      return addLineBreak("No channel id provided");
    },
  },
  guild: {
    withoutChannel(guildName: string) {
      return LINE_BREAK + `Guild '${guildName}' do not have channels.` + LINE_BREAK;
    },
    invalidId(guildId: string) {
      return addLineBreak(
        `Guild id is ${chalk.red(guildId)}. `,
        `Check ${chalk.cyan("guildId")} value in ${chalk.yellow("corde.config")}.`,
      );
    },
    notFound(guildId: string, availableGuildsIds: string[]) {
      return addLineBreak(
        `Guild ${chalk.cyan(guildId)} could not be found.`,
        `Available guild: ${chalk.green(availableGuildsIds.join(", "))}`,
      );
    },
  },
  client: {
    invalidToken(token: any) {
      if (token === undefined || token === null) {
        return addLineBreak(`Token not provided`);
      }
      return addLineBreak(
        `Error trying to login with token ${chalk.red(typeOf(token))}.`,
        `Expected type ${chalk.cyan("string")}`,
      );
    },
  },
  guildDoNotContainInformedChannel: (guild: Guild, channelId: string) => {
    return addLineBreak(
      `Guild ${chalk.cyan(`${guild.name} (id: ${guild.id})`)}`,
      `doesn't contain channel ${chalk.cyan(channelId)}`,
    );
  },
  invalidToken: (token: any) => {
    if (token === undefined || token === null) {
      return addLineBreak(`Token not provided`);
    }
    return addLineBreak(
      `Error trying to login with token ${chalk.red(typeOf(token))}.`,
      `Expected type ${chalk.cyan("string")}`,
    );
  },
  emptyCommand: addLineBreak(`Can not send a empty command`),
  cordeBotWithoutGuilds: (guildId: string) => {
    return addLineBreak(
      `Corde bot isn't add to any guild.`,
      `Please add it to the guild id informed in configs: ${chalk.cyan(guildId)}`,
    );
  },
  cordeBotDontBelongToGuild: (guildId: string) => {
    return addLineBreak(
      `Corde bot isn't add to guild ${chalk.cyan(guildId)}. Change the guild id `,
      `in ${chalk.yellow("corde.config")} or add the bot to a valid guild`,
    );
  },
};
