/**
 * Output in process console a messsage of *success* for a command test
 * @param testName case test name
 * @param expect what is expected to the bot answer
 * @param output what bot really answered
 * @description Ins case of **testName** be empty, no line is created in console.
 */
export function printSucess(testName: string, expect: string | number | boolean, output: string) {
    const response = `expected: '${expect}', output: '${output}'`;
    if (testName && testName.trim() !== "") {
        console.log(`${testName}: \n${response}`);
    } else {
        console.log(response);
    }
}

/**
 * Output in process console a messsage of *error* for a command test
 * @param testName case test name
 * @param expect what is expected to the bot answer
 * @param output what bot really answered
 * @description Ins case of **testName** be empty, no line is created in console.
 */
export function printFail(testName: string, expect: string | number | boolean, output: string) {
    const response = `expected: '${expect}', output: '${output}'`;
    if (testName && testName.trim() !== "") {
        console.log(`${testName} Fail: \n${response}`);
    } else {
        console.log(response);
    }
}