
(function() {
  var app, express;

  express = require('express');

  app = express();

  app.use(express["static"](__dirname + '/app'));
  app.use(express["static"](__dirname + '/bower_components'));

  app.listen("8080");

  console.log('Server started at http://localhost:8080');

}).call(this);