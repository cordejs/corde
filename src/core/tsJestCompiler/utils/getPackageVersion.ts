/**
 * @internal
 */
export function getPackageVersion(moduleName: string): string | undefined {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require(`${moduleName}/package.json`).version as string;
  } catch (err) {
    console.log("fail check the version of package " + moduleName);
  }

  return;
}
