#!/usr/bin/env bash
set -e

dirname "$0" | cd

echo "Building website and all dependent projects..."

echo "Building earljs..."
cd ../earljs && yarn build
echo "Building api-reference-generator..."
cd ../api-reference-generator && yarn build
echo "Building website..."
cd ../website && yarn build
