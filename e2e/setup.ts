/**
 * File used in e2e tests with jest.
 */

import { bot } from "./bot";
import * as config from "./corde.config";

export = async () => {
  await bot.login(config.botTestToken);
};
