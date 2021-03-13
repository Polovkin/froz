#!/usr/bin/env sh

set -e

# сборка
npm run build

cd dist



git init
git add -A
git commit -m 'deploy'



cd -
