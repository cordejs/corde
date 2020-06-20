import { CordeBot } from '../../common';
import { TestReport } from './testReport';

export interface MatcherStructure<ExpectedArgs> {
  isNot: boolean;
  commandName: string;
  action(cordeBot: CordeBot, args: ExpectedArgs): Promise<TestReport>;
}
