import { testDocumentation } from "./utils";

describe("enumerations", () => {
  it("documents exported enumerations", () => {
    testDocumentation({
      "index.ts": `
        /**
         * Simple enumeration description
         * line 2
         * @see {@link https://test.url.1|Example url 1}
         * @see {@link https://test.url.2|Example url 2}
         * @example
         * example 1 line 1
         * example 1 line 2
         * @example
         * example 2 line 1
         * example 2 line 2
         */
        export enum SimpleEnum { ONE = '\uE000', TWO = 1 };
      `,
      markdown: `
        ## SimpleEnum

        Simple enumeration description
        line 2

        **POSSIBLE VALUES**

        - \`ONE\`
        - \`TWO\`

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
        export enum SimpleEnum { ONE, TWO };
      `,
      markdown: `
        ## SimpleEnum

        **POSSIBLE VALUES**

        - \`ONE\`
        - \`TWO\`
      `,
    });
  });

  it("documents as dependency", () => {
    testDocumentation({
      "dependency.ts": `
        export enum SimpleEnum { ONE, TWO };
      `,
      "index.ts": `
        import { SimpleEnum } from './dependency';

        export let testVariable: SimpleEnum;
        export * from './dependency';
      `,
      markdown: `
        ## testVariable

        **TYPE**

        [SimpleEnum](#simpleenum)

        ## SimpleEnum

        **POSSIBLE VALUES**

        - \`ONE\`
        - \`TWO\`
      `,
    });
  });

  it("doesn't documents as dependency if not exported", () => {
    testDocumentation({
      "dependency.ts": `
        export enum SimpleEnum { ONE, TWO };
      `,
      "index.ts": `
        import { SimpleEnum } from './dependency';

        export let testVariable: SimpleEnum;
      `,
      markdown: `
        ## testVariable

        **TYPE**

        SimpleEnum
      `,
    });
  });

  it("doesn't document not exported enumerations", () => {
    testDocumentation({
      "index.ts": `
        enum SimpleEnum { ONE, TWO };
      `,
      markdown: "",
    });
  });

  it("doesn't document internal enumerations", () => {
    testDocumentation({
      "index.ts": `
        /**
         * @internal
         */
        export enum SimpleEnum { ONE, TWO };
      `,
      markdown: "",
    });
  });
});
