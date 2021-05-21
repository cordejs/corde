#!/bin/bash

LIB_PATH=lib
ROOT_PATH=.

function formatToLF() {
    find . ! -path './.git/**' \
    ! -path './node_modules/**' \
    ! -path './examples/real-bot-example/node_modules/**' \
    ! -path './website/node_modules/**' \
    ! -path './website/.docusaurus/**' \
    -type f -exec dos2unix {} \;
}


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

function watch() {
    if [ -n "$1" ]; then
        echo "watching changes for $1"
        cd $1
    else
        echo "watching changes for root dir"
    fi
    tsc -w
}

function clearAndWatch() {
    clear $1
    echo "watching for changes..."
    watch;
}

case $1 in
"build") clearAndBuild $LIB_PATH $ROOT_PATH ;;
"watch") clearAndWatch $LIB_PATH $ROOT_PATH ;;
*) help $1 ;;
esac
