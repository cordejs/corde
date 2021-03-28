import { LogUpdate } from "../../src/utils";

let logUpdate!: LogUpdate;

beforeEach(() => {
  logUpdate = new LogUpdate();
});

describe("testing logUpdate", () => {
  it("should append text and add to stdout", () => {
    logUpdate.append("text");
    logUpdate.persist();
    expect(logUpdate.stdout).toEqual("text");
  });

  it("should append line text and add to stdout", () => {
    logUpdate.appendLine("text");
    logUpdate.persist();
    expect(logUpdate.stdout).toEqual("\ntext");
  });

  it("should update a appended value", () => {
    logUpdate.append("text");
    logUpdate.update(0, "text1");
    logUpdate.persist();
    expect(logUpdate.stdout).toEqual("text1");
  });

  it("should update a appended value to be a line", () => {
    logUpdate.append("text");
    logUpdate.updateLine(0, "text1");
    logUpdate.persist();
    expect(logUpdate.stdout).toEqual("\ntext1");
  });

  it("should not update line", () => {
    logUpdate.append("text");
    logUpdate.update(5, "text1");
    logUpdate.persist();
    expect(logUpdate.stdout).toEqual("text");
  });

  it("should update line after append another", () => {
    logUpdate.append("text");
    logUpdate.appendLine("text1");
    logUpdate.update(0, "t");
    logUpdate.persist();
    expect(logUpdate.stdout).toEqual("t\ntext1");
  });

  it("persist should clear array and append value to stdout", () => {
    logUpdate.append("text");
    logUpdate.persist();
    expect(logUpdate.stdout).toEqual("text");

    logUpdate.append(" text");
    logUpdate.persist();
    expect(logUpdate.stdout).toEqual("text text");
  });
});
