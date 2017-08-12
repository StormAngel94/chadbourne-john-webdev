var express = require('./express');
var app = express.express;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

express.use(cookieParser());
express.use(session({
    secret: process.env.SESSION_SECRET || "testSecret",
    resave: true,
    saveUninitialized: true
}));

express.use(passport.initialize());
express.use(passport.session());

var bodyParser = require('body-parser');
express.use(bodyParser.json());
express.use(bodyParser.urlencoded({ extended: true }));

express.use(app.static(__dirname + '/public'));

// require("./test/app");
// require("./assignment/app")(app);
require ("./project/app")(app);

port = process.env.PORT || 3000;
express.listen(port);