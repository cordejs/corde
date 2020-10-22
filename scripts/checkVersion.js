const jsonPack = require("../package.json");
const semver = require("semver");
const chalk = require("chalk");

console.log(`${chalk.blue("info")} checking version...`);
if (!semver.valid(jsonPack.version)) {
  console.log(
    `${chalk.red("fail")}: ${jsonPack.version} is an invalid version. Please set a valid one`,
  );
  process.exit(1);
}
console.log(`${chalk.green("success")} valid version detected...`);
