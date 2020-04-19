import { Config } from './config';
import { Group } from './building/models';

export class GlobalSettings {
  static config: Config;
  static tests: Group[];
}
