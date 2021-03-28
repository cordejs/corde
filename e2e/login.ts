/**
 * File used for manual tests
 */

import { login } from "./bot";
import * as config from "./corde.config";

login(true)
  .then(() => {
    console.log("Bot connected");
  })
  .catch((error) => {
    console.log("fail in bot connection");
    if (error) {
      console.log(error);
    }
  });
