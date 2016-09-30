var prompt = require('../');
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
  console.log('got', data);
});