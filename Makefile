SHELL := /bin/bash
app = spectacles

cp-envvars:
	cp ./envvars.sample ./envvars

build-dev: cp-envvars
	docker-compose build ${app}

update-contentrc: build-dev
	docker-compose run ${app} /push.sh

test: build-dev
	docker-compose run ${app} /test.sh

test-dev: test
