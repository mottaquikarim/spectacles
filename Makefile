SHELL := /bin/bash
app = spectacles

cp-envvars:
	cp ./envvars.sample ./envvars

build-dev: cp-envvars
	docker-compose build ${app}

test: build-dev
	docker-compose run ${app} /test.sh

test-dev: test