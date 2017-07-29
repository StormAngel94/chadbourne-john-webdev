var express = require('./express');
var app = express.express;

var bodyParser = require('body-parser');
express.use(bodyParser.json());
express.use(bodyParser.urlencoded({ extended: true }));

express.use(app.static(__dirname + '/public'));

require("./test/app");
require("./assignment/app")(app);

port = process.env.PORT || 3000;
express.listen(port);