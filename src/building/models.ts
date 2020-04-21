/**
 * Represents **command** structure
 */
export interface AssertionProps {
  commandName: string;
  expectation: string;
  output?: string;
  usingTrueStatement: boolean;
}

/**
 * Represents **test** structure
 */
export interface Test {
  name?: string;
  subTests?: Test[];
  assertions: AssertionProps[];
}

/**
 * Represents **group** structure
 */

export interface Group {
  name?: string;
  subGroups?: Group[];
  tests: Test[];
}

export interface LogOut {}
