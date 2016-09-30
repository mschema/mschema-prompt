var read = require('read');
var mschema = require('mschema');
var prompt = function (pdt, opts, cb) {
  // TODO: curry args
  read({ prompt: pdt + ':' , default: opts.default }, cb)
}

module.exports = function (handlers, complete) {
  // basic properties
  var props = Object.keys(handlers);
  props = props.reverse();
  var data = {};
  function iterate () {
    if (props.length === 0) {
      return complete(null, data);
    }
    var p = props.pop();
    prompt(p, { default: handlers[p].default }, function (err, d) {
      if (err) {
        return complete(err);
      }
      /*
      var validate = mschema.validate(d, handlers[p]);
      if (validate.valid) {
      } else {
        console.log(validate);
        props.push(p);
        return iterate();
      }*/
      data[p] = d;
      if (handlers[p].conform) {
        handlers[p].conform(data[p], function(err, val){
          if (err) {
            console.log(err.message);
            props.push(p);
            return iterate();
          }
          data[p] = val;
          iterate();
        })
      } else {
        iterate();
      }
      //console.log(d)
    })
  };
  iterate ();
}