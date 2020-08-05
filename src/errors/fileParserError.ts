import { FileError } from "./fileError";
import { Errors, ErrorsMessages } from "../consts";

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
export class FileParserError extends FileError {
  constructor(fileName: string) {
    super(ErrorsMessages.FILE_PARSER_ERROR(fileName));
    this.name = Errors.FILE_PARSER_ERROR;
  }
}
