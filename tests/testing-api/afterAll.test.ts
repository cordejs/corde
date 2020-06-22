import { afterAll } from '../../src/testing-api';
import testCollector from '../../src/common/testColletor';

describe('Testing afterAll function', () => {
  beforeEach(() => {
    testCollector.afterAllFunctions = [];
  });

  it('Should add a function', () => {
    let a = 1;
    afterAll(() => {
      a = 2;
    });

    testCollector.afterAllFunctions.map((fn) => fn());
    expect(a).toBe(2);
  });

  it('Should do nothing', () => {
    afterAll(undefined);

    const length = testCollector.afterAllFunctions.length;
    expect(length).toBe(0);
  });
});
