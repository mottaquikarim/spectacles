#!/bin/bash

set -exo pipefail

# Only run if CC_TEST_REPORTER_ID is set
[ -z "${CC_TEST_REPORTER_ID}" ] || {
  # CodeClimate requires GIT_COMMITTED_AT to be set
  # ( when it can't read this from .git )
  # I'm not sure how it's actually used
  # or if making it up is bad in any way
  GIT_COMMITTED_AT=$(date +%s)
  export GIT_COMMITTED_AT
  echo $GIT_BRANCH
  echo $GIT_COMMIT_SHA
  curl -L https://codeclimate.com/downloads/test-reporter/test-reporter-latest-linux-amd64 > ./cc-test-reporter
  chmod +x ./cc-test-reporter
  ./cc-test-reporter before-build
} || true

npm test
EXIT_CODE=$?

[ -z "${CC_TEST_REPORTER_ID}" ] || ./cc-test-reporter after-build --debug --exit-code ${EXIT_CODE} || true
exit ${EXIT_CODE}
