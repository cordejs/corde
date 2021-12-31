import { testDocumentation } from './utils';

describe('variables', () => {
  it('documents exported variables', () => {
    testDocumentation({
      'index.ts': `
        /**
         * Simple variable description
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
        export const simpleVariable: number = 1;
      `,
      markdown: `
        ## simpleVariable

        Simple variable description
        line 2

        **TYPE**

        number

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

  it('documents minimal information', () => {
    testDocumentation({
      'index.ts': `
        export const simpleVariable: number = 1;
      `,
      markdown: `
        ## simpleVariable

        **TYPE**

        number
      `,
    });
  });

  it(`doesn't document not exported variables`, () => {
    testDocumentation({
      'index.ts': `
        const simpleVariable = 1;
      `,
      markdown: ``,
    });
  });

  it(`doesn't document internal variables`, () => {
    testDocumentation({
      'index.ts': `
        /**
         * @internal
         */
        export const simpleVariable = 1;
      `,
      markdown: ``,
    });
  });
});
