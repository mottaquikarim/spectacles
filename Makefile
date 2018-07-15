SHELL := /bin/bash
app = spectacles

cp-envvars:
	cp ./envvars.sample ./envvars

build-dev: cp-envvars
	docker-compose build ${app}

update-contentrc: build-dev
	docker-compose run ${app} /update-contentrc.sh

test: build-dev
	docker-compose run ${app} /test.sh

content-assertions: build-dev
	docker-compose run ${app} /content-assertions.sh

test-dev: test
