/**
 * Throws when a parameter of any type isn't found
 */
export class ParameterNotFoundError extends Error {
  constructor(message?: string) {
    if (message) {
      super(message);
    } else {
      super("Parameter not found");
    }
    this.name = "ParameterNotFoundError";
  }
}
