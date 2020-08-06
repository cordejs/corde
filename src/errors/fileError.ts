import { Errors, ErrorsMessages } from "../consts";

export class FileError extends Error {
  constructor(message = ErrorsMessages.FILE_ERROR) {
    super(message);
    this.name = Errors.FILE_ERROR;
  }
}
