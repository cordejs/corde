// Cannot be `import` as it's not under TS root dir

import { logger } from "./core/Logger";
import runtime from "./core/runtime";

type PackageJson = typeof import("../package.json");

function getPackage(): PackageJson {
  try {
    if (runtime.isUnityTest || runtime.isLocal || process.env.JEST_WORKER_ID) {
      return require("../package.json");
    }
    return require("../../package.json");
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

const { version: VERSION, description: DESCRIPTION } = getPackage();

/**
 * Corde's package.json data
 */
class Package {
  /**
   * Package.json version
   */
  get version(): string {
    return VERSION;
  }

  /**
   * Package.json description
   */
  get description(): string {
    return DESCRIPTION;
  }
}

export const pack = new Package();
