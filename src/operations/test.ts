
import MissingTestNameError from "../erros/missingTestNameErro";
import runTest from "./run";
import { loadData } from "../init";

/**
 * Initialize a new test to be executed
 * @param name name of the test (required)
 */
export default async function test(name: string): Promise<runTest> {
  if (name && name.trim() !== "") {
    await loadData();
    return new runTest(name);
  } else {
      throw new MissingTestNameError();
  }
}
