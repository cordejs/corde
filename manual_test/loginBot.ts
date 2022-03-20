/* eslint-disable no-console */
import { login } from "./src/bot";

login()
  .then(() => console.log("running!"))
  .catch((err) => console.error(err));
