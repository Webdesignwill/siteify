
var express = require('express'),
      debug = require('debug')('webdesignwill');

var env = process.env.NODE_ENV || 'development',
      config = require('./config/config')[env],
      mongoose = require('mongoose'),
      socketio = require('socket.io'),
      http = require('http');

// Database
var db = mongoose.connect(config.db);

// Sockets
var app = express(),
      server = http.createServer(app),
      io = socketio(server);

require('./sockets')(app, io);

// access control settings
require('./config/relations')(app, config);
require('./config/express')(app, config);
require('./config/routes')(app);

// Start
var port = process.env.PORT || 5000;
server.listen(port, function () {
  debug('Express server listening on port ' + server.address().port);
});

// expose app
exports = module.exports = app;