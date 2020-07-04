import { Config, runtime, testCollector } from '../../src/common';

describe('Define tests for index of common module', () => {
  it('Should import runtime', () => {
    expect(runtime).toBeTruthy();
  });

  it('Should import Config', () => {
    expect(Config).toBeTruthy();
  });

  it('Should import testCollector', () => {
    expect(testCollector).toBeTruthy();
  });
});
