export const DEFAULT_TEST_TIMEOUT = 5000;
export const DEFAULT_SPACE_VALUE = 4;

/**
 * Contains the definition for all Errors names used in Corde.
 */
export const Errors = {
  CHANNEL_TYPE_NOT_SUPPORTED_ERROR: "ChannelTypeNotSupportedError",
  FILE_NOT_FOUND_ERROR: "FileError",
  CORDE_CLIENT_ERROR: "CordeClientError",
  FILE_ERROR: "FileError",
  FILE_PARSER_ERROR: "ParseFileError",
};

/**
 * Contains the definition for all Errors messages and errors messages build functions
 * used in Corde.
 */
export const ErrorsMessages = {
  CHANNEL_TYPE_NOT_SUPPORTED_ERROR: "The informed channel type is not supported",
  FILE_NOT_FOUND_ERROR: (fileName: string) => `The file ${fileName} was not found`,
  CORDE_CLIENT_ERROR: "There is a problem with corde client",
  FILE_ERROR: "There is a problem when processing the file",
  FILE_PARSER_ERROR: (fileName: string) => `Failed in parse the file ${fileName}`,
};
