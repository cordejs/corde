import { CordeBot } from '../../src/common';

describe('Testing exports of common index', () => {
  it('Should import sucessfuly CordeBot', () => {
    expect(CordeBot).toBeTruthy();
  });
});
