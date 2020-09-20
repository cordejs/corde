#!/bin/bash

###########################################
## Definition of all tasks used in Corde ##
###########################################

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

function watch() {
    if [ -n "$1" ];
    then
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
    echo "starting bot..."
    echo "press ctrl + c to stop";
    node tests/manual_test/index.js
}

function watchTestBot() {
    clear $1
    echo "Watching for changes..." 
    watch $2;
}

function help() {
    if [ -n "$1" ];
    then
        echo "You must chose a task to execute";
    else
        echo "Task $1 not found";
    fi
    echo "available options:";
    echo "- build:              Clear lib in root and build corde lib.";
    echo "- build-all-watch:    Clear lib from corde and corde bot(for tests) and build then.";
    echo "- build-test-bot:     Clear lib folder of corde test bot and build it.";
    echo "- watch:              Watch for changes in corde lib and rebuild it.";
    echo "- validate-ci:        Check if circleCi configs are ok.";
    echo "- build-all:          Clear lib folder for corde and corde bot and build them.";
    echo "- start-bot:          Execute corde test bot.";
}

function publishCorde() {
    echo "rebuilding project...";
    clearAndBuild $LIB_PATH $ROOT_PATH
    node ./scripts/checkVersion.js

    if [ $? -eq 0 ]; then
        echo "publishing using 'yarn publish'..."            
       
       if [ $1 = "release"]; then
            yarn publish
       else 
            yarn publish --tag beta
       fi

        if [ $? = 0 ]; then
            echo 'done'
        fi
    else
        echo 'fail'
    fi
}

case $1 in
    "build") clearAndBuild $LIB_PATH $ROOT_PATH;;
    "build-all-watch") buildAllWatch;;
    "build-test-bot") clearAndBuild $BOT_LIB_PATH $BOT_PATH;;
    "watch") clearAndWatch $LIB_PATH $ROOT_PATH;;
    "validade-ci") validateCi;;
    "build-all") buildAll;;
    "start-bot") initTestBot;;
    "watch-test-bot") watchTestBot $BOT_LIB_PATH $BOT_PATH;;
    "publish-beta") publishCorde beta;;
    "publish-release") publishCorde release;;
    *) help $1;;
esac