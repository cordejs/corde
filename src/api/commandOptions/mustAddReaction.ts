import { Message } from "discord.js";
import { CordeBot } from "../../interfaces";
import { TestReport } from "../interfaces/testReport";
import { BaseCommand } from "./baseCommand";

export class MustAddReaction extends BaseCommand<string[]> {
  public async run(cordeBot: CordeBot, reactions: string[]): Promise<TestReport> {
    let isEqual = false;
    let expectation = "";
    let output = "";

    expectation = reactions.join();

    try {
      const message = await cordeBot.sendTextMessage(super.commandName);
      await cordeBot.waitForReactions(message, reactions);
      isEqual = this.isOutputEqualToExpect(message, reactions);
      output = message.reactions.cache.map((v) => v.emoji.name).join();
    } catch (error) {
      throw new Error(error.message);
    }

    return {
      commandName: super.commandName,
      expectation,
      output,
      testSucessfully: isEqual,
      isNot: super.isNot,
      // Problems in display emojis in windows console
      showExpectAndOutputValue: process.platform === "win32" ? false : true,
    } as TestReport;
  }

  private isOutputEqualToExpect(message: Message, expectation: string | string[]) {
    if (typeof expectation === "string" && message.reactions.cache.has(expectation)) {
      return true;
    } else {
      for (const i in expectation as string[]) {
        if (message.reactions.cache.has(expectation[i])) {
          return true;
        } else {
          return false;
        }
      }
    }
    return false;
  }
}
