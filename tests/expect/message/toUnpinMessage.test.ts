import { ToUnpinMessage } from "../../../src/expect/matches";
import MockDiscord from "../../mocks/mockDiscord";
import { createCordeBotWithMockedFunctions } from "../../testHelper";
import { TestReport } from "../../../src/types";

let mockDiscord = new MockDiscord();
const commandName = "test";

// Mocking wait function
jest.mock("../../../src/utils");

describe("testing pin message test", () => {
  afterEach(() => {
    mockDiscord = new MockDiscord();
  });

  it("should return false due to not found message", async () => {
    const corde = createCordeBotWithMockedFunctions(mockDiscord);
    corde.findMessage = jest.fn().mockReturnValue(null);
    const toPin = new ToUnpinMessage(corde, commandName, false);
    const returned = await toPin.action({ id: mockDiscord.message.id });
    const expected: TestReport = {
      commandName,
      hasPassed: false,
      isNot: false,
    };
    expect(returned).toMatchObject(expected);
  });

  it("should assume that the message was not pinned", async () => {
    const corde = createCordeBotWithMockedFunctions(mockDiscord);
    corde.findMessage = jest.fn().mockReturnValue(mockDiscord.message);
    mockDiscord.message.pinned = false;
    const toPin = new ToUnpinMessage(corde, commandName, false);
    const returned = await toPin.action({ id: mockDiscord.message.id });
    const expected: TestReport = {
      commandName,
      hasPassed: true,
      isNot: false,
    };
    expect(returned).toMatchObject(expected);
  });

  it("should assume that the message was not pinned (isNot true)", async () => {
    const corde = createCordeBotWithMockedFunctions(mockDiscord);
    corde.findMessage = jest.fn().mockReturnValue(mockDiscord.message);
    mockDiscord.message.pinned = false;
    const toPin = new ToUnpinMessage(corde, commandName, true);
    const returned = await toPin.action({ id: mockDiscord.message.id });
    const expected: TestReport = {
      commandName,
      hasPassed: false,
      isNot: true,
    };
    expect(returned).toMatchObject(expected);
  });

  it("should assume that the message was not pinned (isNot true)", async () => {
    const corde = createCordeBotWithMockedFunctions(mockDiscord);
    corde.findMessage = jest.fn().mockReturnValue(mockDiscord.message);
    mockDiscord.message.pinned = true;
    const toPin = new ToUnpinMessage(corde, commandName, true);
    const returned = await toPin.action({ id: mockDiscord.message.id });
    const expected: TestReport = {
      commandName,
      hasPassed: true,
      isNot: true,
    };
    expect(returned).toMatchObject(expected);
  });

  it("should assume that the message was not found (isNot true)", async () => {
    const corde = createCordeBotWithMockedFunctions(mockDiscord);
    corde.findMessage = jest.fn().mockReturnValue(null);
    const toPin = new ToUnpinMessage(corde, commandName, true);
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
    corde.findMessage = jest.fn().mockReturnValue(null);
    const toPin = new ToUnpinMessage(corde, commandName, false);
    const returned = await toPin.action({ id: mockDiscord.message.id });
    const expected: TestReport = {
      commandName,
      hasPassed: false,
      isNot: false,
    };
    expect(returned).toMatchObject(expected);
  });
});
