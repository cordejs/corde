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

  isInsideGroupClausure: boolean;
  isInsideTestClausure: boolean;
  currentGroup?: Group;

  constructor(path: string) {
    this.path = path;
    this.isInsideGroupClausure = false;
    this.isInsideTestClausure = false;
    this.closures = [];
    this.afterAllHooks = new Queue();
    this.beforeAllHooks = new Queue();
    this.beforeEachHooks = new Queue();
    this.afterEachHooks = new Queue();
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
    if (this.closures.length > 1 && this.isInsideGroupClausure) {
      const groups = this.getGroupActions();
      hook = groups[groups.length - 1][hookFunctionName];
    }

    hook = this[hookFunctionName];

    if (hook) {
      hook.enqueue(fn);
    }
  }
}
