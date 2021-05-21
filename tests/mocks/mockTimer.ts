import { Timer } from "../../src/utils/timer";

export function mockTimer() {
  jest.mock("../../src/utils/timer");
  Timer.prototype.start = jest.fn();
  Timer.prototype.stop = jest.fn().mockReturnValue(["10ms", 10]);
}
