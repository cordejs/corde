import fs from "fs";
import path from "path";
import * as tsNode from "ts-node";
/**
 * @internal
 * Register `ts-node` to support typescript written tests.
 * @param projectPath Path for tsconfig.json. If it is not provided,
 * is tryed to get the file from root.
 */
export default function registerTsNode(projectPath?: string) {
  if (!projectPath) {
    projectPath = path.resolve(process.cwd(), "tsconfig.json");
    if (!fs.existsSync(projectPath)) {
      throw new Error(`\nCorde could not find typecript configuration in path ${projectPath}\n`);
    }
  }

  tsNode.register({
    project: projectPath,
    transpileOnly: true,
  });
}
