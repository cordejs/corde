import { utils } from "../../src/utils";
import path from "path";

describe("testing tryImport", () => {
  it("should import file", () => {
    const file = utils.tryImport(path.resolve(process.cwd(), "./tests/mocks/constsNames.ts"));
    expect(file).toBeTruthy();
  });

  it("should fail in file import", () => {
    const file = utils.tryImport("../mocks/constssNames.ts");
    expect(file).toBeFalsy();
  });
});
