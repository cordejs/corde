import { runtime } from "../common";

const MILISECONDS_PER_SECOND = 1000;

/**
 * Calculate the difference between two dates based in a milisecond / second format.
 * Retuns a formated value and the plain difference of Dates in miliseconds.
 * @example
 *
 * // example of outputs
 *
 * [100ms, 100]
 * [1s, 1000]
 * [1.01s, 1010]
 * [2.1s, 2100]
 * [2.13s, 2130]
 * [4.124s, 4124]
 * [124.332s, 124332]
 *
 * @param date1 First date to compare.
 * @param date2 Second date to compare
 *
 * @returns **null** if `date1` or `date2` is null or undefined.
 * @internal
 */
export function dateDiff(date1: Date, date2: Date): [string, number] {
  // I should mock this function in e2e environment, BUT
  // I tried without success, so let's do this "gambiarra" (god forgive me).
  // P.S: this was necessary because the time that each test needs to be executed is volatile,
  // And in e2e environment, I make a snapshot of each test. So, this volatile data can not
  // be present in the snapshot.

  if (runtime.environment.isE2eTest) {
    return ["100ms", 100];
  }

  if (!date1 || !date2 || !(date1 instanceof Date) || !(date2 instanceof Date)) {
    return null;
  }

  const difference = date1.getTime() - date2.getTime();

  if (difference === 0) {
    return ["", 0];
  }

  if (difference < MILISECONDS_PER_SECOND) {
    return [`${difference}ms`, difference];
  }

  if (difference % 10 === 0) {
    return [`${difference / MILISECONDS_PER_SECOND}s`, difference];
  }

  const formatedValue = difference.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
  return [`${formatedValue}s`, difference];
}
