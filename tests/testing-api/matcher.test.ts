import { matcherWithNotFn } from '../../src/testing-api';

// TODO: Improve this tests
describe('Testing describe function', () => {
  it('Should not return undefined', () => {
    const matches = matcherWithNotFn('name');
    expect(matches).not.toBe(undefined);
  });

  it('Should return not function', () => {
    const matches = matcherWithNotFn('name');
    expect(matches.not).not.toBe(undefined);
  });
});
