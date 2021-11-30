#!/usr/bin/env bash
set -e

dir="$(dirname "$0")"

. "$dir/full-build.sh"

cd "$dir/.."

./node_modules/.bin/netlify deploy --prod --site $NETLIFY_APP_ID --auth $NETLIFY_API_KEY --dir=build
