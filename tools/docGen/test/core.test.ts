import { testDocumentation } from './utils';

describe('core', () => {
  it('supports named re-exports', () => {
    testDocumentation({
      'a.ts': `
            /**
             * Simple variable description
             */
            export const simpleVariable: number = 1;
          `,
      'index.ts': `
            export { simpleVariable } from './a';
          `,
      markdown: `
            ## simpleVariable

            Simple variable description

            **TYPE**

            number
          `,
    });
  });

  it('supports re-named re-exports', () => {
    testDocumentation({
      'a.ts': `
            /**
             * Simple variable description
             */
            export const simpleVariable: number = 1;
          `,
      'index.ts': `
            export { simpleVariable as simpleVariable2 } from './a';
          `,
      markdown: `
            ## simpleVariable2

            Simple variable description

            **TYPE**

            number
          `,
    });
  });
});
