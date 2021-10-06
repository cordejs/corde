import { TestCollector, testCollector } from "../../src/core/TestCollector";

let _testCollector: TestCollector;
describe("testing testCollector", () => {
  beforeEach(() => {
    _testCollector = new TestCollector();
  });

  it("should add a test file", () => {
    const testFile = _testCollector.createTestFile("path");
    expect(testFile).toEqual(_testCollector.currentTestFile);
    expect(testFile.path).toEqual("path");
  });

  it("should clear all testFiles", () => {
    _testCollector.createTestFile("path");
    expect(_testCollector.testFiles).toHaveLength(1);
    _testCollector.clearTestFiles();
    expect(_testCollector.testFiles).toHaveLength(0);
  });

  it("should add group closure", async () => {
    let a = 1;
    _testCollector.addToGroupClousure(() => {
      a = 2;
    });

    await _testCollector.executeGroupClojure();
    expect(a).toEqual(2);
  });
});
