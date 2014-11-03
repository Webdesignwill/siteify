
var express = require('express'),
      session = require('express-session'),
      mongoStore = require('connect-mongo')(session),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      morgan = require('morgan'),
      flash = require('connect-flash'),
      oauth = require('./../app/models/oauth'),
      oauth2server = require('node-oauth2-server');

module.exports = function (app, config) {
  app.set('showStackError', true);

  app.use(express.static(config.root + '/public'));

  if(process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
  }

  app.enable("jsonp callback");

  app.use(cookieParser())
        .use(bodyParser());

  app.use(session({
    secret: 'intervalfilteristhebestfilterintheworld',
      store: new mongoStore({ url: config.db, collection: 'sessions'})
    })
  );

  app.oauth = oauth2server({
    model: oauth,
    grants: ['password', 'refresh_token'],
    debug: true
  });

  app.use(app.oauth.errorHandler());

};