
import MissingTestNameError from "../erros/missingTestNameErro";
import runTest from "./run";
import { loadTestFiles, login } from "../init";
import { logout } from "../bot";
/**
 * Initialize a new test to be executed
 * @param name name of the test (required)
 */
export default async function test(name: string): Promise<runTest> {
  if (name && name.trim() !== "") {
    await login();
    return new runTest(name);
  } else {
    logout();
    throw new MissingTestNameError();
  }
}
