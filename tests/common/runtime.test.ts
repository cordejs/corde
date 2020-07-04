import runtime from '../../src/common/runtime';

import ConfigOptions from '../../src/models';

const config: ConfigOptions = {
  botPrefix: '!',
  botTestId: '123',
  channelId: '',
  cordeTestToken: '',
  guildId: '123',
  testFilesDir: '123',
  timeOut: undefined,
  botTestToken: undefined,
};

describe('Testing runtime', () => {
  it('Should set configs', () => {
    runtime.setConfigs(config);
    expect(runtime.configs).toEqual(config);
  });

  it('Should throw an error', () => {
    try {
      runtime.setConfigs(undefined);
    } catch (error) {
      expect(error instanceof Error).toBe(true);
    }
  });

  it('Should create a new instance of config', () => {
    runtime.configs = null;
    runtime.setConfigs(config);
    expect(runtime.configs).toEqual(config);
  });
});
