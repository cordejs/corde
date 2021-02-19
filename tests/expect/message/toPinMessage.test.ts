import { ToPinMessage } from "../../../src/expect/matches";
import { TestReport } from "../../../src/types";
import MockDiscord from "../../mocks/mockDiscord";
import { createCordeBotWithMockedFunctions } from "../../testHelper";

// Mocking wait function
jest.mock("../../../src/utils");

let mockDiscord = new MockDiscord();
const commandName = "test";

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
    const expected: TestReport = {
      commandName,
      hasPassed: true,
      isNot: false,
    };
    expect(returned).toMatchObject(expected);
  });

  it("should assume that the message was not pinned", async () => {
    const corde = createCordeBotWithMockedFunctions(mockDiscord);
    corde.findPinnedMessage = jest.fn().mockReturnValue(mockDiscord.message);
    mockDiscord.message.pinned = false;
    const toPin = new ToPinMessage(corde, commandName, false);
    const returned = await toPin.action({ id: mockDiscord.message.id });
    const expected: TestReport = {
      commandName,
      hasPassed: false,
      isNot: false,
    };
    expect(returned).toMatchObject(expected);
  });

  it("should assume that the message was not pinned (isNot true)", async () => {
    const corde = createCordeBotWithMockedFunctions(mockDiscord);
    corde.findPinnedMessage = jest.fn().mockReturnValue(mockDiscord.message);
    mockDiscord.message.pinned = false;
    const toPin = new ToPinMessage(corde, commandName, true);
    const returned = await toPin.action({ id: mockDiscord.message.id });
    const expected: TestReport = {
      commandName,
      hasPassed: true,
      isNot: true,
    };
    expect(returned).toMatchObject(expected);
  });

  it("should assume that the message was not pinned (isNot true)", async () => {
    const corde = createCordeBotWithMockedFunctions(mockDiscord);
    corde.findPinnedMessage = jest.fn().mockReturnValue(mockDiscord.message);
    mockDiscord.message.pinned = true;
    const toPin = new ToPinMessage(corde, commandName, true);
    const returned = await toPin.action({ id: mockDiscord.message.id });
    const expected: TestReport = {
      commandName,
      hasPassed: false,
      isNot: true,
    };
    expect(returned).toMatchObject(expected);
  });

  it("should assume that the message was not found (isNot true)", async () => {
    const corde = createCordeBotWithMockedFunctions(mockDiscord);
    corde.findPinnedMessage = jest.fn().mockReturnValue(null);
    const toPin = new ToPinMessage(corde, commandName, true);
    const returned = await toPin.action({ id: mockDiscord.message.id });
    const expected: TestReport = {
      commandName,
      hasPassed: false,
      isNot: true,
    };
    expect(returned).toMatchObject(expected);
  });

  it("should assume that the message was not found (isNot true)", async () => {
    const corde = createCordeBotWithMockedFunctions(mockDiscord);
    corde.findPinnedMessage = jest.fn().mockReturnValue(null);
    const toPin = new ToPinMessage(corde, commandName, false);
    const returned = await toPin.action({ id: mockDiscord.message.id });
    const expected: TestReport = {
      commandName,
      hasPassed: false,
      isNot: false,
    };
    expect(returned).toMatchObject(expected);
  });
});
