import { Config, CordeBotHandlerFunction } from './config';
import { Group } from './building/models';

export class GlobalSettings {
  static config: Config;
  static tests: Group[];
}

var handleFunc: CordeBotHandlerFunction;
