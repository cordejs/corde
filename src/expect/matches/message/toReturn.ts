import { Message, MessageEmbed } from "discord.js";
import { MessageEmbedLike, Primitive, TestReport } from "../../../types";
import { typeOf } from "../../../utils";
import { ExpectTestBaseParams } from "../../types";
import { MessageExpectTest } from "./messageExpectTest";

/**
 * @internal
 */
export class ToReturn extends MessageExpectTest {
  constructor(params: ExpectTestBaseParams) {
    super({ ...params, testName: "toReturn" });
  }

  async action(expect: Primitive | MessageEmbedLike): Promise<TestReport> {
    let _expect: Primitive | MessageEmbed;
    const errorReport = this.validateExpect(expect);

    if (errorReport) {
      return errorReport;
    }

    await this.sendCommandMessage();
    let returnedMessage: Message;
    try {
      returnedMessage = await this.cordeBot.awaitMessagesFromTestingBot(this.timeOut);
    } catch {
      if (this.isNot) {
        return this.createPassTest();
      }

      return this.createReport(
        "expected: testing bot to send a message\n",
        "received: no message was sent",
      );
    }

    if (typeOf(expect) === "object") {
      _expect = this.embedMessageLikeToMessageEmbed(expect as MessageEmbedLike);
    } else {
      _expect = expect as Primitive;
    }

    this.hasPassed = this.messagesMatches(returnedMessage, _expect);
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

    return this.createReportForExpectAndResponse(_expect, returnedMessage);
  }
}
