/**
 * Throws when a requried property was not informed
 */
export class MissingPropertyError extends Error {
  constructor(message?: string) {
    if (message) {
      super(message);
    } else {
      super("Required property not found");
      this.name = "PropertyMissingError";
    }
  }
}
