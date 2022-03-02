/* eslint-disable no-console */
/**
 * File used for manual tests
 */

import { login } from "./@bot";

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
