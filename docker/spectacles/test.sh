#!/bin/bash

set -exo pipefail

cd app
npm test

EXIT_CODE=$?
exit ${EXIT_CODE}
