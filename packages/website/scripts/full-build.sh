#!/usr/bin/env bash
set -e

dirname "$0" | cd

echo "Building website and all dependent projects..."

echo "Building earljs..."
cd ../earljs && yarn build

echo "Building api-reference-generator..."
cd ../api-reference-generator && yarn build

echo "Building website..."
cd ../website

if [ ! -f "./node_modules/.bin/docusaurus" ]; then
  echo "Installing optionalDependencies..."
  cp ./package.json ./package.json.bak

  # "optionalDependencies" seem to be broken in Yarn on GitHub Actions?
  # Note that Docusaurus must be an optional dependency, as it requires Node 14 and crashes `yarn install` on earlier Node versions.
  # todo: learn how to fix this? maybe PNPM helps?
  optionalDeps=$(node -e "console.log(Object.entries(require('./package.json').optionalDependencies).map(e => e.join('@')).join(' '))")
  echo $optionalDeps
  yarn add $optionalDeps
fi

yarn build

if [ -f "./package.json.bak" ]; then
  echo "Restoring package.json..."
  mv ./package.json.bak ./package.json
fi
