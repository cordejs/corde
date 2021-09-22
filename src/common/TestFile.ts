import { Queue } from "../data-structures";
import { IEntityHook, ITest, Nullable, VoidLikeFunction } from "../types";
import { Group } from "./Group";

export class TestFile implements IEntityHook {
  readonly path: string;
  readonly beforeEachHooks: Queue<VoidLikeFunction>;
  readonly beforeStartHooks: Queue<VoidLikeFunction>;
  readonly afterAllHooks: Queue<VoidLikeFunction>;
  readonly afterEachHooks: Queue<VoidLikeFunction>;

  readonly tests: ITest[];
  readonly groups: Group[];

  isInsideGroupClausure: boolean;
  isInsideTestClausure: boolean;
  currentGroup!: Group;

  constructor(path: string) {
    this.path = path;
    this.isInsideGroupClausure = false;
    this.isInsideTestClausure = false;
    this.groups = [];
    this.tests = [];
    this.afterAllHooks = new Queue();
    this.beforeStartHooks = new Queue();
    this.beforeEachHooks = new Queue();
    this.afterEachHooks = new Queue();
  }

  addTest(test: ITest) {
    if (this.currentGroup) {
      this.currentGroup.tests.push(test);
    } else {
      this.tests.push(test);
    }
  }

  isEmpty() {
    return this.tests.length === 0 && this.areGroupsEmpty(this.groups);
  }

  private areGroupsEmpty(groups: Group[]): boolean {
    for (const group of groups) {
      if (group.tests.length === 0 && group.subGroups?.length === 0) {
        return false;
      }

      if (group.subGroups) {
        return this.areGroupsEmpty(group.subGroups);
      }
    }
    return true;
  }

  addBeforeEachHook(fn: VoidLikeFunction) {
    this.addToHook(fn, "beforeEachHooks");
  }

  addBeforeStartHook(fn: VoidLikeFunction) {
    this.addToHook(fn, "beforeStartHooks");
  }

  addAfterAllHook(fn: VoidLikeFunction) {
    this.addToHook(fn, "afterAllHooks");
  }

  addAfterEachHook(fn: VoidLikeFunction) {
    this.addToHook(fn, "afterEachHooks");
  }

  private addToHook(fn: VoidLikeFunction, hookFunctionName: keyof IEntityHook) {
    if (!fn) {
      return;
    }

    let hook: Nullable<Queue<VoidLikeFunction>> = null;
    if (this.groups.length > 1) {
      hook = this.groups[this.groups.length - 1][hookFunctionName];
    }

    hook = this[hookFunctionName];

    if (hook) {
      hook.enqueue(fn);
    }
  }
}
