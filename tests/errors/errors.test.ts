import {
  ConfigError,
  CordeClientError,
  DiscordError,
  FileError,
  PropertyError,
  TypeError,
  TimeoutError,
  QueueFunctionError,
} from "../../src/errors";
import { Errors } from "../../src/errors/defaults";

describe("testing errors types", () => {
  it("ConfigError should match expected structure", () => {
    const error = new ConfigError();
    expect(error.name).toBe(Errors.CONFIG_ERROR);
    expect(error.message).toBe(Errors.CONFIG_ERROR_MESSAGE);
  });

  it("CordeClientError should match expected structure", () => {
    const error = new CordeClientError();
    expect(error.name).toBe(Errors.CORDE_CLIENT_ERROR);
    expect(error.message).toBe(Errors.CORDE_CLIENT_ERROR_MESSAGE);
  });

  it("DiscordError should match expected structure", () => {
    const error = new DiscordError();
    expect(error.name).toBe(Errors.DISCORD_ERROR);
    expect(error.message).toBe(Errors.DISCORD_ERROR_MESSAGE);
  });

  it("FileError should match expected structure", () => {
    const error = new FileError();
    expect(error.name).toBe(Errors.FILE_ERROR);
    expect(error.message).toBe(Errors.FILE_ERROR_MESSAGE);
  });

  it("PropertyError should match expected structure", () => {
    const error = new PropertyError();
    expect(error.name).toBe(Errors.PROPERTY_ERROR);
    expect(error.message).toBe(Errors.PROPERTY_ERROR_MESSAGE);
  });

  it("TypeError should match expected structure", () => {
    const error = new TypeError();
    expect(error.name).toBe(Errors.TYPE_ERROR);
    expect(error.message).toBe(Errors.TYPE_ERROR_MESSAGE);
  });

  it("Timeout should match expected structure", () => {
    const error = new TimeoutError();
    expect(error.name).toBe(Errors.TIMEOUT_ERROR);
    expect(error.message).toBe(Errors.TIMEOUT_ERROR_MESSAGE);
  });

  it("QueueError should match expected structure", () => {
    const error = new QueueFunctionError();
    expect(error.name).toBe(Errors.QUEUE_FUNCTION_ERROR);
    expect(error.message).toBe(Errors.QUEUE_FUNCTION_ERROR_MESSAGE);
  });
});
