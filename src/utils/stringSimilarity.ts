import { sortAscending } from "./sortAscending";

// TODO: This is a function for commands checks and suggestions not implemented in version 5.0.0

/**
 * Verify the similarity of an word with an array of other values,
 * returning the one with best similarity.
 *
 * @example
 *
 * getBestMatch("code", ["corde", "init", "config"]); // Returns "corde"
 *
 * // To get best match with 50% or more of similarity:
 * getBestMatch("code", ["corde", "init", "config"], 50); // Returns "corde"
 *
 * @see https://en.wikipedia.org/wiki/Levenshtein_distance
 *
 * @param value Value to be compared
 * @param possibilities Options to match `value`
 * @param minimumPercentile Minimum value of similarity that all words must have
 * @returns Most compatible word
 */
export function getBestMatch(value: string, possibilities: string[], minimumPercentile?: number) {
  const values = sortAscending(
    (possibilities as string[]).map((v) => {
      return {
        key: v,
        compatibility: similarity(value, v) * 100,
      };
    }),
    "compatibility",
  );
  if (minimumPercentile) {
    return values.filter((v) => v.compatibility >= minimumPercentile)[0].key;
  }
  return values[0].key;
}

function similarity(s1: string, s2: string) {
  let longer = s1;
  let shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  const longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / longerLength;
}

function editDistance(s1: string, s2: string) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  const costs = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i == 0) costs[j] = j;
      else {
        if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}
