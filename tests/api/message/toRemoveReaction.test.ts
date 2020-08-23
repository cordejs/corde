import { initCordeClientWithChannel } from "../../testHelper";
import { TestReport } from "../../../src/api/interfaces";
import MockDiscord from "../../mocks/mockDiscord";
import { Client } from "discord.js";
import { toAddReaction } from "../../../src/api/expectMatches";

let mockDiscord = new MockDiscord();
describe("testing toRemoveReaction", () => {
  beforeEach(() => {
    mockDiscord = new MockDiscord();
  });
  it("should return a passed test with isNot = false", async () => {
    const cordeClient = initCordeClientWithChannel(mockDiscord, new Client(), 1000);

    const reportModel = new TestReport({
      commandName: "hello",
      expectation: mockDiscord.messageReaction.emoji.name,
      output: mockDiscord.messageReaction.emoji.name,
      isNot: false,
      hasPassed: true,
      showExpectAndOutputValue: false,
    });

    cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
    cordeClient.waitForAddedReactions = jest
      .fn()
      .mockReturnValue(mockDiscord.messageReactionCollection);

    mockDiscord.message.reactions.cache = mockDiscord.messageReactionCollection;

    const report = await toAddReaction(reportModel.commandName, reportModel.isNot, cordeClient, [
      mockDiscord.messageReaction.emoji.name,
    ]);

    expect(report).toEqual(reportModel);
  });
});
