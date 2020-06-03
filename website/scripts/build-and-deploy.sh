#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"
cd ..

yarn build

./node_modules/.bin/netlify deploy --prod --site $NETLIFY_APP_ID --auth $NETLIFY_API_KEY --dir=build