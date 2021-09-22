import { Queue } from "../data-structures";
import { IEntityHook, ITest, VoidLikeFunction } from "../types";

interface IBaseGroup {
  name?: string | number | boolean;
  tests?: ITest[];
}

export class Group implements IEntityHook {
  name?: string | number | boolean | undefined;
  subGroups?: Group[] | undefined;
  tests: ITest[];
  readonly beforeEachHooks: Queue<VoidLikeFunction>;
  readonly afterEachHooks: Queue<VoidLikeFunction>;
  readonly afterAllHooks: Queue<VoidLikeFunction>;
  readonly beforeAllHooks: Queue<VoidLikeFunction>;

  constructor({ name, tests }: IBaseGroup) {
    this.name = name;
    this.tests = tests ?? [];
    this.beforeEachHooks = new Queue();
    this.beforeAllHooks = new Queue();
    this.afterEachHooks = new Queue();
    this.afterAllHooks = new Queue();
  }
}
