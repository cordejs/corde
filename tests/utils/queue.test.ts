import { Queue } from "../../src/utils/queue";

describe("testing queue structure", () => {
  let queue: Queue<() => void>;
  beforeEach(() => {
    queue = new Queue();
  });

  it("should add a function to queue", () => {
    queue.enqueue(() => {});
    expect(queue.size()).toBe(1);
  });

  it("should dequeue a function", () => {
    const fn = () => {};
    const guid = queue.enqueue(fn);
    queue.dequeue(guid);
    expect(queue.size()).toBe(0);
  });

  it("should execute all functions", () => {
    let a = 1;
    const fn = () => {
      a = 2;
    };
    queue.enqueue(fn);
    queue.executeSync();
    expect(a).toEqual(2);
  });

  it("should execute all functions with parameters", () => {
    let a = 1;
    const fn = (sum: number) => {
      a = 2 + sum;
    };

    const queueParams = new Queue<(sum: number) => void>();
    queueParams.enqueue(fn);
    queueParams.executeSync(2);
    expect(a).toEqual(4);
  });

  it("should execute all functions with parameters and return value", () => {
    const fn = (sum: number) => {
      return 2 + sum;
    };

    const queueParams = new Queue<(sum: number) => number>();
    queueParams.enqueue(fn);
    const returned = queueParams.executeSync(2);
    expect(returned).toEqual([4]);
  });

  it("should execute async all functions with parameters", async () => {
    let a = 1;
    const fn = (sum: number) => {
      a = 2 + sum;
    };

    const queueParams = new Queue<(sum: number) => void>();
    queueParams.enqueue(fn);
    await queueParams.executeAsync(2);
    expect(a).toEqual(4);
  });

  it("should execute async all functions with parameters and return value", async () => {
    const fn = (sum: number) => {
      return 2 + sum;
    };

    const queueParams = new Queue<(sum: number) => number>();
    queueParams.enqueue(fn);
    const returned = await queueParams.executeAsync(2);
    expect(returned).toEqual([4]);
  });

  it("should safe execute function that throws error and not provide catchFunction", () => {
    queue.enqueue(() => {
      throw Error();
    });

    expect(() => queue.tryExecuteSync()).not.toThrowError();
  });

  it("should safe execute function that not throws error, not provide catchFunction and return value", () => {
    const queueWithReturn = new Queue<() => number>();
    queueWithReturn.enqueue(() => {
      return 1;
    });
    const values = queueWithReturn.tryExecuteSync();
    expect(values).toEqual([1]);
  });

  it("should safe execute function that throws error and provide catchFunction", () => {
    queue.enqueue(() => {
      throw Error();
    });

    let a = 1;
    queue.tryExecuteSync(() => (a = 2));
    expect(a).toEqual(2);
  });

  it("should safe execute async function that throws error and not provide catchFunction", async () => {
    queue.enqueue(() => {
      throw Error();
    });

    expect(async () => await queue.tryExecuteAsync()).not.toThrowError();
  });

  it("should safe execute async function that throws error and provide catchFunction", async () => {
    queue.enqueue(() => {
      throw Error();
    });

    let a = 1;
    await queue.tryExecuteAsync(() => (a = 2));
    expect(a).toEqual(2);
  });

  it("should safe execute function that not throws error, not provide catchFunction and return value", async () => {
    const queueWithReturn = new Queue<() => number>();
    queueWithReturn.enqueue(() => {
      return 1;
    });
    const values = await queueWithReturn.tryExecuteAsync();
    expect(values).toEqual([1]);
  });

  it("should execute sync function handling error and returning it", () => {
    queue.enqueue(() => {
      throw new Error("Test Error");
    });

    const errors = queue.executeWithCatchCollectSync();
    expect(errors[0]).toEqual(new Error("Test Error"));
  });

  it("should execute async function handling error and returning it", async () => {
    queue.enqueue(() => {
      throw new Error("Test Error");
    });

    const errors = await queue.executeWithCatchCollectAsync();
    expect(errors[0]).toEqual(new Error("Test Error"));
  });

  it("should clear the queue", () => {
    queue.enqueue(() => {});
    queue.clear();
    expect(queue.size()).toBe(0);
  });

  it("should get default parameters", () => {
    const numberQueue = new Queue<(value: number) => void>();
    numberQueue.addDefaultParameters(1);
    expect(numberQueue.defaultParameters).toEqual([1]);
  });
});
