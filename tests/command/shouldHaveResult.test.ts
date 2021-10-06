import { Client } from "discord.js";
import { ICordeBot, ITestReport } from "../../src/types";
import MockDiscord from "../mocks/mockDiscord";
import { createCordeBotWithMockedFunctions, testHelper } from "../testHelper";
import { expect as _expect } from "../../src/expect";
import { debugCommand } from "../../src/command";
import { testCollector } from "../../src/core/TestCollector";

const testName = "shouldHaveResult";

const failReport: ITestReport = {
  pass: false,
  testName,
};

const passReport: ITestReport = {
  pass: true,
  testName,
};

let mockDiscord = new MockDiscord();
let cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

function debugCon(customCommand?: string, customChannelId?: string, customClient?: ICordeBot) {
  return debugCommand(customCommand ?? "con", customChannelId, customClient ?? cordeClient);
}

describe(`testing ${testName} function`, () => {
  beforeEach(() => {
    [mockDiscord, cordeClient] = testHelper.initCommandTestsFixtures();
  });

  it("should fail due to no test was passed", async () => {
    const report = await debugCon().shouldHaveResult();

    expect(report.pass).toEqual(false);
    expect(report).toMatchSnapshot();
  });

  it("should return true due to timeout and isNot true", async () => {
    const report = await debugCon().not.shouldHaveResult(debugCommand.shouldReturn("11"));
    expect(report.pass).toEqual(true);
  });

  it("should return failed due to timeout and isNot false", async () => {
    const report = await debugCon().shouldHaveResult(debugCommand.shouldReturn("123"));
    expect(report.pass).toEqual(false);
    expect(report).toMatchSnapshot();
  });

  it("should return failed due to timeout and isNot false", async () => {
    const report = await debugCon().shouldHaveResult(
      debugCommand.shouldReturn("123"),
      debugCommand.shouldRenameRole("newName", "1312412"),
    );

    expect(report.pass).toEqual(false);
    expect(report).toMatchSnapshot();
  });
});
