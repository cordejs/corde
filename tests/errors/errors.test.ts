import { ChannelTypeNotSupportedError } from "../../src/errors";
import { Errors, ErrorsMessages } from "../../src/consts";

describe("testing errors types", () => {
  it("ChannelTypeNotSupportedError should match deserved structure", () => {
    const error = new ChannelTypeNotSupportedError();
    expect(error.name).toBe(Errors.CHANNEL_TYPE_NOT_SUPPORTED_ERROR);
    expect(error.message).toBe(ErrorsMessages.CHANNEL_TYPE_NOT_SUPPORTED_ERROR);
  });

  it("configFileNotFoundError should match deserved structure", () => {
    const error = new ChannelTypeNotSupportedError();
    expect(error.name).toBe("ChannelTypeNotSupportedError");
    expect(error.message).toBe("The informed channel type is not supported");
  });
});
