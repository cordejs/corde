import init from '../../src/commands/init';
import fs from 'fs';
import path from 'path';

describe('Testing init cli function', () => {
  it('should create corde.json file', () => {
    init('js');
    const filePath = path.resolve(process.cwd(), 'corde.js');
    const jsFileExists = fs.existsSync(filePath);
    expect(jsFileExists).toBe(true);
    fs.unlinkSync(filePath);
  });

  it('should create corde.ts file', () => {
    init('ts');
    const filePath = path.resolve(process.cwd(), 'corde.ts');
    const tsFileExists = fs.existsSync(filePath);
    expect(tsFileExists).toBe(true);
    fs.unlinkSync(filePath);
  });

  it('should create corde.json file with directly argument', () => {
    init('json');
    const filePath = path.resolve(process.cwd(), 'corde.json');
    const tsFileExists = fs.existsSync(filePath);
    expect(tsFileExists).toBe(true);
    fs.unlinkSync(filePath);
  });

  it('should create corde.json file without directly argument', () => {
    init();
    const filePath = path.resolve(process.cwd(), 'corde.json');
    const tsFileExists = fs.existsSync(filePath);
    expect(tsFileExists).toBe(true);
    fs.unlinkSync(filePath);
  });

  it('should create corde.json file with undefined argument', () => {
    init(undefined);
    const filePath = path.resolve(process.cwd(), 'corde.json');
    const tsFileExists = fs.existsSync(filePath);
    expect(tsFileExists).toBe(true);
    fs.unlinkSync(filePath);
  });

  it('should print msg error if invalid file extension was informed', () => {
    let outputData = '';
    const storeLog = (inputs: string) => (outputData += inputs);
    console['log'] = jest.fn(storeLog);
    const invalidExtension = 'asdf';
    //@ts-expect-error
    init(invalidExtension);
    expect(outputData).not.toBe('');
    const filePath = path.resolve(process.cwd(), `corde.${invalidExtension}`);
    fs.unlinkSync(filePath);
  });
});
