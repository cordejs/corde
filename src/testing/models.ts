/**
 * Represents **command** structure
 */
export interface AssertionProps {
  commandName: string;
  expectation: string;
}

/**
 * Represents **test** structure
 */
export interface Test {
  name?: string;
  subTest?: Test;
  assertions: AssertionProps[];
}

/**
 * Represents **group** structure
 */

export interface Group {
  name?: string;
  subGroup?: Group;
  tests: Test[];
}
