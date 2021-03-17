#!/bin/bash

cd ..
rm -rf lib
yarn build
yarn prettier-lib
yarn publish
yarn test
