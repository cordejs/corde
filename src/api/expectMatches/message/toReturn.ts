import { Message, MessageEmbed } from "discord.js";
import { TestReport } from "../../interfaces";
import { CordeBot } from "../../../core";
import MessageUtils from "./messageUtils";
import { MinifiedEmbedMessage } from "../../../types";

export async function toReturn(
  commandName: string,
  isNot: boolean,
  cordeBot: CordeBot,
  expect: string | MessageEmbed,
): Promise<TestReport> {
  let msg = "";
  let isEqual = false;
  let showExpectAndOutputValue = true;

  try {
    await cordeBot.sendTextMessage(commandName);
    const returnedMessage = await cordeBot.awaitMessagesFromTestingBot();
    if (typeof expect !== "string") {
      showExpectAndOutputValue = false;
    }

    isEqual = MessageUtils.messagesMatches(returnedMessage, expect);

    if (isNot) {
      isEqual = !isEqual;
    }

    msg = getMessageValue(returnedMessage, expect);
  } catch (error) {
    isEqual = false;
    if (error instanceof Error) {
      msg = error.message;
    } else {
      msg = error;
    }
  }

  return new TestReport({
    commandName,
    expectation: expect,
    hasPassed: isEqual,
    output: msg,
    isNot,
    showExpectAndOutputValue,
  });
}

function getMessageValue(returnedMessage: Message, expect: string | MessageEmbed) {
  if (typeof expect === "string") {
    const formattedMsg = MessageUtils.getMessageByType(returnedMessage, "text") as Message;
    return formattedMsg.content;
  } else {
    const jsonMessage = MessageUtils.getMessageByType(
      returnedMessage,
      "embed",
    ) as MinifiedEmbedMessage;
    return JSON.stringify(jsonMessage);
  }
}
