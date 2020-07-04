import testCollector from '../../src/common/testColletor';
import { testFunctionType } from '../../src/models';
import { matcherWithNotFn } from '../../src/testing-api';

// TODO: Improve this tests
describe('Testing describe function', () => {
  beforeEach(() => {
    testCollector.cleanTestFunctions();
  });

  it('Should not return undefined', () => {
    const matches = matcherWithNotFn('name');
    expect(matches).not.toBe(undefined);
  });

  it('Should not return a function', () => {
    const matches = matcherWithNotFn('name');
    expect(matches.not).not.toBe(undefined);
  });

  it('Should add a function after call mustReturn', () => {
    matcherWithNotFn('test').mustReturn('empty');
    expect(testCollector.hasTestFunctions()).toBe(true);
  });

  it('Should add a function after call mustAddReaction', () => {
    matcherWithNotFn('test').mustAddReaction('empty');
    expect(testCollector.hasTestFunctions()).toBe(true);
  });

  it('Should add mustReturn function', () => {
    matcherWithNotFn('test').mustReturn('empty');
    const func = testCollector.cloneTestFunctions()[0];
    expect(func.toString()).toContain('mustReturnFnImpl');
  });

  it('Should add mustAddReaction function', () => {
    matcherWithNotFn('test').mustAddReaction('empty');
    const func = testCollector.cloneTestFunctions()[0];
    expect(func.toString()).toContain('mustAddReactionFnImpl');
  });
});
