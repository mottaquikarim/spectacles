#!/bin/bash

set -exo pipefail

echo "branch is..."
echo $TRAVIS_BRANCH

if [[ $TRAVIS_BRANCH = *"content-"* ]] || [[ $TRAVIS_BRANCH = "master" ]]; then
    npm run-script content-assertions 
else
    echo "Not a content branch nor master branch, skipping assertions"
fi

EXIT_CODE=$?

echo "exit code is..."
echo $EXIT_CODE

exit ${EXIT_CODE}
