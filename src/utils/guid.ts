import * as uuid from "uuid";
class GuidManager {
  public new() {
    return uuid.v4();
  }

  public validate(guid: string) {
    return uuid.validate(guid);
  }

  public parse(guid: string) {
    return uuid.parse(guid);
  }
}

export const Guid = new GuidManager();
