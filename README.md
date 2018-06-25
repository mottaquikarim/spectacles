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

## Example

First, 

```
$ npm run-script run-app
```

(There is a pre-made one committed as of now)

In browser, go **[here](http://localhost:3000/?uuid=62e2c530-32d7-4b17-835c-b02f8a137a4a#)**. Expect the following:

![scrn1](https://github.com/mottaquikarim/spectacles/blob/fe-basics/assets/scrn1.png?raw=true)

Click on **Run** on top right hand corner. Expect the following:

![scren2](https://github.com/mottaquikarim/spectacles/blob/fe-basics/assets/scrn2.png?raw=true)



