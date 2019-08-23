
import MissingTestNameError from "../erros/missingTestNameErro";
import runTest from "./run";

/**
 * Initialize a new test to be executed
 * @param name name of the test (required)
 */
export default function test(name: string): runTest {
  if (name && name.trim() !== "") {
    return new runTest(name);
  } else {
      throw new MissingTestNameError();
  }
}
