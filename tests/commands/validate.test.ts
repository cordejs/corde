import ConfigOptions from '../../src/models';
import validate from '../../src/commands/validate';

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
    const isValid = validate(configs);
    expect(isValid).toBe(false);
  });

  it('Should return false due to no botTestId', () => {
    configs.botTestId = '';
    const isValid = validate(configs);
    expect(isValid).toBe(false);
  });

  it('Should return false due to no channelId', () => {
    configs.channelId = '';
    const isValid = validate(configs);
    expect(isValid).toBe(false);
  });

  it('Should return false due to no cordeTestToken', () => {
    configs.cordeTestToken = '';
    const isValid = validate(configs);
    expect(isValid).toBe(false);
  });

  it('Should return false due to no guildId', () => {
    configs.guildId = '';
    const isValid = validate(configs);
    expect(isValid).toBe(false);
  });

  it('Should return false due to no testFilesDir', () => {
    configs.testFilesDir = '';
    const isValid = validate(configs);
    expect(isValid).toBe(false);
  });

  it('Should return true due all configs presence', () => {
    const isValid = validate(configs);
    expect(isValid).toBe(true);
  });
});
