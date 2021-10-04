import { Queue } from "../data-structures";
import { IEntityHook, ITest, VoidLikeFunction } from "../types";

interface IBaseGroup {
  name?: string | number | boolean;
  tests?: ITest[];
}

export class Group implements IEntityHook {
  name?: string | number | boolean | undefined;
  readonly closures: (Group | ITest)[];
  readonly beforeEachHooks: Queue<VoidLikeFunction>;
  readonly afterEachHooks: Queue<VoidLikeFunction>;
  readonly afterAllHooks: Queue<VoidLikeFunction>;
  readonly beforeAllHooks: Queue<VoidLikeFunction>;

  constructor({ name, tests }: IBaseGroup) {
    this.name = name;
    this.closures = tests ?? [];
    const defaultProps = { clearOnExecution: false };
    this.beforeEachHooks = new Queue(defaultProps);
    this.beforeAllHooks = new Queue(defaultProps);
    this.afterEachHooks = new Queue(defaultProps);
    this.afterAllHooks = new Queue(defaultProps);
  }
}
