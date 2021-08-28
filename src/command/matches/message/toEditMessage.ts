import { Message } from "discord.js";
import { IMessageEditedIdentifier, IMessageEmbed, Primitive, ITestReport } from "../../../types";
import { isPrimitiveValue, typeOf } from "../../../utils";
import { IExpectTestBaseParams } from "../../../types";
import { MessageExpectTest } from "./messageExpectTest";

/**
 * @internal
 */
export class ToEditMessage extends MessageExpectTest {
  constructor(params: IExpectTestBaseParams) {
    super({ ...params, testName: "toEditMessage" });
  }

  async action(
    newValue: Primitive | IMessageEmbed,
    messageIdentifier?: IMessageEditedIdentifier | string,
  ): Promise<ITestReport> {
    if (!isPrimitiveValue(newValue) && typeOf(newValue) !== "object") {
      return this.createReport(
        "expected: expect value to be a primitive value (string, boolean, number) or an IMessageEmbed object\n",
        `received: ${typeOf(newValue)}`,
      );
    }

    try {
      await this.sendCommandMessage();
    } catch (error) {
      return this.createFailedTest(error.message);
    }

    let _messageData: IMessageEditedIdentifier | undefined;

    if (typeof messageIdentifier === "string") {
      _messageData = { id: messageIdentifier };
    } else {
      _messageData = messageIdentifier;
    }

    let returnedMessage: Message;

    try {
      returnedMessage = await this.cordeBot.events.onceMessageContentOrEmbedChange(
        _messageData,
        this.timeout,
        this.channelId,
      );
    } catch {
      if (this.isNot) {
        return this.createPassTest();
      }

      if (!_messageData) {
        return this.createReport(
          "expected: testing bot to edit the last message sent\n",
          "received: message was not edited",
        );
      }

      return this.createReport(
        `expected: testing bot to edit the ${this.humanizeMessageIdentifierObject(_messageData)}\n`,
        "received: message was not edited",
      );
    }

    this.hasPassed = this.isMessagesEquals(returnedMessage, newValue);
    this.invertHasPassedIfIsNot();

    if (this.hasPassed) {
      return this.createPassTest();
    }

    if (this.isNot) {
      return this.createReport(
        "expected: message from bot be different from expectation\n",
        "received: both returned and expectation are equal",
      );
    }

    return this.createReportForExpectAndResponse(newValue, returnedMessage);
  }
}