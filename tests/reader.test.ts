import { getTestList } from '../src/process/reader';
import { Group, AssertionProps } from '../src/building/models';
import Consts from './mocks/constsNames';

const assertion: AssertionProps = {
  commandName: Consts.COMMAND_1,
  expectation: Consts.COMMAND_RESPONSE_1,
  usingTrueStatement: true,
  messageType: 'text',
};

const singleGroup: Group = {
  name: Consts.GROUP_1,
  tests: [
    {
      name: Consts.TEST_1,
      assertions: [assertion],
    },
  ],
};

const singleTest: Group = {
  tests: [
    {
      name: Consts.TEST_1,
      assertions: [assertion],
    },
  ],
};

const singleCommand: Group = {
  tests: [
    {
      assertions: [assertion],
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

  it('Should get single test function', async () => {
    const groupResponse = await getTestList([`${process.cwd()}/tests/mocks/sampleSingleTest`]);
    const groupExpectation: Group[] = [singleTest];
    expect(groupResponse).toEqual(groupExpectation);
  });

  it('Should get a single command', async () => {
    const groupResponse = await getTestList([`${process.cwd()}/tests/mocks/onlyCommands`]);
    const groupExpectation: Group[] = [singleCommand];
    expect<Group[]>(groupResponse).toEqual<Group[]>(groupExpectation);
  });
});
