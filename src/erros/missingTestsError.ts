/**
 * Throw a erro when no test are informed
 *
 * @public
 * @constructor Erro message, if not set, returns default message
 */
export default class MissingTestsErro extends Error {
  constructor(message?: string) {
    if (message) {
      super(message);
    } else {
      super("There is no tests to be executed");
      this.name = "ERR_ENGAGE_MISSING_TESTS";
    }
  }
}
