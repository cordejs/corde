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
          expectationString: Consts.COMMAND_RESPONSE_1,
          expectationObj: null,
          usingTrueStatement: true,
        },
      ],
    },
  ],
};

describe('reader', () => {
  it('Should get single group, test and assertion', async () => {
    const groupResponse = await getList('sampleWithSingleGroup');
    const groupExpectation: Group[] = [singleGroup];
    expect(groupResponse).toEqual(groupExpectation);
  });

  it('Should get double group. But single test and assertion in each group', async () => {
    const groupResponse = await getList('sampleDoubleGroup');
    const groupExpectation: Group[] = [singleGroup, singleGroup];
    expect(groupResponse).toEqual(groupExpectation);
  });

  it('Should get single embed Message', async () => {
    const groupResponse = await getList('embedMesageSample');
    singleGroup.tests[0].assertions[0].expectationObj = Consts.EMBED;
    const groupExpectation: Group[] = [singleGroup];
    console.log(groupExpectation);
    expect(groupResponse).toEqual(groupExpectation);
  });
});

async function getList(fileName: string) {
  return await getTestList([`${process.cwd()}/tests/mocks/${fileName}`]);
}
