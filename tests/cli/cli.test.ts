import util from "util";
import { exec as childExec } from "child_process";
import * as pack from "../../package.json";
import * as initFunc from "../../src/cli/init";
import path from "path";

const exec = util.promisify(childExec);

const pathBase = path.resolve(process.cwd(), "bin/corde");
const commandBase = `node ${pathBase}`;

describe("testing cli", () => {
  it("should get version", async (done) => {
    try {
      const { stdout } = await exec(`${commandBase} -v`, { cwd: "." });
      expect(stdout).toMatch(`v${pack.version}`);
      done();
    } catch (error) {
      fail();
    }
  });

  // it("should call init command", async () => {
  //   const spy = jest.spyOn(initFunc, "init");
  //   await exec(`${commandBase} init`, { cwd: "." });
  //   expect(spy).toBeCalledTimes(1);
  // });
});
