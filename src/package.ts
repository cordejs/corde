// Cannot be `import` as it's not under TS root dir
const { version: VERSION, description: DESCRIPTION } = require(process.env.ENV === "TEST"
  ? "../package.json"
  : "../../package.json");

/**
 * Corde's package.json data
 */
class Package {
  /**
   * Package.json version
   */
  public get version() {
    return VERSION;
  }

  /**
   * Package.json description
   */
  public get description() {
    return DESCRIPTION;
  }
}

const pack = new Package();
export default pack;
