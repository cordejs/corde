import { Stopwatch } from "../../src/utils/Stopwatch";

export function mockTimer() {
  jest.mock("../../src/utils/Stopwatch");
  Stopwatch.prototype.start = jest.fn();
  Stopwatch.prototype.stop = jest.fn().mockReturnValue(["10ms", 10]);
}
