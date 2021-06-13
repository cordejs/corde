import { DiscordJSError } from "../errors";
import { DeepReadonly } from "../types";
import { IEntityToSnapshot } from "../types/snapshot";
import { deepFreeze } from "../utils";

export abstract class AbstractEntity<T> implements IEntityToSnapshot<T> {
  createSnapshot(): DeepReadonly<T> {
    return deepFreeze<T>(this as any as T);
  }

  async executeWithErrorOverride<T extends any>(fn: () => Promise<T> | T): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      throw new DiscordJSError(error.message);
    }
  }
}
