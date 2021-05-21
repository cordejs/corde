/**
 * Creates a promise that finish after a defined time in milliseconds
 * @param timeMilliseconds Time to the promise wait.
 * @internal
 */
export function wait(timeMilliseconds: number) {
  return new Promise<void>((resolve, reject) => {
    if (!timeMilliseconds) {
      return reject(new Error("Invalid value"));
    }

    if (timeMilliseconds < 0) {
      return reject(new Error("Time can not be lower than 0"));
    }

    setTimeout(() => {
      resolve();
    }, timeMilliseconds);
  });
}
