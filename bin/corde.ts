#!/usr/bin/env ts-node

"use strict";

import fs from "fs";

/* eslint-disable no-console */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-global-assign */

if (fs.existsSync("../src")) {
  throw new Error(
    "This script is for development usage only." +
      "Please call ./bin/corde to use corde for production",
  );
}

const MINIMAL_NODE_VERSION = "16.9.0";

const ver = process.versions.node;
const majorVer = +ver.split(".")[0];

process.env.ENV = "LOCAL";

// @ts-expect-error
if (majorVer < MINIMAL_NODE_VERSION) {
  console.error(
    `\nNode version '${ver}' is not supported. Please use Node.js ${MINIMAL_NODE_VERSION} or higher.`,
    `\nsee https://nodejs.org/en/download\n`,
  );
  process.exit(1);
}

try {
  import("../src/cli/cli");
} catch (error) {
  console.error(error);
}
