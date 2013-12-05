# codacy-poc

> An amazing project :D

---------------------------------------

## Requirements

- [NodeJS](http://nodejs.org/download/)
- [Grunt](http://gruntjs.com/) ```npm install -g grunt-cli```
- [PhantomJS](http://phantomjs.org/download.html)
- [Karma](http://karma-runner.github.io) ```npm install -g karma```
- [CasperJS](http://docs.casperjs.org/en/latest/installation.html#installing-from-git)
- [Bower](http://bower.io/) ```npm install -g bower```

---------------------------------------

## Node app

> _All the commands must be executed in the project root folder_

#### Prerequisite ####

> _To execute at least one time_

```bash
npm install
bower install
```

#### Start the NodeJS server ####

```bash
node start.js
```

#### Generate production files ####

```bash
grunt compile
```

#### Test prod files in the NodeJS server ####

```bash
node start.js prod
```

#### Unit tests ####

```bash
grunt test
```

#### ITG tests ####

```bash
grunt testitg
```
