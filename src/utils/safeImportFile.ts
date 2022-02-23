/**
 * @internal
 */
export function safeImportFile(path: string, onError?: (error: any) => void): Promise<any> {
  try {
    return import(path);
  } catch (error) {
    if (onError) {
      onError(error);
    }
    return Promise.resolve();
  }
}
