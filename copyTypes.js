// eslint-disable-next-line @typescript-eslint/no-var-requires
const ncp = require("ncp");

ncp("./src/global", "./lib/src/global", (err) => {
  if (err && err.length) {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  }
});
