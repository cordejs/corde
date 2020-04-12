/**
 * Throws when a parameter of any type isn't found
 * @constructor Erro message, if not set, returns default message
 * @default message Parameter not found
 */
export declare class ParameterNotFoundError extends Error {
  constructor(message?: string);
}
