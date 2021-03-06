## Node Project

[![Build Status](https://travis-ci.org/kmassada/node.svg?branch=master)](https://travis-ci.org/kmassada/node)

create folder directory
```
mkdir node_server;
cd node_server;
```

install packages
```
npm install body-parser --save
npm install express --save
npm install request --save
```

create [app/node_server.js](https://gist.github.com/kmassada/bedc9c12b43280ebb103)

add npm script to package.json for node to start
`"start": "node ./app/node_server.js"`

start web server
```
npm start
```

## Mocha test local
install dep
```
npm install -g mocha
npm install --save-dev mocha chai superagent
```

create the following folder structure,
with these files
[test/spec/helloWorldSpec.js](https://github.com/kmassada/node/blob/master/test/spec/helloWorldSpec.js),
[test/spec/generatorSpec.js](https://github.com/kmassada/node/blob/master/test/spec/generatorSpec.js),
[test/spec/test.js](https://gist.github.com/kmassada/d9dd59474278ebbba4cb)

```
test
└── spec
    ├── generatorSpec.js
    ├── helloWorldSpec.js
    └── test.js
 ```

add npm script to package.json for jasmine node to test
`"test": "./node_modules/.bin/mocha ./test/spec  --verbose"`


run `npm test`

## gulp
introduce the following packages to setup jshint and nodemon auto restart server on file changes

```
npm install --save-dev gulp gulp-nodemon jshint gulp-jscs gulp-jshint jshint-stylish
```
## parser
TODO

## mongoose
npm install mongoose --save-dev
var mongoose   = require('mongoose');

Using mongoose we create a connection to the database,
`mongoose.connect(uri)`

http://mongoosejs.com/docs/guide.html guides us on what to do once connection is live.

## CORS
we enable cross origin requests from our angular ui app

```
var cors = require('cors');
// CORS
app.use(cors());
```

## JWT

npm install morgan jsonwebtoken --save

create a secret file at app/config/keys.json
```
{
	"secret": "vswSJrHvNxWxfdj7dvhbQjsBaLq6LrjVkSYKdTodhBzvpDefMe",
}
```
