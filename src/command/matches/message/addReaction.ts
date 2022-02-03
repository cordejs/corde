import { PartialUser, User } from "discord.js";
import { TimeoutError } from "../../../errors";
import { EmojisType } from "../../../types";
import { typeOf } from "../../../utils";
import { CommandState } from "../commandState";

/**
 * Function to be injected globally.
 * **Do not use it directly**.
 *
 * @internal
 */
export async function addReaction(
  this: CommandState,
  emojis: EmojisType,
  messageIdentifier?: corde.IMessageIdentifier | string,
) {
  if (
    messageIdentifier != null &&
    typeOf(messageIdentifier) !== "object" &&
    typeOf(messageIdentifier) !== "string"
  ) {
    return this.createReport(
      "expect: message data to be null, undefined, string or an object with id or text properties\n",
      `received: ${typeOf(messageIdentifier)}`,
    );
  }

  if (!emojis || !Array.isArray(emojis)) {
    return this.createReport(
      "expected: emojis parameter to be an array with string or objects\n",
      `received: ${typeOf(emojis)}`,
    );
  }

  try {
    await this.sendCommandMessage();
  } catch (error) {
    return this.createFailedTest(error.message);
  }

  let reactionsWithAuthors: [corde.PartialOrMessageReaction, void | User | PartialUser][];
  try {
    const emojiLike = emojis.map((e: string | corde.IEmoji) => {
      if (typeof e === "string") {
        return { name: e };
      }
      return e;
    });

    const _messageData =
      typeof messageIdentifier === "string" ? { id: messageIdentifier } : messageIdentifier;

    reactionsWithAuthors = await this.cordeBot.events.onceMessageReactionsAdd({
      author: { id: this.cordeBot.testBotId },
      emojis: emojiLike,
      message: _messageData,
      timeout: this.timeout,
      channel: { id: this.channelId },
    });
  } catch (error) {
    if (this.isNot) {
      return this.createPassTest();
    }

    if (error instanceof TimeoutError && (error.data as any[])?.length) {
      const _emojisReturned = reactionsFromResponse(error.data);
      return this.createReport(
        `expected: to add reactions ${stringifyReactionToPrint(emojis)}\n`,
        `received: ${_emojisReturned}`,
      );
    }

    return this.createReport(
      `expected: to add reactions ${stringifyReactionToPrint(emojis)}\n`,
      "received: no reaction was added to message",
    );
  }

  // We can set it as passed due to all validations about if
  // the reactions added matches with expected are defined in the event onceMessageReactionsAdd
  this.hasPassed = true;

  this.invertHasPassedIfIsNot();

  if (this.hasPassed) {
    return this.createPassTest();
  }

  const emojisReturned = reactionsFromResponse(reactionsWithAuthors);

  return this.createReport(
    `expected: ${this.isNot ? "not " : ""}to add reactions ${stringifyReactionToPrint(emojis)}\n`,
    `received: ${emojisReturned}`,
  );
}

function reactionsFromResponse(
  reactionsWithAuthors: [corde.PartialOrMessageReaction, void | User | PartialUser][],
) {
  const emojis = reactionsWithAuthors.map((r) => r[0].emoji);
  return emojis.map((e) => e.name).join(", ");
}

function stringifyReactionToPrint(emojis: EmojisType) {
  return emojis
    .map((e: string | corde.IEmoji) => {
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
