import { bot } from "./bot";
import * as config from "./corde.config";

export = () => {
  console.log("CHAMOU");
  bot.login(config.botTestToken);
};
