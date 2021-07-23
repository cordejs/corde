import * as tsNode from "ts-node";
import { IConfigOptions } from "../types";
/**
 * @internal
 * Register `ts-node` to support typescript written tests.
 * @param projectPath Path for tsconfig.json. If it is not provided,
 * is tryed to get the file from root.
 */
export default function registerTsNode(configs: Pick<IConfigOptions, "project">) {
  tsNode.register({
    project: configs.project,
    transpileOnly: true,
    pretty: true,
  });
}
