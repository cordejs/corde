import { getTestList } from '../src/process/reader';
import { Group } from '../src/building/models';
import Consts from './mocks/constsNames';

const singleGroup: Group = {
  name: Consts.GROUP_1,
  tests: [
    {
      name: Consts.TEST_1,
      assertions: [
        {
          commandName: Consts.COMMAND_1,
          expectation: Consts.COMMAND_RESPONSE_1,
          usingTrueStatement: true,
        },
      ],
    },
  ],
};

describe('reader', () => {
  it('Should get single group, test and assertion', async () => {
    const groupResponse = await getTestList([`${process.cwd()}/tests/mocks/sampleWithSingleGroup`]);
    const groupExpectation: Group[] = [singleGroup];
    expect(groupResponse).toEqual(groupExpectation);
  });

  it('Should get double group. But single test and assertion in each group', async () => {
    const groupResponse = await getTestList([`${process.cwd()}/tests/mocks/sampleDoubleGroup`]);
    const groupExpectation: Group[] = [singleGroup, singleGroup];
    expect(groupResponse).toEqual(groupExpectation);
  });
});
