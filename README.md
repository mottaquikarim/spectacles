[![Build Status](https://travis-ci.org/mottaquikarim/spectacles.svg?branch=master)](https://travis-ci.org/mottaquikarim/spectacles) [![Maintainability](https://api.codeclimate.com/v1/badges/31dbc7931f1615720f64/maintainability)](https://codeclimate.com/github/mottaquikarim/spectacles/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/31dbc7931f1615720f64/test_coverage)](https://codeclimate.com/github/mottaquikarim/spectacles/test_coverage)

# [Spectacles](https://spectacles.surge.sh/#/)
^ Deployed app - however will only really work for collaborators. Pls open an issue if interested in contributing to the content for *this* repo!

Spec and scripts for generation of practice problems.

# Purpose

Although there are many independent schools teaching software development, there are few consistent formats for the creation and consumption of programming practice problems.

**Spectacles** is a series of scripts and a simple Express server that enforces a predefined spec for practice problem generation. It also provides a UI for quickly and easily creating this content and the required unit tests for the content itself.

Through Spectacles, we are asserting a specification for how practice problem content can and should be created. Ideally, if this spec if followed and Github is used as a single source of truth for all practice problem content, it can and would be trivial to write multiple clients that consume this data for various purposes.

For instance, on the student-facing side, we can write homework / curriculum generation services that draw on this spec to reliably pull in practice content, parse it and do whatever is necessary as required by business logic.

Additionally, having a strongly formal spec can allow others (ie: a coding school in Guatemala) to draw from this content and build custom client implementations that fit their needs, which could be different from our use cases.

# Usage

## Clone this repo

```
$ git clone https://github.com/mottaquikarim/spectacles && cd spectacles
```

## CD into `/app` and run `npm install`

```
$ cd app/ && npm install
```

## Running tasks

### Run `npm run-script new-problem` to create new problem

```
$ npm run-script new-problem
```

Should create a `/content` repo with subfolder, `.contentrc`, etc

## Running Server

### Run `npm run-script run-app`

```
$ npm run-script run-app
```

In browser, navigating to:

```
http://localhost:3000/content/${UUID}
```

would display JSON result of file contents if directory exists.

From terminal, **CURL**ing:
```
curl -X POST "http://localhost:3000/content/${UUID}" -H "Content-Type: application/json" -d '{"prompt.js": "test"}'
```
Would update the `prompt.js` key to `test` in file system.

When happy with content, simply git push to commit to SCM and allow others to use as well.

## Example

First,

```
$ npm run-script run-app
```

(There is a pre-made one committed as of now)

In browser, go **[here](http://localhost:3000/?uuid=62e2c530-32d7-4b17-835c-b02f8a137a4a#)**. Expect the following:

![scrn1](https://github.com/mottaquikarim/spectacles/blob/master/assets/scrn1.png?raw=true)

Click on **Run** on top right hand corner. Expect the following:

![scren2](https://github.com/mottaquikarim/spectacles/blob/master/assets/scrn2.png?raw=true)

