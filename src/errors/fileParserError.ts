/**
 * Throws when fail in parse a file.
 *
 * @example
 * {
 *   // "cordeTestToken": "NjA4MDMzOTY2OTI2MjAwODMy.Xp4fEw.jsXgv5fC8t77PjLiZ4_CYHmybI4",
 *   "botTestId": "510886696062287894",
 * }
 *
 * @constructor Erro message, if not set, returns default message.
 * @default message Config file not found.
 */
export class FileParserError extends Error {
  constructor(message?: string) {
    if (message) {
      super(message);
    } else {
      super('Failed in parse a file');
      this.name = 'ERR_CORDE_PARSE_FILE';
    }
  }
}
