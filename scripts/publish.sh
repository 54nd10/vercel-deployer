#!/bin/bash

name=$(sed -n 's/.*"name": "\(.*\)".*/\1/p' package.json)
version=$(sed -n 's/.*"version": "\(.*\)".*/\1/p' package.json)
publishCommand="pnpm publish --no-git-checks --access public --tag"
baseDir=$PWD

if [[ "$1" == "--canary" ]]; then
    version=$version-canary
    publishCommand="$publishCommand canary"
else
    publishCommand="$publishCommand latest"
fi


echo "📦 - $name@$version"
cd $baseDir/dist
sed -i "s/\"version\": \".*\"/\"version\": \"$version\"/" package.json
# eval $publishCommand

