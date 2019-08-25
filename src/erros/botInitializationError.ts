/**
 * Throws when engage starts but no config file is found
 *
 * @public
 * @constructor Erro message, if not set, returns default message
 */
export default class BotInitializationError extends Error {
  constructor(message?: string) {
    if (message) {
      super(message);
    } else {
      super("Fail in the attempt of login to bot");
      this.name = "ERR_trybot_LOGIN_FAIL";
    }
  }
}
