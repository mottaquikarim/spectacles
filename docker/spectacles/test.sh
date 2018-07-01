#!/bin/bash

set -exo pipefail

npm test

EXIT_CODE=$?
exit ${EXIT_CODE}
