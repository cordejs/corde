export interface CliOutput {
  stdout: string;
  exitCode: number | null;
  stderr: string;
}

export type OSEnv = "linux" | "windows" | "dev" | "mac";

export interface ITestFile {
  id: number;
  folder: string;
  testFile: string;
  exitCodeExpectation: number;
  isRequiredFunction?: boolean;
  only?: boolean;
}

export interface TestModule {
  testFn: () => Promise<CliOutput>;
}
