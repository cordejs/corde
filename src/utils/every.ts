/**
 * @internal
 */
export function every<TArray extends Array<any>>(
  array: TArray,
  truthTest: (val: TArray[0]) => boolean,
) {
  for (let i = 0, len = array.length; i < len; i++) {
    if (!truthTest(array[i])) {
      return false;
    }
  }
  return true;
}
