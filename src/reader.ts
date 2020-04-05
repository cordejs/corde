import { FilesNotFoundError } from './errors';
import Shell from './shell';
import { Group } from './testing/models';

export async function getTestsList(files: string[]) {
  if (files) {
    const output: Group[] = [];
    for (const i in files) {
      if (files.hasOwnProperty(i)) {
        try {
          const out = await Shell.commandRun(`ts-node ${files[i]}`);
          output.push(out);
        } catch (error) {
          console.log(error);
        }
      }
    }

    return output;
  }
  throw new FilesNotFoundError();
}
