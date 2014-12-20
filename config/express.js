
var express = require('express'),
      bodyParser = require('body-parser'),
      oauthModel = require('./../app/models/oauth'),
      oauth2server = require('oauth2-server');

module.exports = function (app, config) {
  app.set('showStackError', true);

  app.use(express.static(config.root + '/public'));

  app.enable("jsonp callback");
  app.use(bodyParser());

  app.oauth = oauth2server({
    model: oauthModel,
    grants: ['password', 'refresh_token'],
    debug: true
  });

  app.use(app.oauth.errorHandler());

};