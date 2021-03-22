import { GuildEmoji, Message, MessageReaction, PartialUser, ReactionEmoji, User } from "discord.js";
import { TimeoutError } from "../../../errors";
import { EmojiLike, EmojisType, MessageData, TestReport } from "../../../types";
import { typeOf } from "../../../utils";
import { ExpectTest } from "../expectTest";

// TODO: refact it due to it's equal to ToAddReaction

export class ToRemoveReaction extends ExpectTest {
  public async action(emojis: EmojisType, messageData?: MessageData | string): Promise<TestReport> {
    if (
      messageData != null &&
      typeOf(messageData) !== "object" &&
      typeOf(messageData) !== "string"
    ) {
      return this.createReport(
        `expect: message data to be null, undefined, string or an object with id or text properties\n`,
        `received: ${typeOf(messageData)}`,
      );
    }

    if (!emojis || !Array.isArray(emojis)) {
      return this.createReport(
        `expected: emojis parameter to be an array with string or objects\n`,
        `received: ${typeOf(emojis)}`,
      );
    }

    await this.cordeBot.sendTextMessage(this.command);
    let reactionsWithAuthors: [MessageReaction, User | PartialUser][];
    try {
      const emojiLike = emojis.map((e: string | EmojiLike) => {
        if (typeof e === "string") {
          return { name: e };
        }
        return e;
      });

      const _messageData = typeof messageData === "string" ? { id: messageData } : messageData;

      reactionsWithAuthors = await this.cordeBot.events.onceMessageReactionsRemove({
        authorId: this.cordeBot.testBotId,
        emojis: emojiLike,
        messageData: _messageData,
        timeout: this.timeOut,
      });
    } catch (error) {
      if (this.isNot) {
        return { pass: true };
      }

      if (error instanceof TimeoutError && (error.data as any[])?.length) {
        const emojisReturned = reactionsFromResponse(error.data);
        return this.createReport(
          `expected: to remove reactions ${stringifyReactionToPrint(emojis)}\n`,
          `received: ${emojisReturned}`,
        );
      }

      return this.createReport(
        `expected: to remove reactions ${stringifyReactionToPrint(emojis)}\n`,
        `received: no reaction was removed to message`,
      );
    }

    // We can set it as passed due to all validations about if
    // the reactions added matches with expected are defined in the event onceMessageReactionsAdd
    this.hasPassed = true;

    this.invertHasPassedIfIsNot();

    if (this.hasPassed) {
      return { pass: true };
    }

    const emojisReturned = reactionsFromResponse(reactionsWithAuthors);

    return this.createReport(
      `expected: ${this.isNot ? "not " : ""}to remove reactions ${stringifyReactionToPrint(
        emojis,
      )}\n`,
      `received: ${emojisReturned}`,
    );
  }
}

function reactionsFromResponse(reactionsWithAuthors: [MessageReaction, User | PartialUser][]) {
  const emojis = reactionsWithAuthors.map((r) => r[0].emoji);
  return emojis.map((e) => e.name).join(", ");
}

function stringifyReactionToPrint(emojis: EmojisType) {
  return emojis
    .map((e: string | EmojiLike) => {
      if (typeof e !== "string") {
        if (e.id) {
          return e.id;
        }
        return e.name;
      }
      return e;
    })
    .join(", ");
}
