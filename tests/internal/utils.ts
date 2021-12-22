import expect from "expect";
import rewiremock from "rewiremock";
import { createDocumentation, Documentation } from "../src";

rewiremock.overrideEntryPoint(module);

export function createTestDocumentation(sourceCode: { [fileName: string]: string }): Documentation {
  return createDocumentation({
    entry: "index.ts",
    sourceCode: {
      ...sourceCode,
      "lib.d.ts": `
      interface Array<T> {}
      interface Promise<T> {}
      interface Buffer {
        write(string: string, encoding?: BufferEncoding): number;
        write(string: string, offset: number, encoding?: BufferEncoding): number;
        write(string: string, offset: number, length: number, encoding?: BufferEncoding): number;
      }
    `,
    },
    compilerOptions: {
      strict: true,
      esModuleInterop: true,
    },
    getSectionLocation: (section: string): string => `${section}.md`,
  });
}

export function removePadding(text: string): string {
  const output = text.split("\n");
  const padding = output.length
    ? output.reduce((min, line) => {
        const match = /^(\s*)(\S)/.exec(line);
        if (!match || match[1].length > min) {
          return min;
        }

        return match[1].length;
      }, 9999)
    : 0;
  return output
    .map((line) => (line.length > padding ? line.substr(padding) : line))
    .join("\n")
    .trim();
}

export function testDocumentation({
  markdown,
  ...sourceCode
}: {
  [fileName: string]: string;
}): void {
  const defaultSection = createTestDocumentation({ markdown, ...sourceCode }).get("default") || "";

  expect(defaultSection.trim()).toEqual(removePadding(markdown));
}

export { rewiremock };
