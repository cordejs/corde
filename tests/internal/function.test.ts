import { testDocumentation } from "./utils";

describe("functions", () => {
  it("documents exported functions", () => {
    testDocumentation({
      "index.ts": `
        /**
         * Simple function description
         * line 2
         * @see {@link https://test.url.1|Example url 1}
         * @see {@link https://test.url.2|Example url 2}
         * @example
         * example 1 line 1
         * example 1 line 2
         * @example
         * example 2 line 1
         * example 2 line 2
         * @param a first parameter description
         * @param b second parameter description
         */
        export function simpleFunction(a: string, b?: number): string {
          return a;
        }
      `,
      markdown: `
        ## simpleFunction(a, b)

        Simple function description
        line 2

        **PARAMETERS**

        - \`a\`: string - first parameter description
        - \`b?\`: number - second parameter description

        **RETURNS**

        string

        **EXAMPLES**

        \`\`\`typescript
        example 1 line 1
        example 1 line 2
        \`\`\`

        \`\`\`typescript
        example 2 line 1
        example 2 line 2
        \`\`\`

        **SEE ALSO**

        - [Example url 1](https://test.url.1)
        - [Example url 2](https://test.url.2)
      `,
    });
  });

  it("documents minimal information", () => {
    testDocumentation({
      "index.ts": `
        export function simpleFunction(a: string, b: number): string {
          return a + b;
        }
      `,
      markdown: `
        ## simpleFunction(a, b)

        **PARAMETERS**

        - \`a\`: string
        - \`b\`: number

        **RETURNS**

        string
      `,
    });
  });

  it("documents as dependency", () => {
    testDocumentation({
      "dependency.ts": `
        export function simpleFunction(): void {}
      `,
      "index.ts": `
        export * from './dependency';
      `,
      markdown: `
        ## simpleFunction()

        **RETURNS**

        void
      `,
    });
  });

  it("doesn't documents as dependency if not exported", () => {
    testDocumentation({
      "dependency.ts": `
        export function simpleFunction(): void {}
      `,
      "index.ts": "",
      markdown: "",
    });
  });

  it("doesn't document not exported functions", () => {
    testDocumentation({
      "index.ts": `
        function simpleFunction(a: string, b: number): string {
          return a + b;
        }
      `,
      markdown: "",
    });
  });

  it("doesn't document internal functions", () => {
    testDocumentation({
      "index.ts": `
        /**
         * @internal
         */
        export function simpleFunction(a: string, b: number): string {
          return a + b;
        }
      `,
      markdown: "",
    });
  });

  it("documents functions with nested object parameters", () => {
    testDocumentation({
      "index.ts": `
        export function simpleFunction(a: {
          b: string
        }): void {}
      `,
      markdown: `
        ## simpleFunction(a)

        **PARAMETERS**

        - \`a\`: object
          - \`b\`: string

        **RETURNS**

        void
      `,
    });
  });

  it("documents function return type as dependency", () => {
    testDocumentation({
      "dependency.ts": `
        export let a: boolean;
        export type SimpleType = {};
      `,
      "index.ts": `
        import { SimpleType } from './dependency';
        export function simpleFunction(): SimpleType {}
        export * from './dependency';
      `,
      markdown: `
        ## simpleFunction()

        **RETURNS**

        [SimpleType](#simpletype)

        ## SimpleType

        ## a

        **TYPE**

        boolean
      `,
    });
  });

  it("documents function parameter type as dependency", () => {
    testDocumentation({
      "dependency.ts": `
        export let a: boolean;
        export type SimpleType = {};
      `,
      "index.ts": `
        import { SimpleType } from './dependency';
        export function simpleFunction(a: SimpleType): void {}
        export * from './dependency';
      `,
      markdown: `
        ## simpleFunction(a)

        **PARAMETERS**

        - \`a\`: [SimpleType](#simpletype)

        **RETURNS**

        void

        ## SimpleType

        ## a

        **TYPE**

        boolean
      `,
    });
  });
});
