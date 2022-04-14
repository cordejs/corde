import { Client, PartialUser, User } from "discord.js";
import { executePromiseWithTimeout } from "../../../utils/executePromiseWithTimeout";
import { Validator } from "../../../utils/validator";
import { EventNames } from "../../intentHelper";
import { DiscordEvent } from "./DiscordEvent";

type Event = Extract<EventNames, "messageReactionAdd" | "messageReactionRemoveEmoji">;

export class MessageReaction extends DiscordEvent<Event, corde.ISearchMessageReactionsFilter> {
  constructor(client: Client, event: Event) {
    super(client, event);
  }

  once(
    filter?: corde.ISearchMessageReactionsFilter,
  ): Promise<[corde.PartialOrMessageReaction, void | User | PartialUser][]> {
    const validator = new Validator<[corde.PartialOrMessageReaction, User | PartialUser | void]>();

    if (filter?.emojis) {
      validator.add((reaction) =>
        filter?.emojis?.some((e) => e.id === reaction.emoji.id || e.name === reaction.emoji.name),
      );
    }

    if (filter?.channel) {
      validator.add((reaction) =>
        this.getChannelIdentifierValidation(reaction.message.channel, filter?.channel),
      );
    }

    if (filter?.message) {
      validator.add((reaction) =>
        this.getMessageIdentifierValidation(reaction.message, filter?.message),
      );
    }

    if (filter?.author) {
      validator.add((_, author) => this.getUserIdentifierValidation(author, filter?.author));
    }

    const response: [corde.PartialOrMessageReaction, User | PartialUser | void][] = [];
    return executePromiseWithTimeout<[corde.PartialOrMessageReaction, User | PartialUser | void][]>(
      (resolve) => {
        this.on((reaction: corde.PartialOrMessageReaction, author: User | PartialUser | void) => {
          if (validator.isValid(reaction, author)) {
            response.push([reaction, author]);
          }

          if (!filter?.emojis && !filter?.author && !filter?.message) {
            resolve(response);
          }

          if (response.length === filter?.emojis?.length) {
            resolve(response);
          }
        });
      },
      filter?.timeout,
      response,
    );
  }
}
