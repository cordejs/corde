import { testDocumentation } from './utils';

describe('classes', () => {
  it('documents exported classes', () => {
    testDocumentation({
      'index.ts': `
        /**
         * Simple class description
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
        export class SimpleClass {
          /**
           * simpleMethod1 description
           * line 2
           * @see {@link https://test.url.3|Example url 3}
           * @see {@link https://test.url.4|Example url 4}
           * @example
           * example 3 line 1
           * example 3 line 2
           * @example
           * example 4 line 1
           * example 4 line 2
           */
          public simpleMethod1(): void {
            return;
          }

          /**
           * simpleMethod2 description
           * line 2
           */
          public simpleMethod2(a: string, b: number): string {
            return a + b;
          }
        }
      `,
      markdown: `
        ## SimpleClass

        Simple class description
        line 2

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

        ## simpleClass.simpleMethod1()

        simpleMethod1 description
        line 2

        **RETURNS**

        void

        **EXAMPLES**

        \`\`\`typescript
        example 3 line 1
        example 3 line 2
        \`\`\`

        \`\`\`typescript
        example 4 line 1
        example 4 line 2
        \`\`\`

        **SEE ALSO**

        - [Example url 3](https://test.url.3)
        - [Example url 4](https://test.url.4)

        ## simpleClass.simpleMethod2(a, b)

        simpleMethod2 description
        line 2

        **PARAMETERS**

        - \`a\`: string
        - \`b\`: number

        **RETURNS**

        string
      `,
    });
  });

  it('documents minimal information', () => {
    testDocumentation({
      'index.ts': `
        export class SimpleClass {
          public simpleMethod1(): void {
            return;
          }

          public simpleMethod2(a: string, b: number): string {
            return a + b;
          }
        }
      `,
      markdown: `
        ## SimpleClass

        ## simpleClass.simpleMethod1()

        **RETURNS**

        void

        ## simpleClass.simpleMethod2(a, b)

        **PARAMETERS**

        - \`a\`: string
        - \`b\`: number

        **RETURNS**

        string
      `,
    });
  });

  it('documents as dependency', () => {
    testDocumentation({
      'dependency.ts': `
        export class SimpleClass {
          public simpleMethod1(): void {
            return;
          }
        }
      `,
      'index.ts': `
        import { SimpleClass } from './dependency';

        export let testVariable: SimpleClass;
        export * from './dependency';
      `,
      markdown: `
        ## testVariable

        **TYPE**

        [SimpleClass](#simpleclass)

        ## SimpleClass

        ## simpleClass.simpleMethod1()

        **RETURNS**

        void
      `,
    });
  });

  it(`doesn't documents as dependency if not exported`, () => {
    testDocumentation({
      'dependency.ts': `
        export class SimpleClass {
          public simpleMethod1(): void {
            return;
          }
        }
      `,
      'index.ts': `
        import { SimpleClass } from './dependency';

        export let testVariable: SimpleClass;
      `,
      markdown: `
        ## testVariable

        **TYPE**

        SimpleClass
      `,
    });
  });

  it(`doesn't document not exported classes`, () => {
    testDocumentation({
      'index.ts': `
        class SimpleClass {}
      `,
      markdown: ``,
    });
  });

  it(`doesn't document internal classes`, () => {
    testDocumentation({
      'index.ts': `
        /**
         * @internal
         */
        export class SimpleClass {}
      `,
      markdown: ``,
    });
  });

  it(`doesn't document internal methods`, () => {
    testDocumentation({
      'index.ts': `
        export class SimpleClass {
          /**
           * @internal
           */
          public simpleMethod1(): void {
            return;
          }
        }
      `,
      markdown: `
        ## SimpleClass
      `,
    });
  });

  it('documents empty class', () => {
    testDocumentation({
      'index.ts': `
        export class SimpleClass {}
      `,
      markdown: `
        ## SimpleClass
      `,
    });
  });
});
