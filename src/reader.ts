import { FilesNotFoundError } from './errors';
import Shell from './shell';
import { Group } from './building/models';

export async function getTestList(files: string[]) {
  if (files) {
    let output: Group[] = [];
    for (const i in files) {
      if (files.hasOwnProperty(i)) {
        try {
          const out = await Shell.commandRun(`ts-node ${files[i]}`);
          output = JSON.parse(out);
        } catch (error) {
          console.log(error);
        }
      }
    }

    return output;
  }
  throw new FilesNotFoundError();
}
