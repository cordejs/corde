import expect from "expect";
import { createTestDocumentation, removePadding, testDocumentation } from "./utils";

describe("symbol", () => {
  it("documents in same order as in source", () => {
    testDocumentation({
      "index.ts": `
        export let b: string;
        export let a: number;
      `,
      markdown: `
        ## b

        **TYPE**

        string

        ## a

        **TYPE**

        number
      `,
    });
  });

  it("documents dependencies in topological order", () => {
    testDocumentation({
      "dependency.ts": `
        export type SimpleTypeA = {};
        export type SimpleTypeB = {};
        export type SimpleTypeC = { c: SimpleTypeB };
      `,
      "index.ts": `
        import { SimpleTypeC } from './dependency';
        export let testVariable: SimpleTypeC;
        export * from './dependency';
      `,
      markdown: `
        ## testVariable

        **TYPE**

        [SimpleTypeC](#simpletypec)

        ## SimpleTypeC

        **PROPERTIES**

        - \`c\`: [SimpleTypeB](#simpletypeb)

        ## SimpleTypeB

        ## SimpleTypeA
      `,
    });
  });

  it("doesn't document internal dependencies", () => {
    testDocumentation({
      "dependency.ts": `
        export type SimpleTypeB = {};
        /**
         * @internal
         */
        export type SimpleTypeC = { c: SimpleTypeB };
      `,
      "index.ts": `
        import { SimpleTypeC } from './dependency';
        export let testVariable: SimpleTypeC;
        export * from './dependency';
      `,
      markdown: `
        ## testVariable

        **TYPE**

        SimpleTypeC

        ## SimpleTypeB
      `,
    });
  });

  it("documents sections", () => {
    const docs = createTestDocumentation({
      "index.ts": `
        /**
         * @section one
         */
        export let b: string;
        export let a: number;
      `,
    });
    expect(docs.get("one")).toEqual(
      removePadding(`
        ## b

        **TYPE**

        string
      `),
    );

    expect(docs.get("default")).toEqual(
      removePadding(`
        ## a

        **TYPE**

        number
      `),
    );
  });

  it("documents class methods in separate sections", () => {
    const docs = createTestDocumentation({
      "index.ts": `
        /**
         * @section one
         */
        export class SimpleClass {
          public simpleMethod1(): void {}

          /**
           * @section two
           */
          public simpleMethod2(): void {}

          /**
           * @section two
           */
          public simpleMethod3(): void {}
        }
      `,
    });
    expect(docs.get("one")).toEqual(
      removePadding(`
        ## SimpleClass

        **SEE ALSO**

        - [two](two.md)
      `),
    );

    expect(docs.get("default")).toEqual(
      removePadding(`
        ## simpleClass.simpleMethod1()

        **RETURNS**

        void
      `),
    );

    expect(docs.get("two")).toEqual(
      removePadding(`
        ## simpleClass.simpleMethod2()

        **RETURNS**

        void

        ## simpleClass.simpleMethod3()

        **RETURNS**

        void
      `),
    );
  });

  it("creates cross section links", () => {
    const docs = createTestDocumentation({
      "index.ts": `
        /**
         * @section one
         */
        export type TypeInOtherSection = {};
        export let a: TypeInOtherSection;
      `,
    });
    expect(docs.get("default")).toEqual(
      removePadding(`
        ## a

        **TYPE**

        [TypeInOtherSection](one.md#typeinothersection)
      `),
    );
  });
});
