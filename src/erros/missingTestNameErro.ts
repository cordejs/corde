/**
 * Throw a erro when a test title is not setted
 *
 * @public
 * @constructor Erro message, if not set, returns default message
 */
export default class MissingTestNameError extends Error {
    constructor(message?: string) {
        if (message) {
            super(message)
        } else {
            super("Test name not defined")
            this.name = "ERR_ENGAGE_MISSING_TEST_NAME"
        }
    }
}