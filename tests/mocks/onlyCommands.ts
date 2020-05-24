import { command } from '../../src/building';
import consts from './constsNames';

command(consts.COMMAND_1).shouldReturn(consts.COMMAND_RESPONSE_1);
