import { Client } from "discord.js";
import MockDiscord from "../../mocks/mockDiscord";
import { createCordeBotWithMockedFunctions } from "../../testHelper";
import { TimeoutError } from "rxjs";
import { MessageEmbedLike, TestReport } from "../../../src/types";
import { ToReturn } from "../../../src/expect/matches";
import { buildReportMessage } from "../../../src/utils";
import { runtime } from "../../../src/common";

let mockDiscord = new MockDiscord();

describe("testing toReturn", () => {
  afterEach(() => {
    mockDiscord = new MockDiscord();
  });

  it("should return a failed test due to invalid parameter (null)", async () => {
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const message = buildReportMessage(
      `expected: expect value to be a primitive value (string, boolean, number) or an MessageEmbedLike\n`,
      `received: null`,
    );

    const reportModel: TestReport = {
      pass: false,
      message,
    };

    const toReturn = new ToReturn(cordeClient, "ping", false);
    const report = await toReturn.action(null);
    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should return a failed test due to invalid parameter (undefined)", async () => {
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const message = buildReportMessage(
      `expected: expect value to be a primitive value (string, boolean, number) or an MessageEmbedLike\n`,
      `received: undefined`,
    );

    const reportModel: TestReport = {
      pass: false,
      message,
    };

    const toReturn = new ToReturn(cordeClient, "ping", false);
    const report = await toReturn.action(undefined);
    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should fail due to no message was sent by the bot", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const message = buildReportMessage(
      `expected: testing bot to send a message\n`,
      `received: no message was sent`,
    );

    const reportModel: TestReport = {
      pass: false,
      message,
    };

    const toReturn = new ToReturn(cordeClient, "ping", false);
    const report = await toReturn.action("pong");
    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to timeout but isNot = true", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

    const reportModel: TestReport = {
      pass: true,
    };

    const toReturn = new ToReturn(cordeClient, "ping", true);
    const report = await toReturn.action("pong");
    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to bot returned equal message", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());
    cordeClient.awaitMessagesFromTestingBot = jest.fn().mockReturnValue(mockDiscord.message);
    const reportModel: TestReport = {
      pass: true,
    };

    const toReturn = new ToReturn(cordeClient, "ping", false);
    const report = await toReturn.action(mockDiscord.message.content);

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to bot returned equal messages (string type)", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());
    cordeClient.awaitMessagesFromTestingBot = jest.fn().mockReturnValue(mockDiscord.message);
    const reportModel: TestReport = {
      pass: true,
    };

    const toReturn = new ToReturn(cordeClient, "ping", false);
    const report = await toReturn.action(mockDiscord.message.content);

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to bot returned equal messages (string number)", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());
    mockDiscord.message.content = "2";
    cordeClient.awaitMessagesFromTestingBot = jest.fn().mockReturnValue(mockDiscord.message);
    const reportModel: TestReport = {
      pass: true,
    };

    const toReturn = new ToReturn(cordeClient, "ping", false);
    const report = await toReturn.action(2);

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to bot returned equal messages (type embed)", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());
    cordeClient.awaitMessagesFromTestingBot = jest.fn().mockReturnValue(mockDiscord.messageEmbed);
    const reportModel: TestReport = {
      pass: true,
    };

    const toReturn = new ToReturn(cordeClient, "ping", false);
    const report = await toReturn.action(mockDiscord.messageEmbedLike);

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get success test due to bot returned different messages (isNot true)", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());
    cordeClient.awaitMessagesFromTestingBot = jest.fn().mockReturnValue(mockDiscord.message);
    const reportModel: TestReport = {
      pass: true,
    };

    const toReturn = new ToReturn(cordeClient, "ping", true);
    const report = await toReturn.action(mockDiscord.messageEmbedLike);

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  it("should get fail test due to bot returned different messages (both embed)", async () => {
    runtime.setConfigs({ timeOut: 100 }, true);
    const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());
    cordeClient.awaitMessagesFromTestingBot = jest
      .fn()
      .mockReturnValue(mockDiscord.message.embeds.push(mockDiscord.messageEmbed));
    const reportModel: TestReport = {
      pass: false,
    };

    const toReturn = new ToReturn(cordeClient, "ping", false);
    const report = await toReturn.action({
      author: "Test",
      fields: mockDiscord.messageEmbedLike.fields,
    });

    expect(report).toEqual(reportModel);
    expect(report).toMatchSnapshot();
  });

  // it("should return a passed test with a string message as content", async () => {
  //   const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

  //   const reportModel: TestReport = {
  //     pass: true,
  //   };

  //   cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
  //   cordeClient.awaitMessagesFromTestingBot = jest
  //     .fn()
  //     .mockReturnValue(Promise.resolve(mockDiscord.messageCollection.array()[1]));

  //   const toReturn = new ToReturn(cordeClient, "ping", false);
  //   const report = await toReturn.action("pong");
  //   expect(report).toEqual(reportModel);
  // });

  // it("should return a failed test due to timeout with isNot = false", async () => {
  //   const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

  //   const timeout = new TimeoutError();
  //   const reportModel: TestReport = {
  //     pass: false,
  //   };

  //   jest.spyOn(cordeClient, "awaitMessagesFromTestingBot").mockImplementation(() => {
  //     throw new TimeoutError();
  //   });

  //   const toReturn = new ToReturn(cordeClient, "ping", false);
  //   const report = await toReturn.action("pong");
  //   expect(report).toEqual(reportModel);
  // });

  // it("should return a failed test due to a not known error with isNot = true", async () => {
  //   const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

  //   const unknownError = "unknown";
  //   const isNot = true;
  //   const reportModel: TestReport = {
  //     pass: false,
  //   };

  //   cordeClient.sendTextMessage = jest.fn().mockImplementation(() => {
  //     throw new Error(unknownError);
  //   });

  //   cordeClient.awaitMessagesFromTestingBot = jest
  //     .fn()
  //     .mockReturnValue(mockDiscord.messageCollection.array()[1]);

  //   const toReturn = new ToReturn(cordeClient, "ping", isNot);
  //   const report = await toReturn.action("pong");
  //   expect(report).toEqual(reportModel);
  // });

  // it("should return failed test with a string message as content and isNot = true", async () => {
  //   const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

  //   const isNot = true;
  //   const reportModel: TestReport = {
  //     pass: true,
  //   };

  //   cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
  //   jest
  //     .spyOn(cordeClient, "awaitMessagesFromTestingBot")
  //     .mockReturnValue(Promise.resolve(mockDiscord.messageCollection.array()[1]));

  //   const toReturn = new ToReturn(cordeClient, "ping", isNot);
  //   const report = await toReturn.action("pong");
  //   expect(report).toEqual(reportModel);
  // });

  // it("should return a failed test with a string message as content and isNot = true", async () => {
  //   const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

  //   const isNot = true;
  //   const reportModel: TestReport = {
  //     pass: false,
  //   };

  //   cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
  //   jest
  //     .spyOn(cordeClient, "awaitMessagesFromTestingBot")
  //     .mockReturnValue(Promise.resolve(mockDiscord.messageCollection.array()[0]));

  //   const toReturn = new ToReturn(cordeClient, "ping", isNot);
  //   const report = await toReturn.action("pong");
  //   expect(report).toEqual(reportModel);
  // });

  // it("should return a failed test with a string message as content", async () => {
  //   const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

  //   const reportModel: TestReport = {
  //     pass: false,
  //   };

  //   cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);

  //   jest
  //     .spyOn(cordeClient, "awaitMessagesFromTestingBot")
  //     .mockReturnValue(Promise.resolve(mockDiscord.messageCollection.array()[0]));

  //   const toReturn = new ToReturn(cordeClient, "ping", false);
  //   const report = await toReturn.action("pong");
  //   expect(report).toEqual(reportModel);
  // });

  // it("should return a passed test with embed message as content", async () => {
  //   const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

  //   const reportModel: TestReport = {
  //     pass: true,
  //   };

  //   cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
  //   mockDiscord.message.embeds.push(mockDiscord.messageEmbed);
  //   cordeClient.awaitMessagesFromTestingBot = jest.fn().mockReturnValue(mockDiscord.message);

  //   const toReturn = new ToReturn(cordeClient, "ping", false);
  //   const report = await toReturn.action("pong");
  //   expect(report).toEqual(reportModel);
  // });

  // it("should return a failed test with embed message as content", async () => {
  //   const cordeClient = createCordeBotWithMockedFunctions(mockDiscord, new Client());

  //   const reportModel: TestReport = {
  //     pass: false,
  //   };

  //   cordeClient.sendTextMessage = jest.fn().mockReturnValue(mockDiscord.message);
  //   mockDiscord.message.embeds.push(mockDiscord.get(mockDiscord.messageEmbedCollection, 1));
  //   cordeClient.awaitMessagesFromTestingBot = jest.fn().mockReturnValue(mockDiscord.message);

  //   const toReturn = new ToReturn(cordeClient, "ping", false);
  //   const report = await toReturn.action("pong");
  //   expect(report).toEqual(reportModel);
  // });
});
