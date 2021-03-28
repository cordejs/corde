/**
 * File used for manual tests
 */

import { bot } from "./bot.js";
import * as config from "./corde.config.mjs";

bot
  .login(config.botTestToken)
  .then(() => {
    console.log("Bot connected");
  })
  .catch((error) => {
    console.log("fail in bot connection");
    if (error) {
      console.log(error);
    }
  });
