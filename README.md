## Node Project

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

## Jasmine test local
set directories`mkdir -p test/spec`

create [test/spect/test.js](https://gist.github.com/kmassada/1bc95a11ba49473e59e3)

add jasmine-node
```
npm install jasmine-node --save-dev
```

add npm script to package.json for jasmine node to test
`"test": "./node_modules/.bin/jasmine-node ./test/spec  --verbose"`

run `npm test`

## Jasmine web page

install pre-reqs
```
sudo npm install -g yo
sudo npm install -g bower grunt gulp
sudo npm install -g generator-jasmine
sudo npm install -g browserify
```

run `yo jasmine` if it asks, ovewrite directories


this creates `index.html`, `karma.conf.js`, `sepc/test.js`

```
test/
├── index.html
├── karma.conf.js
└─── spec
    └── test.js

```

we have 2 test-files
[test/spec/helloWorldSpec.js](https://github.com/kmassada/node/blob/master/test/spec/helloWorldSpec.js)
[test/spec/generatorSpec.js](https://github.com/kmassada/node/blob/master/test/spec/generatorSpec.js)

we seek to combine them into one `spec-bundle.js`, so it can be included by index.html
```
browserify test/spec/generatorSpec.js test/spec/helloWorldSpec.js > test/spec-bundle.js
```

we also have 2 app files
[app/generator.js](https://github.com/kmassada/node/blob/master/app/generator.js)
[app/node_server.js](https://github.com/kmassada/node/blob/master/app/node_server.js)

we seek to combine them into one `module-bundle.js`, so it can be included by index.html,

inside index.html we include all the files needed. `*-bundle.js` was compiled by us. and test.js

```html
<!-- include source files here... -->
<script src="module-bundle.js"></script>

<!-- include spec files here... -->
<script src="spec/test.js"></script>
<script src="spec-bundle.js"></script>
```

now we open the file in a browser `open test/index.html` and watch the tests pass.
![jasmine success](https://dl.dropboxusercontent.com/u/1567633/github/Screenshot_2016-01-06_17.56.41.png)

## Karma test

install karma requirements
```
sudo npm install -g karma
sudo npm install -g generator-karma
npm install grunt karma pahntomjs jasmine-core --save-dev
```

now bind karma to jasmine
```
yo karma --test-framework=jasmine
```

**while server is running**
```
karma start
```
