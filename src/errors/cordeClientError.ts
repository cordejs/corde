/**
 * Throws when a operation fail on CordeClient
 */
export class CordeClientError extends Error {
  constructor(message?: string) {
    if (message) {
      super(message);
    } else {
      super("There is a problem with cord client");
    }
    this.name = "CordeClientError";
  }
}
