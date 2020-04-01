import { Test } from './test';

export function getTestsList(files: string[]) {
  console.log(files);
  const test = new Test();
  return [test];
}
