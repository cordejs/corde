import { DEFAULT_CONFIG } from "../../const";
import { debug } from "../../core/debug";
import { reader } from "../../core/Reader";
import runtime from "../../core/runtime";
import { registerTsNode } from "../../core/tsRegister";

export function loadConfigs(options: corde.Config.ICLIOptions) {
  if (options.config) {
    runtime.configFilePath = options.config;
  }

  // Register ts-node with default options to prevent errors
  // when registering from configs.
  registerTsNode(DEFAULT_CONFIG.project as any);

  debug("runtime.project: ", runtime.configs.project);
  debug("runtime.configFilePath: " + runtime.configFilePath);

  const configs = reader.loadConfig();
  runtime.setConfigs(configs, true);

  // Configs provide in CLI overrides configs in config file
  if (options.files) {
    runtime.setConfigs({ testMatches: options.files.split(" ") }, true);
  }

  if (runtime.configs.project) {
    registerTsNode(runtime.configs);
  }

  debug("loaded configs: ", runtime.configs.getProps());
  return runtime.configs;
}
