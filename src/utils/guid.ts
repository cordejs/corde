import * as uuid from "uuid";

/**
 * @internal
 */
class GuidManager {
  new() {
    return uuid.v4();
  }

  validate(guid: string) {
    return uuid.validate(guid);
  }

  parse(guid: string) {
    return uuid.parse(guid);
  }
}

export const Guid = new GuidManager();
