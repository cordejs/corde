import { Config } from './config';
import { Group } from './building/models';
import { BehaviorSubject } from 'rxjs';

export class GlobalSettings {
  static config: Config;
  static tests: Group[];
  static cordeBotHasStarted = new BehaviorSubject<boolean>(false);
}
