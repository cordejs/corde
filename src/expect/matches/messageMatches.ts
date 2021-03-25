import { MessageEmbed } from "discord.js";
import {
  EmojiLike,
  MessageIdentifier,
  MessageEditedIdentifier,
  MessageEmbedLike,
} from "../../types";

/**
 * Defines all functions that can be used
 * to check a bot reaction of a command.
 *
 */
export interface MessageMatches {
  /**
   * Defines the message expected to be returned by a
   * command.
   *
   * @param expect A message returned by a bot after invoke a command
   * @since 1.0
   */
  toReturn(expect: string): void;
  /**
   * Defines the message expected to be returned by a
   * command.
   *
   * @param expect A message returned by a bot after invoke a command
   * @since 1.0
   */
  toReturn(expect: number): void;
  /**
   * Defines the message expected to be returned by a
   * command.
   *
   * @param expect A message type **boolean**  returned by a bot after invoke a command
   * @since 1.0
   */
  toReturn(expect: boolean): void;
  /**
   * Defines the message expected to be returned by a
   * command.
   *
   * @param expect A message of type **bigint** returned by a bot after invoke a command
   * @since 1.0
   */
  toReturn(expect: bigint): void;
  /**
   * Defines the message expected to be returned by a
   * command.
   *
   * @param expect A message returned by a bot after invoke a command
   * @since 1.0
   */
  toReturn(expect: MessageEmbedLike): void;

  /**
   * Defines [reactions](https://discordjs.guide/popular-topics/reactions.html#reacting-to-messages)
   * that must be add to command message.
   *
   * @param emojis Single or list of reactions that must be added to an message.
   * It can be **emojis** or [custom emojis](https://support.discord.com/hc/en-us/articles/360036479811-Custom-Emojis).
   *
   * @example
   *
   * // Checks if the first message sent by the testing bot receives emojis in reactions.
   * expect("emoji").toAddReaction(['😄']);
   * expect("emoji").toAddReaction([{ name: '😄' }]);
   * expect("emoji").toAddReaction([{ name: '😄' }]);
   * expect("emoji").toAddReaction(['🍊', { name: '😄' }]);
   * expect("emoji").toAddReaction(['🍊', { name: '😄' }]);
   *
   * // Checks if a specific message receives emojis in reactions.
   * expect("emoji").toAddReaction(['😄'], { id: '96008815106887111' });
   * expect("emoji").toAddReaction([{ name: '😄' }], { id: '96008815106887111' });
   *
   * // This example will find for a message with content: 'message text'
   * expect("emoji").toAddReaction([{ name: '😄' }], { name: 'message text' });
   * expect("emoji").toAddReaction(['🍊', { name: '😄' }], { id: 'message text' });
   * expect("emoji").toAddReaction(['🍊', { name: '😄' }], { id: 'message text' });
   *
   * // Its also possible to search the message directly by it's id:
   * expect("emoji").toAddReaction(['😄'], '96008815106887111');
   *
   * @since 1.0
   */
  toAddReaction(emojis: string[]): void;
  toAddReaction(emojis: EmojiLike[]): void;
  toAddReaction(emojis: (string | EmojiLike)[]): void;
  toAddReaction(emojis: EmojiLike[], messageIdentifier: string): void;
  toAddReaction(emojis: EmojiLike[], messageIdentifier: MessageIdentifier): void;
  toAddReaction(emojis: (string | EmojiLike)[], messageIdentifier: string): void;
  toAddReaction(emojis: (string | EmojiLike)[], messageIdentifier: MessageIdentifier): void;
  toAddReaction(emojis: string[], messageIdentifier: string): void;
  toAddReaction(emojis: string[], messageIdentifier: MessageIdentifier): void;

