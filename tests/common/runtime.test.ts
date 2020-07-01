import runtime from '../../src/common/runtime';

import ConfigOptions from '../../src/models';

describe('Testing runtime', () => {
  it('Should set configs', () => {
    const config: ConfigOptions = {
      botPrefix: '!',
      botTestId: '123',
      channelId: '',
      cordeTestToken: '',
      guildId: '123',
      testFilesDir: '123',
    };
    runtime.setConfigs(config);
    expect(runtime.configs).toEqual(config);
  });

  it('Should set configs', () => {
    const config: ConfigOptions = {
      botPrefix: '!',
      botTestId: '123',
      channelId: '',
      cordeTestToken: '',
      guildId: '123',
      testFilesDir: '123',
    };
    runtime.setConfigs(config);
    expect(runtime.configs).toEqual(config);
  });

  it('Should throw an error', () => {
    expect(runtime.setConfigs(undefined)).toThrowError();
  });

  it('Should get channel property', () => {
    expect(runtime.channelId).not.toBe(undefined);
  });
});
