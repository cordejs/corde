export function initEnvVariables() {
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = "test";
  }
}
