#!/usr/bin/env node

import chalk from "chalk";
import clear from "clear";
import program from "commander";
import figlet from "figlet";
import { loadData } from "./init";
import pack from "../package.json";
clear();

console.log(
  chalk.red(
    figlet.textSync("Concord", { horizontalLayout: "full" }),
  ),
);

program
	.version(pack.version)
  .description("Discord bot testing framework")
  .option("-r, --run", "run tests")
	.parse(process.argv);

if (program.run) {
  loadData();
}

if (!process.argv.slice(2).length) {
	program.outputHelp();
}
