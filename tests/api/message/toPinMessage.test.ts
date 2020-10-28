import { command } from "commander";
import { TestReport } from "../../../src/api";
import {
  ToPinMessage,
  setToPinFetchDelay,
} from "../../../src/api/expectMatches/message/toPinMessage";
import MockDiscord from "../../mocks/mockDiscord";
import { createCordeBotWithMockedFunctions } from "../../testHelper";

let mockDiscord = new MockDiscord();
const commandName = "test";

// Tests purpose
setToPinFetchDelay(1);

describe("testing pin message test", () => {
  afterEach(() => {
    mockDiscord = new MockDiscord();
  });

  it("should assume that the message is pinned", async () => {
    const corde = createCordeBotWithMockedFunctions(mockDiscord);
    corde.findPinnedMessage = jest.fn().mockReturnValue(mockDiscord.message);
    mockDiscord.message.pinned = true;
    const toPin = new ToPinMessage(corde, commandName, false);
    const returned = await toPin.action({ id: mockDiscord.message.id });
    const expected = new TestReport({
      commandName,
      hasPassed: true,
      isNot: false,
      showExpectAndOutputValue: false,
    });
    expect(expected).toEqual(returned);
  });

  it("should assume that the message was not pinned", async () => {
    const corde = createCordeBotWithMockedFunctions(mockDiscord);
    corde.findPinnedMessage = jest.fn().mockReturnValue(mockDiscord.message);
    mockDiscord.message.pinned = false;
    const toPin = new ToPinMessage(corde, commandName, false);
    const returned = await toPin.action({ id: mockDiscord.message.id });
    const expected = new TestReport({
      commandName,
      hasPassed: false,
      isNot: false,
      showExpectAndOutputValue: false,
    });
    expect(expected).toEqual(returned);
  });

  it("should assume that the message was not pinned (isNot true)", async () => {
    const corde = createCordeBotWithMockedFunctions(mockDiscord);
    corde.findPinnedMessage = jest.fn().mockReturnValue(mockDiscord.message);
    mockDiscord.message.pinned = false;
    const toPin = new ToPinMessage(corde, commandName, true);
    const returned = await toPin.action({ id: mockDiscord.message.id });
    const expected = new TestReport({
      commandName,
      hasPassed: true,
      isNot: true,
      showExpectAndOutputValue: false,
    });
    expect(expected).toEqual(returned);
  });

  it("should assume that the message was not pinned (isNot true)", async () => {
    const corde = createCordeBotWithMockedFunctions(mockDiscord);
    corde.findPinnedMessage = jest.fn().mockReturnValue(mockDiscord.message);
    mockDiscord.message.pinned = true;
    const toPin = new ToPinMessage(corde, commandName, true);
    const returned = await toPin.action({ id: mockDiscord.message.id });
    const expected = new TestReport({
      commandName,
      hasPassed: false,
      isNot: true,
      showExpectAndOutputValue: false,
    });
    expect(expected).toEqual(returned);
  });

  it("should assume that the message was not found (isNot true)", async () => {
    const corde = createCordeBotWithMockedFunctions(mockDiscord);
    corde.findPinnedMessage = jest.fn().mockReturnValue(null);
    const toPin = new ToPinMessage(corde, commandName, true);
    const returned = await toPin.action({ id: mockDiscord.message.id });
    const expected = new TestReport({
      commandName,
      hasPassed: false,
      isNot: true,
      showExpectAndOutputValue: false,
    });
    expect(expected).toEqual(returned);
  });

  it("should assume that the message was not found (isNot true)", async () => {
    const corde = createCordeBotWithMockedFunctions(mockDiscord);
    corde.findPinnedMessage = jest.fn().mockReturnValue(null);
    const toPin = new ToPinMessage(corde, commandName, false);
    const returned = await toPin.action({ id: mockDiscord.message.id });
    const expected = new TestReport({
      commandName,
      hasPassed: false,
      isNot: false,
      showExpectAndOutputValue: false,
    });
    expect(expected).toEqual(returned);
  });
});
