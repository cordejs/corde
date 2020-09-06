#!/bin/bash

set -e

LOCAL_USER=lucasgmagalhaes;

git diff-tree --no-commit-id --name-only -r HEAD >files_changed.txt
if ! grep -E "(^website\/.*)|(^\.circleci/website\.sh$)" files_changed.txt; then
    echo "Skipping website deploy. No relevant website files have changed"
else
    echo "Relevant website files have changed"
    # configure Docusaurus bot
    git config --global user.email "lucasgsm88@gmail.com"
    git config --global user.name "Corde deployment script"
    echo "machine github.com login $LOCAL_USER password $GH_TOKEN" >~/.netrc
    # install Docusaurus and generate file of English strings
    cd website
    # build and publish website
    yarn publish $LOCAL_USER
fi
