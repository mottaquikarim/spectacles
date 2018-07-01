#!/bin/bash

set -exo pipefail

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

commit_website_files() {
  cd ../
  git init
  git remote add origin https://${GH_TOKEN}@github.com/mottaquikarim/spectacles.git
  git checkout $TRAVIS_BRANCH 
  git pull

  cd app/
  npm run-script update-contentrc

  cd ../
  git add content/.contentrc
  git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
}

upload_files() {
  git push --quiet --set-upstream origin $TRAVIS_BRANCH 
}

setup_git
commit_website_files
upload_files

exit ${EXIT_CODE}
