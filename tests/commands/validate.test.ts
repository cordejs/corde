import { validate } from '../../src/cli-commands';
import ConfigOptions from '../../src/models';

let configs: ConfigOptions;

beforeEach(() => {
  configs = {
    botPrefix: '!',
    botTestId: '12122216892126544',
    channelId: '12316351316252291',
    cordeTestToken: '5e8862cd73694287ff341e75c95e3c6a',
    guildId: '21685198465498',
    testFilesDir: './test',
    botTestToken: '1f77a63e0f60f3bf420edf67bfa3915b',
    timeOut: 5000,
  };
});

describe('Testing validate CLI function', () => {
  it('Should return false due to no botPrefix', () => {
    configs.botPrefix = '';
    expect(() => validate(configs)).toThrow();
  });

  it('Should return false due to no botTestId', () => {
    configs.botTestId = '';
    expect(() => validate(configs)).toThrow(Error);
  });

  it('Should return false due to no channelId', () => {
    configs.channelId = '';
    expect(() => validate(configs)).toThrow(Error);
  });

  it('Should return false due to no cordeTestToken', () => {
    configs.cordeTestToken = '';
    expect(() => validate(configs)).toThrow(Error);
  });

  it('Should return false due to no guildId', () => {
    configs.guildId = '';
    expect(() => validate(configs)).toThrow(Error);
  });

  it('Should return false due to no testFilesDir', () => {
    configs.testFilesDir = '';
    expect(() => validate(configs)).toThrow(Error);
  });

  it('Should return true due all configs presence', () => {
    expect(() => validate(configs)).not.toThrow(Error);
  });
});
