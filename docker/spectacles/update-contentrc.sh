#!/bin/bash

set -exo pipefail

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

commit_website_files() {
  git checkout -b $TRAVIS_BRANCH 
  git add ../* 
  git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
}

upload_files() {
  git remote add origin https://${GH_TOKEN}@github.com/mottaquikarim/spectacles.git > /dev/null 2>&1
  git push --quiet --set-upstream origin $TRAVIS_BRANCH 
}

setup_git
commit_website_files
upload_files

exit ${EXIT_CODE}
