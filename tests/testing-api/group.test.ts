import { group } from '../../src/testing-api';
import testCollector from '../../src/common/testColletor';
import { Group } from '../../src/models';

describe('Testing group function', () => {
  beforeEach(() => {
    testCollector.groups = [];
  });

  it('Should execute group function', () => {
    let a = 1;
    group('test group', () => {
      a = 2;
    });

    expect(a).toBe(2);
  });

  it('Should add a group', () => {
    const groupName = 'test group';
    const groupObj: Group = {
      tests: [],
      name: groupName,
    };

    group(groupName, () => {
      let a = 2;
    });

    if (testCollector.groups?.length === 0) {
      fail();
    } else {
      const group = testCollector.groups[0];
      expect(group).toEqual(groupObj);
    }
  });

  it('Should not add a group', () => {
    group(undefined, () => {
      let a = 2;
    });

    if (!testCollector.groups) {
      fail();
    } else {
      expect(testCollector.groups.length).toEqual(0);
    }
  });
});
