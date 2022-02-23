/**
 * Can not figure out how to spy prettyFormat.
 * So I'm just checking if a simple format is ok.
 */

import { formatObject } from "../../src/utils/formatObject";

describe("testing diff function", () => {
  test("should call jest-diff", () => {
    const objFormatted = formatObject({ prop1: "12312", prop2: 1312412 });
    expect(objFormatted).toEqual('Object {\n  "prop1": "12312",\n  "prop2": 1312412,\n}');
  });
});
