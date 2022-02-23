import { Timer } from "../../src/utils/Timer";

export function mockTimer() {
  jest.mock("../../src/utils/timer");
  Timer.prototype.start = jest.fn();
  Timer.prototype.stop = jest.fn().mockReturnValue(["10ms", 10]);
}
