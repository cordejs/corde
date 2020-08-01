#!/bin/bash

# This file contains all scripts used in package.json

LIB_PATH=lib;
ROOT_PATH=.;

BOT_PATH=tests/manual_test
BOT_LIB_PATH=tests/manual_test/lib

function clear() {
    echo "cleaning $1 folder..."
    rm -rf $1
}

# Usage: clearAngBuild (Folder to clear) (path to build)
function clearAndBuild() {
    clear $1

    echo "building $2..."
    tsc -p $2
}

function watch () {
    tsc -w
}

function clearAndWatch() {
    clear $1

    echo "Watching for changes..."
    
    watch;
}

# Check if circle ci config is valid
function validateCi() {
    circleci config validate
}

function buildAll() {
    clearAndBuild $LIB_PATH $ROOT_PATH;
    clearAndBuild $BOT_LIB_PATH $BOT_PATH;
} 

function buildAllAndWatch() {
    buildAll;
    watch;   
}

function initTestBot() {
    clearAndBuild $BOT_LIB_PATH $BOT_PATH;
    echo "starting bot..."
    echo "press ctrl + c to stop";
    node tests/manual_test/lib/tests/manual_test/index.js
}

case $1 in
    "build") clearAndBuild $LIB_PATH $ROOT_PATH;;
    "build-all-watch") buildAllWatch;;
    "build-test-bot") clearAndBuild $BOT_LIB_PATH $BOT_PATH;;
    "watch") clearAndWatch $LIB_PATH $ROOT_PATH;;
    "validade-ci") validateCi;;
    "build-all") buildAll;;
    "init-test-bot") initTestBot;;

    *) echo "Task not found";;
esac