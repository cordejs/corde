#!/usr/bin/env sh

echo '--------------------------------------------------'
echo '---------- PUBLISHING CORDE NEW VERSION ----------'
echo '--------------------------------------------------'

echo 'Removing actual lib folder...'

cd ..
rm -r lib

echo 'Rebuilding lib..'

yarn build

echo 'Running tests...'
yarn test

if [ $? -eq 0 ]; then
    echo 'Tests passed. publishing package...'
else 
    echo 'Fail in tests execution. Fix it before publish a new version'
    exit 1
fi