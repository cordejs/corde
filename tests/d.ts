import { Utils } from '../src/utils/utils';
import { ParameterNotFoundError } from '../src/errors';
import Consts from './mocks/constsNames';

console.log(Utils.clone(Consts.EMBED));
console.log(Consts.EMBED);
