import { matcherWithNotFn } from '../../src/testing-api';
import testCollector from '../../src/common/testColletor';

// TODO: Improve this tests
describe('Testing describe function', () => {
  beforeEach(() => {
    testCollector.cleanTestFunctions();
  });

  it('Should not return undefined', () => {
    const matches = matcherWithNotFn('name');
    expect(matches).not.toBe(undefined);
  });

  it('Should return not function', () => {
    const matches = matcherWithNotFn('name');
    expect(matches.not).not.toBe(undefined);
  });

  it('Should add mustReturn function', () => {
    matcherWithNotFn('test').mustReturn('empty');
    expect(testCollector.hasTestFunctions()).toBe(true);
  });

  it('Should add mustReturn function', () => {
    matcherWithNotFn('test').mustAddReaction('empty');
    expect(testCollector.hasTestFunctions()).toBe(true);
  });
});
