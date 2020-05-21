import {
  ChannelTypeNotSupportedError,
  ConfigFileNotFoundError,
  FileParserError,
  FilesNotFoundError,
  GuildNotFoundError,
  MissingPropertyError,
  ParameterNotFoundError,
  RuntimeErro,
} from '../src/errors';

const defaultMessage = 'test message';

test('channelTypeNotSupportedError', () => {
  try {
    throw new ChannelTypeNotSupportedError(defaultMessage);
  } catch (error) {
    expect(error.message).toBe(defaultMessage);
  }
});

test('configFileNotFoundError', () => {
  try {
    throw new ConfigFileNotFoundError(defaultMessage);
  } catch (error) {
    expect(error.message).toBe(defaultMessage);
  }
});

test('fileParserError', () => {
  try {
    throw new FileParserError(defaultMessage);
  } catch (error) {
    expect(error.message).toBe(defaultMessage);
  }
});

test('filesNotFoundError', () => {
  try {
    throw new FilesNotFoundError(defaultMessage);
  } catch (error) {
    expect(error.message).toBe(defaultMessage);
  }
});

test('guildNotFoundError', () => {
  try {
    throw new GuildNotFoundError(defaultMessage);
  } catch (error) {
    expect(error.message).toBe(defaultMessage);
  }
});

test('missingPropertyError', () => {
  try {
    throw new MissingPropertyError(defaultMessage);
  } catch (error) {
    expect(error.message).toBe(defaultMessage);
  }
});

test('parameterNotFoundError', () => {
  try {
    throw new ParameterNotFoundError(defaultMessage);
  } catch (error) {
    expect(error.message).toBe(defaultMessage);
  }
});

test('runTimeError', () => {
  try {
    throw new RuntimeErro(defaultMessage);
  } catch (error) {
    expect(error.message).toBe(defaultMessage);
  }
});
