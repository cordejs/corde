/**
 * Contains the definition for all generic errors messages and names
 * used in Corde.
 */
export const Errors = {
  CONFIG_ERROR: "ConfigError",
  CONFIG_ERROR_MESSAGE: "Invalid configuration",

  TIMEOUT_ERROR: "TimeoutError",
  TIMEOUT_ERROR_MESSAGE: "Timeout has occurred",

  QUEUE_FUNCTION_ERROR: "QueueFunctionError",
  QUEUE_FUNCTION_ERROR_MESSAGE: "A error occurred when executing a queued function",

  CORDE_CLIENT_ERROR: "CordeClientError",
  CORDE_CLIENT_ERROR_MESSAGE: "There is a problem with corde client",

  DISCORD_ERROR: "DiscordError",
  DISCORD_ERROR_MESSAGE: "Some Discord operation failed",

  FILE_ERROR: "FileError",
  FILE_ERROR_MESSAGE: "There is a problem when processing the file",

  PROPERTY_ERROR: "PropertyError",
  PROPERTY_ERROR_MESSAGE: "Required property not found",

  TYPE_ERROR: "TypeError",
  TYPE_ERROR_MESSAGE: "A error was found related to type",
};
