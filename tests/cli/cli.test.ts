import util from "util";
import { exec as childExec } from "child_process";
import * as pack from "../../package.json";
import * as initFunc from "../../src/cli/init";
import path from "path";

const exec = util.promisify(childExec);

const pathBase = path.resolve(process.cwd(), "src/cli/cli.ts");
const commandBase = `node ${pathBase}`;

import { program } from "../../src/cli/cli";

import { Command } from "commander";

describe("testing cli", () => {
  it("should get version", () => {
    const spy = jest.spyOn(console, "log");
    program.parse(["node", "test", "--version"]);
    expect(spy).toHaveBeenCalled();
  });
});
