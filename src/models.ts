import { Collection, Message, MessageEmbed, MessageReaction } from "discord.js";
import { BehaviorSubject } from "rxjs";
import { TestReport } from "./testing-api/models";

export type messageType = "text" | "embed";
export type messageOutputType = Message | MinifiedEmbedMessage;
export type messageExpectationType = string | MessageEmbed;
export type testFunctionType = (cordeBot: CordeBot) => Promise<TestReport>;

/**
 * Available types of config files
 */
export type configFileType = "js" | "json" | "ts";

/**
 * Represents **command** structure
 */
export interface AssertionProps {
  commandName: string;
  expectation: messageExpectationType;
  usingTrueStatement: boolean;
  output?: messageOutputType;
  messageType: messageType;
}

/**
 * Represents **test** structure
 */
export interface Test {
  name?: string;
  subTests?: Test[];
  testsFunctions: testFunctionType[];
  testsReports?: TestReport[];
}

/**
 * Represents **group** structure
 */
export interface Group {
  name?: string;
  subGroups?: Group[];
  tests: Test[];
}

export interface Author {
  icon_url: string;
  name: string;
  url: string;
}

export interface Field {
  name: string;
  inline: boolean;
  value: string;
}

export interface Image {
  url: string;
}

export interface Thumbnail {
  url: string;
}

export interface MinifiedEmbedMessage {
  author: Author;
  color: number;
  description: string;
  fields: Field[];
  footer?: any;
  image: Image;
  thumbnail: Thumbnail;
  timestamp?: any;
  title: string;
  type: string;
  url: string;
}

/**
 * Contains a set of properties needed for execution of corde
 */
export default interface ConfigOptions {
  /**
   * Fake bot used to test the realy one
   */
  cordeTestToken: string;
  /**
   * User's bot that will be tested
   */
  botTestId: string;
  /**
   * User's bot token that will run.
   */
  botTestToken?: string;
  /**
   * Channel where tests will run
   */
  channelId: string;
  /**
   * Guild where tests will run
   */
  guildId: string;
  /**
   * Defines max amount of time that a command can run
   */
  timeOut?: number;
  /**
   * Defines how indentify bot calls
   */
  botPrefix: string;
  /**
   * Path for case tests. Use this from the base directory of the application
   */
  testFiles: string[];
}

/**
 * Definition of operations for CordeBot.
 */
export interface CordeBot {
  /**
   * Observes if corde bot is **ready**
   */
  hasInited: BehaviorSubject<boolean>;

  /**
   * Authenticate Corde bot to the instaled bot in Discord server.
   *
   * @param token Corde bot token
   *
   * @returns Promise resolve for success connection, or a promisse
   * rejection with a formated message if there was found a error in
   * connection attempt.
   */
  login(token: string): Promise<string>;

  /**
   * Destroi client connection.
   */
  logout(): void;

  /**
   * Send a message to a channel defined in configs.
   *
   * @see Runtime
   *
   * @param message Message without prefix that will be sent to defined servers's channel
   * @description The message is concatened with the stored **prefix** and is sent to the channel.
   *
   * @return Promisse rejection if a testing bot does not send any message in the timeout value setted,
   * or a resolve for the promisse with the message returned by the testing bot.
   */
  sendTextMessage(message: string): Promise<Message>;

  /**
   * Observes for a message send by the testing bot after corde bot
   * send it's message.
   */
  awaitMessagesFromTestingBot(): Promise<Message>;

  /**
   * Observes for reactions in a message
   */
  waitForReactions(
    message: Message,
    reactions?: string[],
  ): Promise<Collection<string, MessageReaction>>;
}
