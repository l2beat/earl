#!/usr/bin/env bash
set -e

dir="$(dirname "$0")"
cd "$dir/.."

echo "Building website and all dependent projects..."

echo "Building earljs..."
cd ../earljs
pnpm build

echo "Building api-reference-generator..."
cd ../api-reference-generator
pnpm build

echo "Building website..."
cd ../website-new
pnpm build

cd "$dir/.."

./node_modules/.bin/netlify deploy --prod --site $NETLIFY_APP_ID --auth $NETLIFY_API_KEY --dir=build
