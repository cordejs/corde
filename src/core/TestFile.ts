import { Queue } from "../data-structures";
import { TestFileActionType, IEntityHook, ITest, Nullable, VoidLikeFunction } from "../types";
import { Group } from "./Group";

export class TestFile implements IEntityHook {
  readonly path: string;
  readonly beforeEachHooks: Queue<VoidLikeFunction>;
  readonly beforeAllHooks: Queue<VoidLikeFunction>;
  readonly afterAllHooks: Queue<VoidLikeFunction>;
  readonly afterEachHooks: Queue<VoidLikeFunction>;

  readonly closures: TestFileActionType[];

  isInsideGroupClosure: boolean;
  isInsideTestClosure: boolean;
  currentGroup?: Group;

  constructor(path: string) {
    this.path = path;
    this.isInsideGroupClosure = false;
    this.isInsideTestClosure = false;
    this.closures = [];
    const defaultProps = { clearOnExecution: false };
    this.afterAllHooks = new Queue(defaultProps);
    this.beforeAllHooks = new Queue(defaultProps);
    this.beforeEachHooks = new Queue(defaultProps);
    this.afterEachHooks = new Queue(defaultProps);
  }

  addTest(test: ITest) {
    if (this.currentGroup) {
      this.currentGroup.closures.push(test);
    } else {
      this.closures.push(test);
    }
  }

  isEmpty() {
    return this.closures.length === 0;
  }

  addBeforeEachHook(fn: VoidLikeFunction) {
    this.addToHook(fn, "beforeEachHooks");
  }

  addBeforeAllHook(fn: VoidLikeFunction) {
    this.addToHook(fn, "beforeAllHooks");
  }

  addAfterAllHook(fn: VoidLikeFunction) {
    this.addToHook(fn, "afterAllHooks");
  }

  addAfterEachHook(fn: VoidLikeFunction) {
    this.addToHook(fn, "afterEachHooks");
  }

  private getGroupActions() {
    return this.closures.filter((c) => c instanceof Group) as Group[];
  }

  private addToHook(fn: VoidLikeFunction, hookFunctionName: keyof IEntityHook) {
    if (!fn) {
      return;
    }

    let hook: Nullable<Queue<VoidLikeFunction>> = null;
    if (this.closures.length > 1 && this.isInsideGroupClosure) {
      const groups = this.getGroupActions();
      hook = groups[groups.length - 1][hookFunctionName];
    }

    hook = this[hookFunctionName];

    if (hook) {
      hook.enqueue(fn);
    }
  }
}
