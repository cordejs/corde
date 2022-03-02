/**
 * @internal
 * Register `ts-node` to support typescript written tests.
 * @param projectPath Path for tsconfig.json. If it is not provided,
 * is tyred to get the file from root.
 */
export function registerTsNode(configs: Pick<corde.IConfigOptions, "project">) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const tsNode = require("ts-node") as typeof import("ts-node");
    tsNode.register({
      project: configs.project,
      transpileOnly: true,
      pretty: true,
    });
  } catch (error) {
    //
  }
}
