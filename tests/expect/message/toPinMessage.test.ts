import { Client } from "discord.js";
import { runtime } from "../../../src/common";
import { ToPinMessage } from "../../../src/expect/matches";
import messageUtils from "../../../src/expect/messageUtils";
import { TestReport } from "../../../src/types";
import { buildReportMessage, typeOf } from "../../../src/utils";
import MockDiscord from "../../mocks/mockDiscord";
import { MockEvents } from "../../mocks/mockEvents";
import { createCordeBotWithMockedFunctions } from "../../testHelper";

let mockDiscord = new MockDiscord();

describe("testing pin message test", () => {
  afterEach(() => {
    mockDiscord = new MockDiscord();
  });

  it("should return error message due to no mesageIdentifier (null)", async () => {
    const corde = createCordeBotWithMockedFunctions(mockDiscord, new Client());
    const toPinMessage = new ToPinMessage(corde, "", false);
    const report = await toPinMessage.action(null);

    const expectReport: TestReport = {
      pass: false,
      message: buildReportMessage(
        `expected: message identifier to be a string or a MessageIdentifier object\n`,
        `received: ${typeOf(null)}`,
      ),
    };

    expect(report).toEqual(expectReport);
    expect(report).toMatchSnapshot();
  });

  it("should return error message due to no mesageIdentifier (undefined)", async () => {
    const corde = createCordeBotWithMockedFunctions(mockDiscord, new Client());
    const toPinMessage = new ToPinMessage(corde, "", false);
    const report = await toPinMessage.action(undefined);

    const expectReport: TestReport = {
      pass: false,
      message: buildReportMessage(
        `expected: message identifier to be a string or a MessageIdentifier object\n`,
        `received: ${typeOf(undefined)}`,
      ),
    };

    expect(report).toEqual(expectReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a passed test due to isNot true and timeout", async () => {
    runtime.setConfigs({ timeOut: 10 }, true);
    const corde = createCordeBotWithMockedFunctions(mockDiscord, new Client());
    const toPinMessage = new ToPinMessage(corde, "", true);
    const report = await toPinMessage.action("1233");

    const expectReport: TestReport = {
      pass: true,
    };

    expect(report).toEqual(expectReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test due to isNot false and timeout", async () => {
    runtime.setConfigs({ timeOut: 10 }, true);
    const corde = createCordeBotWithMockedFunctions(mockDiscord, new Client());
    const toPinMessage = new ToPinMessage(corde, "", false);
    const report = await toPinMessage.action("1233");

    const msgString = messageUtils.humanizeMessageIdentifierObject({ id: "1233" });
    const expectReport: TestReport = {
      pass: false,
      message: buildReportMessage(
        `expected: pin ${msgString}\n`,
        `received: informed message was not pinned`,
      ),
    };

    expect(report).toEqual(expectReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test due to isNot false and timeout (messageIdentifier)", async () => {
    runtime.setConfigs({ timeOut: 10 }, true);
    const corde = createCordeBotWithMockedFunctions(mockDiscord, new Client());
    const toPinMessage = new ToPinMessage(corde, "", false);
    const report = await toPinMessage.action({ id: "1233" });

    const msgString = messageUtils.humanizeMessageIdentifierObject({ id: "1233" });
    const expectReport: TestReport = {
      pass: false,
      message: buildReportMessage(
        `expected: pin ${msgString}\n`,
        `received: informed message was not pinned`,
      ),
    };

    expect(report).toEqual(expectReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a passed test due to message pinned", async () => {
    const corde = createCordeBotWithMockedFunctions(mockDiscord, new Client());
    const toPinMessage = new ToPinMessage(corde, "", false);

    const mockEvent = new MockEvents(corde, mockDiscord);
    mockEvent.mockOnceMessagePinned(mockDiscord.pinnedMessage);

    const report = await toPinMessage.action({ id: "1233" });

    const expectReport: TestReport = {
      pass: true,
    };

    expect(report).toEqual(expectReport);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test due to message pinned but isNot true", async () => {
    const corde = createCordeBotWithMockedFunctions(mockDiscord, new Client());
    const toPinMessage = new ToPinMessage(corde, "", true);

    const mockEvent = new MockEvents(corde, mockDiscord);
    mockEvent.mockOnceMessagePinned(mockDiscord.pinnedMessage);

    const report = await toPinMessage.action({ id: "1233" });
    const msgString = messageUtils.humanizeMessageIdentifierObject({ id: "1233" });

    const expectReport: TestReport = {
      pass: false,
      message: buildReportMessage(
        `expected: to not pin ${msgString}\n`,
        `received: message pin = false`,
      ),
    };

    expect(report).toEqual(expectReport);
    expect(report).toMatchSnapshot();
  });
});
