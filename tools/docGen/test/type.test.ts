import { testDocumentation } from './utils';

describe('type', () => {
  it('documents unions', () => {
    testDocumentation({
      'index.ts': `
        export let testVariable: string | number;
      `,
      markdown: `
        ## testVariable

        **TYPE**

        string | number
      `,
    });
  });

  it('documents objects', () => {
    testDocumentation({
      'index.ts': `
        type SimpleObjectType = {}
        export let testVariable: SimpleObjectType;
      `,
      markdown: `
        ## testVariable

        **TYPE**

        SimpleObjectType
      `,
    });
  });

  it('documents general objects', () => {
    testDocumentation({
      'index.ts': `
        export let testVariable: object;
      `,
      markdown: `
        ## testVariable

        **TYPE**

        object
      `,
    });
  });

  it('documents exported objects', () => {
    testDocumentation({
      'index.ts': `
        export type SimpleObjectType = {};
        export let testVariable: SimpleObjectType;
      `,
      markdown: `
        ## SimpleObjectType

        ## testVariable

        **TYPE**

        [SimpleObjectType](#simpleobjecttype)
      `,
    });
  });

  it(`doesn't documents internal objects`, () => {
    testDocumentation({
      'index.ts': `
        /**
         * @internal
         */
        export type SimpleObjectType = {};
        export let testVariable: SimpleObjectType;
      `,
      markdown: `
        ## testVariable

        **TYPE**

        SimpleObjectType
      `,
    });
  });

  it('references to types', () => {
    testDocumentation({
      'index.ts': `
      export type UnionType = string | number;
      export let testVariable: UnionType;
      `,
      markdown: `
        ## UnionType

        **POSSIBLE VALUES**

        - string
        - number

        ## testVariable

        **TYPE**

        [UnionType](#uniontype)

      `,
    });
  });

  it('documents any', () => {
    testDocumentation({
      'index.ts': `
        export let testVariable: any;
      `,
      markdown: `
        ## testVariable

        **TYPE**

        any
      `,
    });
  });

  it('documents unknown', () => {
    testDocumentation({
      'index.ts': `
        export let testVariable: unknown;
      `,
      markdown: `
        ## testVariable

        **TYPE**

        unknown
      `,
    });
  });

  it('documents interfaces', () => {
    testDocumentation({
      'index.ts': `
        interface InterfaceType {};
        export let testVariable: InterfaceType;
      `,
      markdown: `
        ## testVariable

        **TYPE**

        InterfaceType
      `,
    });
  });

  it('documents exported interfaces', () => {
    testDocumentation({
      'index.ts': `
        export interface InterfaceType {};
        export let testVariable: InterfaceType;
      `,
      markdown: `
        ## InterfaceType

        ## testVariable

        **TYPE**

        [InterfaceType](#interfacetype)
      `,
    });
  });

  it(`doesn't documents internal interfaces`, () => {
    testDocumentation({
      'index.ts': `
        /**
         * @internal
         */
        export interface InterfaceType {};
        export let testVariable: InterfaceType;
      `,
      markdown: `
        ## testVariable

        **TYPE**

        InterfaceType
      `,
    });
  });

  it('documents string literals', () => {
    testDocumentation({
      'index.ts': `
        export let testVariable: 'test string literal';
      `,
      markdown: `
        ## testVariable

        **TYPE**

        \`'test string literal'\`
      `,
    });
  });

  it('documents nulls', () => {
    testDocumentation({
      'index.ts': `
        export let testVariable: null;
      `,
      markdown: `
        ## testVariable

        **TYPE**

        null
      `,
    });
  });

  it('documents booleans', () => {
    testDocumentation({
      'index.ts': `
        export let testVariable: boolean;
      `,
      markdown: `
        ## testVariable

        **TYPE**

        boolean
      `,
    });
  });

  it('documents typed arrays', () => {
    testDocumentation({
      'index.ts': `
        export let testVariable: string[];
      `,
      markdown: `
        ## testVariable

        **TYPE**

        string[]
      `,
    });
  });

  it('documents type arguments', () => {
    testDocumentation({
      'index.ts': `
        export let testVariable: Promise<string>;
      `,
      markdown: `
        ## testVariable

        **TYPE**

        Promise&lt;string&gt;
      `,
    });
  });

  it('documents functions with type parameter', () => {
    testDocumentation({
      'index.ts': `
        export function simpleFunction<T>(): Promise<T> {}
      `,
      markdown: `
      ## simpleFunction&lt;T&gt;()

      **RETURNS**

      Promise&lt;T&gt;
      `,
    });
  });

  it('documents exported object arrays', () => {
    testDocumentation({
      'index.ts': `
        export type SimpleObjectType = {};
        export let testVariable: SimpleObjectType[];
      `,
      markdown: `
        ## SimpleObjectType

        ## testVariable

        **TYPE**

        [SimpleObjectType](#simpleobjecttype)[]
      `,
    });
  });

  it('documents anonymous types', () => {
    testDocumentation({
      'index.ts': `
        export let testVariable: { a: string };
      `,
      markdown: `
        ## testVariable

        **TYPE**

        object
        - \`a\`: string
      `,
    });
  });

  it('doesn`t documents members of non anonymous type', () => {
    testDocumentation({
      'index.ts': `
        export let testVariable: Buffer;
      `,
      markdown: `
        ## testVariable

        **TYPE**

        Buffer
      `,
    });
  });

  it('documents nested anonymous types', () => {
    testDocumentation({
      'index.ts': `
        export let testVariable: { a: { b: string } };
      `,
      markdown: `
        ## testVariable

        **TYPE**

        object
        - \`a\`: object
          - \`b\`: string
      `,
    });
  });

  it('documents nested anonymous types with optional properties', () => {
    testDocumentation({
      'index.ts': `
        export let testVariable: { a?: { b: string } };
      `,
      markdown: `
        ## testVariable

        **TYPE**

        object
        - \`a?\`: object
          - \`b\`: string
      `,
    });
  });

  it('documents nested anonymous types with optional properties with descriptions', () => {
    testDocumentation({
      'index.ts': `
        export let testVariable: {
          /**
           * first property description
           */
          a?: {
            /**
             * second property description
             */
            b: string
          }
        };
      `,
      markdown: `
        ## testVariable

        **TYPE**

        object
        - \`a?\`: object - first property description
          - \`b\`: string - second property description
      `,
    });
  });

  it('documents array type as dependency', () => {
    testDocumentation({
      'dependency.ts': `
        export let a: boolean;
        export type SimpleType = {};
      `,
      'index.ts': `
        import { SimpleType } from './dependency';
        export let testVariable: SimpleType[];
        export * from './dependency';
      `,
      markdown: `
      ## testVariable

      **TYPE**

      [SimpleType](#simpletype)[]

      ## SimpleType

      ## a

      **TYPE**

      boolean
      `,
    });
  });

  it('documents type parameter as dependency', () => {
    testDocumentation({
      'dependency.ts': `
        export let a: boolean;
        export type SimpleType = {};
      `,
      'index.ts': `
        import { SimpleType } from './dependency';
        export let testVariable: Promise<SimpleType>;
        export * from './dependency';
      `,
      markdown: `
      ## testVariable

      **TYPE**

      Promise&lt;[SimpleType](#simpletype)&gt;

      ## SimpleType

      ## a

      **TYPE**

      boolean
      `,
    });
  });

  it('documents union type dependencies', () => {
    testDocumentation({
      'dependency.ts': `
        export let a: boolean;
        export type SimpleTypeA = {};
        export type SimpleTypeB = {};
      `,
      'index.ts': `
        import { SimpleTypeA, SimpleTypeB } from './dependency';
        export let testVariable: SimpleTypeA | SimpleTypeB;
        export * from './dependency';
      `,
      markdown: `
      ## testVariable

      **TYPE**

      [SimpleTypeA](#simpletypea) | [SimpleTypeB](#simpletypeb)

      ## SimpleTypeA

      ## SimpleTypeB

      ## a

      **TYPE**

      boolean
      `,
    });
  });
});
