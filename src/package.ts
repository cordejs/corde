// Cannot be `import` as it's not under TS root dir

import runtime from "./core/runtime";

type PackageJson = typeof import("../package.json");

function getPackage(): PackageJson {
  if (runtime.isUnityTest) {
    return require("../package.json");
  }
  return require("../../package.json");
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

const pack = new Package();
export default pack;
