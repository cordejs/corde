import { testCollector } from '../../src/common/testColletor';
import { mustReturnFnImpl } from '../../src/testing-api';

describe('Testing CordeBot object', () => {
  beforeEach(() => {
    testCollector.cleanTestFunctions();
  });
  it('Should add a test function', () => {
    testCollector.addTestFunction((corde) => mustReturnFnImpl('test', corde, 'com', true));
    expect(testCollector.cloneTestFunctions().length).toBe(1);
  });

  it('Should not add a test function', () => {
    testCollector.addTestFunction(null);
    expect(testCollector.cloneTestFunctions().length).toBe(0);
  });
});
