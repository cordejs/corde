import { command } from '../../src/testing-api';
describe('Testing command function', () => {
  it('Should return a MatchesWithNot object', () => {
    const matches = command('test');
    expect(matches).not.toBe(undefined);
  });
});
