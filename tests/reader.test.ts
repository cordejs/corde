import { getTestList, getTestFilesFromDir } from '../src/process/reader';
import { Group, AssertionProps } from '../src/building/models';
import Consts from './mocks/constsNames';
import path from 'path';

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

describe('tests reader', () => {
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

describe('tests files reader', () => {
  const basePath = `${process.cwd()}\\tests\\mocks\\folderForReaderFilesTest`;

  it('Should get only a single file full path', () => {
    const filePath = `${basePath}\\test1.test.ts`;
    const files = getTestFilesFromDir([filePath]);
    expect(files).toEqual([filePath]);
  });

  it('Should get all recursively files', () => {
    const filesPath = [
      `${basePath}\\test1.test.ts`,
      `${basePath}\\test2.test.ts`,
      `${basePath}\\testFolder\\test3.test.ts`,
      `${basePath}\\testFolder\\testFolder2\\test4.test.ts`,
    ];
    const files = getTestFilesFromDir([basePath]);
    expect(files).toEqual(filesPath);
  });
});
