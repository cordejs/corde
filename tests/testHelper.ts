export function getFullConsoleLog(log: [any?, ...any[]][]) {
  let stringValue = "";
  for (const value1 of log) {
    for (const value2 of value1) {
      stringValue += `${value2}\n`;
    }
  }
  return stringValue;
}
