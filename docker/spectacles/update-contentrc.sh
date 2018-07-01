#!/bin/bash

set -exo pipefail

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

commit_to_git() {
  cd ../
  git init
  git remote add origin https://${GH_TOKEN}@github.com/mottaquikarim/spectacles.git
  git fetch
  git checkout -f $TRAVIS_BRANCH 
  git pull

  cd app/
  npm run-script update-contentrc

  cd ../
  git add content/.contentrc
  git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
}

push_to_git() {
  git push --quiet --set-upstream origin $TRAVIS_BRANCH 
}

setup_git
commit_to_git
push_to_git

exit ${EXIT_CODE}
