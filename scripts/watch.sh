#!/bin/bash

echo "Cleaning lib folder..."
rm -rf lib

echo "Watching for changes..."
tsc -w