import { group } from 'console';
import { command } from '../../src/building';
import consts from './constsNames';

group(consts.GROUP_1, () => {
  test(consts.TEST_1, () => {
    command(consts.COMMAND_1).returnMessage(consts.EMBED);
  });
});