  /**
   * Check if a command removes a list of reactions from the last message sent
   * by someone who is not the the testing bot or corde's bot.
   *
   * @param emojis Reactions to check if were removed. And/or reactions like (reactions that are customized).
   * @example
   *
   * toRemoveReaction([{ id: "12321" }, "😆"]);
   * toRemoveReaction([{ id: "12321" }, "😆"], "31241212512");
   *
   * @since 2.0
   */
  toRemoveReaction(emojis: EmojiLike[], messageId?: string): void;
  /**
   * Check if a command removes a list of reactions from the last message sent
   * by someone who is not the the testing bot or corde's bot.
   *
   * @param emojis Reactions to check if were removed. And/or reactions like (reactions that are customized).
   * @param messageIdentifier Object with **id** or **content** of the message.
   * @example
   *
   * toRemoveReaction([{ id: "12321" }, { name: "😆" }]);
   * toRemoveReaction([{ id: "12321" }, { name: "😆" }], { id: "1232142"});
   *
   * @since 2.0
   */
  toRemoveReaction(emojis: EmojiLike[], messageIdentifier?: MessageIdentifier): void;
  /**
   * Check if a command removes a list of reactions from the last message sent
   * by someone who is not the the testing bot or corde's bot.
   *
   * @param emojis Reactions to check if were removed. And/or reactions like (reactions that are customized).
   * @param messageId Id of the message.
   * @example
   *
   * toRemoveReaction([{ id: "12321" }, "😆"]);
   * toRemoveReaction([{ id: "12321" }, "😆"], "4121512121");
   *
   * @since 2.0
   */
  toRemoveReaction(emojis: (string | EmojiLike)[], messageId?: string): void;
  /**
   * Check if a command removes a list of reactions from the last message sent
   * by someone who is not the the testing bot or corde's bot.
   *
   * @param emojis Reactions to check if were removed. And/or reactions like (reactions that are customized).
   * @param messageIdentifier Object with **id** or **content** of the message.
   * @example
   *
   * toRemoveReaction([{ id: "12321" }, "😆"]);
   * toRemoveReaction([{ id: "12321" }, "😆"], { id: "4121512121" });
   *
   * @since 2.0
   */
  toRemoveReaction(emojis: (string | EmojiLike)[], messageIdentifier?: MessageIdentifier): void;
  /**
   * Check if a command removes a list of reactions from the last message sent
   * by someone who is not the the testing bot or corde's bot.
   *
   * @param emojis Reactions to check if were removed
   * @param messageId Id of the message.
   * @example
   *
   * toRemoveReaction(["😆"]);
   * toRemoveReaction(["😆"], { id: "13124124" });
   *
   * @since 2.0
   */
  toRemoveReaction(emojis: string[], messageId?: string): void;
  /**
   * Check if a command removes a list of reactions from the last message sent
   * by someone who is not the the testing bot or corde's bot.
   *
   * @param emojis Reactions to check if were removed.
   * @param messageIdentifier Object with **id** or **content** of the message.
   * @example
   *
   * toRemoveReaction(["😆", "🥱"]);
   * toRemoveReaction(["😆", "🥱"], { id: "1234871972" });
   *
   * @since 2.0
   */
  toRemoveReaction(emojis: string[], messageIdentifier?: MessageIdentifier): void;

  /**
   * Verify if a command pinned a message.
   *
   * @param messageId Id of the message
   * @since 2.0
   */
  toPin(messageId: string): void;
  /**
   * Verify if a command pinned a message.
   *
   * @param messageIdentifier Object with **id** or **content** of the message.
   * @since 2.0
   */
  toPin(messageIdentifier: MessageIdentifier): void;

  /**
   * Verify if a command unpinned a message.
   *
   * @param messageId Id of the message
   * @since 2.0
   */
  toUnPin(messageId: string): void;
  /**
   * Verify if a command unpinned a message.
   *
   * @param message Object with **id** or **content** of the message.
   * @since 2.0
   */
  toUnPin(messageIdentifier: MessageIdentifier): void;

  /**
   * Verify if a command edited a message.
   *
   * @param newValue New **string** value for the message.
   * @param messageIdentifier Data object with the **id** or **oldContent** of the message.
   * @since 1.0
   */
  toEditMessage(newValue: string, messageIdentifier?: MessageEditedIdentifier): void;
  /**
   * Verify if a command edited a message.
   *
   * @param newValue New **string** value for the message.
   * @param messageId Id of the message.
   * @since 1.0
   */
  toEditMessage(newValue: string, messageId?: string): void;
  /**
   * Verify if a command edited a message.
   *
   * @param newValue New **number** value for the message.
   * @param messageIdentifier Data object with the **id** or **oldContent** of the message.
   * @since 1.0
   */
  toEditMessage(newValue: number, messageIdentifier?: MessageEditedIdentifier): void;
  /**
   * Verify if a command edited a message.
   *
   * @param newValue New **number** value for the message.
   * @param messageId Id of the message.
   * @since 1.0
   */
  toEditMessage(newValue: number, messageId?: string): void;
  /**
   * Verify if a command edited a message.
   *
   * @param newValue New **bigint** value for the message.
   * @param messageIdentifier Data object with the **id** or **oldContent** of the message.
   * @since 1.0
   */
  toEditMessage(newValue: bigint, messageIdentifier?: MessageEditedIdentifier): void;
  /**
   * Verify if a command edited a message.
   *
   * @param newValue New **bigint** value for the message.
   * @param messageId Id of the message.
   * @since 1.0
   */
  toEditMessage(newValue: bigint, messageId?: string): void;
  /**
   * Verify if a command edited a message.
   *
   * @param newValue New **boolean** value for the message.
   * @param messageId Id of the message.
   * @since 1.0
   */
  toEditMessage(newValue: boolean, messageId?: string): void;
  /**
   * Verify if a command edited a message.
   *
   * @param newValue New **boolean** value for the message.
   * @param messageIdentifier Data object with the **id** or **oldContent** of the message.
   * @since 1.0
   */
  toEditMessage(newValue: boolean, messageIdentifier?: MessageEditedIdentifier): void;
  /**
   * Verify if a command edited a message.
   *
   * @param newValue New **MessageEmbedLike** value for the message.
   * @param messageIdentifier Data object with the **id** or **oldContent** of the message.
   * @since 1.0
   */
  toEditMessage(newValue: MessageEmbedLike, messageIdentifier?: MessageEditedIdentifier): void;
  /**
   * Verify if a command edited a message.
   *
   * @param newValue New **MessageEmbedLike** value for the message.
   * @param messageId Data object with the **id** or **oldContent** of the message.
   * @since 1.0
   */
  toEditMessage(newValue: MessageEmbedLike, messageId?: string): void;
}
