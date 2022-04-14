import {
  Channel,
  Client,
  ClientEvents,
  DMChannel,
  Message,
  NewsChannel,
  PartialDMChannel,
  PartialMessage,
  PartialUser,
  TextChannel,
  ThreadChannel,
  User,
} from "discord.js";
import { Optional } from "../../../types";
import { object } from "../../../utils/object";
import { EventNames } from "../../intentHelper";
import { EVENT_CLASSES } from "./EventClasses";
import { IDiscordEvent, Spread } from "./types";

export abstract class DiscordEvent<TEvent extends EventNames, TFilter>
  implements IDiscordEvent<TEvent, TFilter>
{
  constructor(protected readonly client: Client, protected readonly event: TEvent) {}

  public canListen() {
    return this.hasIntentFor(this.client, this.event);
  }

  public getIntents(): string[] {
    return this.getIntentForEvent(this.event);
  }

  public on(fn: (...args: ClientEvents[TEvent]) => void) {
    this.client.on(this.event, fn);
    return this;
  }

  abstract once(options?: TFilter): Promise<Spread<TEvent>> | any;

  /**
   * Check if the Client has permission to access a given event:
   */
  protected hasIntentFor(client: Client, eventName: EventNames) {
    const eventClass = object.find(EVENT_CLASSES, (obj) => {
      return obj.events.includes(eventName);
    });

    if (!eventClass) {
      return false;
    }

    const intents = client.options.intents as number;
    return (intents & eventClass.bitfield) != 0;
  }

  protected getIntentForEvent(eventName: EventNames) {
    const eventClasses: string[] = [];
    object.foreachKey(EVENT_CLASSES, (key) => {
      if (EVENT_CLASSES[key].events.includes(eventName)) {
        eventClasses.push(key);
        return;
      }
    });

    return eventClasses;
  }

  protected getMessageIdentifierValidation(
    message: Optional<Message | PartialMessage>,
    identifier: Optional<corde.IMessageIdentifier>,
  ) {
    return message?.id === identifier?.id || message?.content === identifier?.content;
  }

  protected getChannelIdentifierValidation(
    channel: Optional<
      TextChannel | DMChannel | NewsChannel | PartialDMChannel | ThreadChannel | Channel
    >,
    identifier: Optional<corde.IChannelIdentifier>,
  ) {
    if (channel instanceof DMChannel) {
      return channel?.id === identifier?.id;
    }

    if (channel?.isText()) {
      return channel?.id === identifier?.id;
    }

    if (channel instanceof ThreadChannel) {
      return channel?.name === identifier?.name || channel?.id === identifier?.id;
    }

    return channel?.id === identifier?.id;
  }

  protected getUserIdentifierValidation(
    user: void | Optional<User | PartialUser>,
    identifier: Optional<corde.IUserIdentifier>,
  ) {
    return user?.id === identifier?.id || user?.username === identifier?.name;
  }
}
