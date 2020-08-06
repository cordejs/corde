import { Errors, ErrorsMessages } from "../consts";
import { FileError } from "./fileError";

/**
 * Represents a error related to operation of searching of Files
 */
export class FileNotFoundError extends FileError {
  constructor(fileName: string) {
    super(ErrorsMessages.FILE_NOT_FOUND_ERROR(fileName));
    this.name = Errors.FILE_NOT_FOUND_ERROR;
  }
}
