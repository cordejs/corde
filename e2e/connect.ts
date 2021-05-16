// File used to manually connect e2e bot to server.
// Offen for debug purpose

import { bot } from "./bot";
import { botToken } from "./corde.config";

bot
  .login(botToken)
  .then(() => {
    console.log("connected!");
  })
  .catch((error) => {
    console.log("fail in bot connection");
    console.log(error);
  });
