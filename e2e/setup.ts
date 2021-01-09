import { bot } from "./bot";
import * as config from "./corde.config";

export = () => {
  bot.login(config.botTestToken);
};
