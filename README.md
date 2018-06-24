# Spectacles

Spec and scripts for generation of practice problems.

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



