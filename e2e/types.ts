export interface CliOutput {
  stdout: string;
  exitCode: number | null;
}

export type OSEnv = "linux" | "windows" | "dev" | "mac";
