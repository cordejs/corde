class MockProcess {
  /**
   * Helper function to create a mock of the Node.js method
   * `process.exit(code: number)`.
   *
   * @param err Optional error to raise. If unspecified or falsy, calling `process.exit` will resume code
   * execution instead of raising an error.
   */
  mockProcessExit(err?: any) {
    return jest.spyOn(process, "exit").mockImplementation(
      (err
        ? () => {
            throw err;
          }
        : () => {}) as () => never,
    );
  }

  mockProcessStdout() {
    return jest.spyOn(process.stdout, "write" as any).mockImplementation(() => true);
  }
}

export const mockProcess = new MockProcess();
