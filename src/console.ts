import chalk from "chalk";

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
        console.log(`${green(testName)}: \n ${bgGreen("OK:")} ${response}`);
    } else {
        console.log(`${bgGreen("OK:")} ${response}`);
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
        console.log(`${red(testName)}: \n ${bgRed("Fail")} ${red(response)}`);
    } else {
        console.log(`${bgRed("Fail")} ${red(response)}`);
    }
}

function green(text: string, bold?: boolean) {
    if (bold) {
        text = chalk.bold(text);
    }
    return chalk.green(text);
}

function bgGreen(text: string, bold?: boolean) {
    if (bold) {
        text = chalk.bold(text);
    }
    return chalk.bgGreen(text);
}


function red(text: string, bold?: boolean) {
    if (bold) {
        text = chalk.bold(text);
    }
    return chalk.red(text);
}

function bgRed(text: string, bold?: boolean) {
    if (bold) {
        text = chalk.bold(text);
    }
    return chalk.bgRed(text);
}