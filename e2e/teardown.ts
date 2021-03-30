/**
 * File used in e2e tests with jest.
 */

import { bot } from "./bot";

export = () => {
  bot.destroy();
};
