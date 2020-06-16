/**
 * Throws when test files are not found
 */
export class FilesNotFoundError extends Error {
  constructor(message?: string) {
    if (message) {
      super(message);
    } else {
      super('Files not Informed');
    }
    this.name = 'ERR_CORDE_FILES_MISSING';
  }
}
