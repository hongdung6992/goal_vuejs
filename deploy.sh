#!/usr/bin/env sh

set -e 

npm run build

cd dist

git init 
git add -A
git commit -m 'New deployment'
git push -f https://github.com/hongdung6992/goal_vuejs.git master:gh-pages

cd -
