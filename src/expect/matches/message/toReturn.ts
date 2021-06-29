import { Message } from "discord.js";
import { IMessageEmbed, Primitive, ITestReport } from "../../../types";
import { IExpectTestBaseParams } from "../../../types";
import { MessageExpectTest } from "./messageExpectTest";

/**
 * @internal
 */
export class ToReturn extends MessageExpectTest {
  constructor(params: IExpectTestBaseParams) {
    super({ ...params, testName: "toReturn" });
  }

  async action(expect: Primitive | IMessageEmbed): Promise<ITestReport> {
    const errorReport = this.validateExpect(expect);

    if (errorReport) {
      return errorReport;
    }

    try {
      await this.sendCommandMessage();
    } catch (error) {
      return this.createFailedTest(error.message);
    }

    let returnedMessage: Message;
    try {
      returnedMessage = await this.cordeBot.events.onceMessage(
        this.cordeBot.testBotId,
        this.channelId,
        this.timeout,
      );
    } catch {
      if (this.isNot) {
        return this.createPassTest();
      }

      return this.createReport(
        "expected: testing bot to send a message\n",
        "received: no message was sent",
      );
    }

    this.hasPassed = this.isMessagesEquals(returnedMessage, expect);
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

    return this.createReportForExpectAndResponse(expect, returnedMessage);
  }
}
