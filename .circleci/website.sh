#!/bin/bash

set -e

LOCAL_USER=lucasgmagalhaes;

git diff-tree --no-commit-id --name-only -r HEAD >files_changed.txt
if ! grep -E "(^website\/.*)|(^\.circleci/website\.sh$)" files_changed.txt; then
    echo "Skipping website deploy. No relevant website files have changed"
else
    echo "Relevant website files have changed"
    # configure git user
    git config --global user.email "lucasgsm88@gmail.com"
    git config --global user.name "Corde deployment script"
    echo "machine github.com login $LOCAL_USER password $GH_TOKEN" >~/.netrc
    cd website
    yarn
    # build and publish website
    yarn deploy $LOCAL_USER
fi
