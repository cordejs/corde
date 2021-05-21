/**
 * File used in e2e tests with jest.
 */

import { login } from "./bot";

export = async () => {
  await login();
};
