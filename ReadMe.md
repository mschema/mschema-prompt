# mschema-prompt

Absolutely minimal command line prompting utility with optional `mschema` validation.

## Features

  - ~40 [lines of code](https://github.com/mschema/mschema-prompt/blob/master/index.js)
  - Only one dependency: [read](https://www.npmjs.com/package/read)
  - Uses optional minimal JSON validator ( a sub-set of [mschema](https://github.com/mschema/mschema) )
  - Supports asynchronous `conform` validators
  - Allows for custom validation logic using async code

## Usage

**Generate `package.json` from command line prompting**

```javascript

var prompt = require('mschema-prompt');
var path = require('path');
var schema = {
  'name' : {
     default: path.basename(process.cwd()),
     conform: function (val, cb) {
       cb(null, val);
     }
  },
  'version' : {
    default: '1.0.0',
    conform: function (val, cb) {
      cb(null, val);
    }
  },
  'description': {
    default: ""
  },
  'language' : {
    default: "javascript",
    conform: function (val, cb) {
      var langs = ["javascript", "bash", "babel"];
      if (langs.indexOf(val) === -1) {
        return cb(new Error('Invalid option. Options include: \njavascript\nbash\nbabel'));
      } else {
        return cb(null, val);
      }
    }
  },
  'main': {
    default: "index.js"
  },
  "license": {
    default: "MIT"
  }
}

prompt(schema, function(err, data){
  if (err) {
    console.log('custom error');
    throw err;
  }
  console.log('got ', data);
});

```