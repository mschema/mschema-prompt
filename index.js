var read = require('read');
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
    var label = p;
    if (typeof handlers[p].label === 'string') {
      label = handlers[p].label;
    }
    prompt(label, { default: handlers[p].default }, function (err, d) {
      if (err) {
        return complete(err);
      }
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