/**
 * Throws when fail in parse a file.
 *
 * @example
 * {
 *   // "cordeTestToken": "ASFSaxcSDFAWSEGASDG",
 *   "botTestId": "12312141241234124",
 * }
 *
 */
export class FileParserError extends Error {
  constructor(message?: string) {
    if (message) {
      super(message);
    } else {
      super("Failed in parse a file");
      this.name = "ERR_CORDE_PARSE_FILE";
    }
  }
}
