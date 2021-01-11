var Ajv = require('ajv').default
var ajv = new Ajv({allErrors: true})

var schema = {
    "type": "object",
    "additionalProperties" : {
      "type": "integer",
      "minimum": 0,
      "maximum": 65535
    }
  };
  var validate = ajv.compile(schema);
  console.log(validate({a:1,b:10,c:100}));    // true
  console.log(validate({d:1,e:10,f:100000})); // false
  console.log(validate({g:1,h:10,i:10.5}));   // false
  console.log(validate({j:1,k:10,l:'abc'}));