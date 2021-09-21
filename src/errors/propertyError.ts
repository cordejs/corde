import { InternalError } from ".";
import { Errors } from "./defaults";

/**
 * Throws when a requried property was not informed
 */
export class PropertyError extends InternalError {
  constructor(message = Errors.PROPERTY_ERROR_MESSAGE) {
    super(message);
    this.name = Errors.PROPERTY_ERROR;
  }
}
