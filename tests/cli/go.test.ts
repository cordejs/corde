import reader from "../../src/core/reader";
import * as validateFn from "../../src/cli/validate";
import { go } from "../../src/cli/go";
import { FileError } from "../../src/errors";

describe("testing go command", () => {
  it("should throw exception due to no files", async () => {
    const readerSpy = jest.spyOn(reader, "loadConfig");
    readerSpy.mockReturnValue({
      botPrefix: "!",
      botTestId: "123123123",
      channelId: "123123123",
      cordeTestToken: "12312112312",
      guildId: "12312312",
      testFiles: [],
      botTestToken: "123123",
      timeOut: 1000,
    });

    const validateSpy = jest.spyOn(validateFn, "validate");
    validateSpy.mockImplementation(() => null);

    try {
      await go();
    } catch (error) {
      expect(error instanceof FileError).toBeTruthy();
    }
  });
});
