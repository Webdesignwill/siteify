
var express = require('express'),
      debug = require('debug')('webdesignwill');

var env = process.env.NODE_ENV || 'development',
      config = require('./config/config')[env],
      mongoose = require('mongoose');

// Database
var db = mongoose.connect(config.db);

// access control settings
require('./config/acl').initialize(app, db, config);

var app = express();

// express settings
require('./config/express')(app, config);

// route settings
require('./config/routes')(app);

// Start
var port = process.env.PORT || 5000;
var server = app.listen(port, function() {
  debug('Express server listening on port ' + server.address().port);
});

//expose app
exports = module.exports = app;