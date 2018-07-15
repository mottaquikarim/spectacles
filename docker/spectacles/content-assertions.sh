#!/bin/bash

set -exo pipefail

if [[ $TRAVIS_BRANCH = *"content-"* ]] || [[ $TRAVIS_BRANCH = "master" ]]; then
    npm run-script content-assertions 
else
    echo "Not a content branch nor master branch, skipping assertions"
fi

EXIT_CODE=$?

exit ${EXIT_CODE}
