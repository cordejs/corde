// Cannot be `import` as it's not under TS root dir

function getPackage() {
  if (process.env.NODE_ENV === "TEST") {
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
