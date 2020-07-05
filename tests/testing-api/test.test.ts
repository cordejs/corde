import { testCollector } from '../../src/common/testColletor';
import { Test } from '../../src/models';
import { test } from '../../src/testing-api';

describe('Testing test function', () => {
  beforeEach(() => {
    testCollector.tests = [];
  });

  it('Should execute test function', () => {
    let a = 1;
    test('test group', () => {
      a = 2;
    });

    expect(a).toBe(2);
  });

  it('Should add a test', () => {
    const testName = 'test group';
    const testObj: Test = {
      testsFunctions: [],
      name: testName,
    };

    test(testName, () => {
      const a = 2;
    });

    if (testCollector.tests?.length === 0) {
      fail();
    } else {
      const _tests = testCollector.tests[0];
      expect(_tests).toEqual(testObj);
    }
  });

  it('Should not add a group', () => {
    test(undefined, () => {
      const a = 2;
    });

    if (!testCollector.tests) {
      fail();
    } else {
      expect(testCollector.tests.length).toEqual(0);
    }
  });
});
