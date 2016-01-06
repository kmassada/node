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
`"test": "./node_modules/.bin/jasmine-node ./test/spec"`

run `npm test`

## Testing Reference

install pre-reqs
```
sudo npm install -g yo
sudo npm install -g bower grunt gulp
sudo npm install -g generator-jasmine
```

run `yo jasmine`

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
