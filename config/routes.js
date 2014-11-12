
var Controllers = require('./../app/controllers'),
      middleware = require('./../app/middleware');

module.exports = function (app) {

  app.post('/getPermissions', Controllers.User.getPermissions);
  app.get('/private', function (req, res, next) {
    // for the hell of it
  });

  /* Siteify
  ==================================== */
  app.get('/api/siteify/hello', middleware.sessionSiteId, Controllers.Siteify.hello);
  app.post('/api/siteify/setup', Controllers.Siteify.setup);

  /* Oauth
  ==================================== */
  app.post('/api/oauth/token', app.oauth.grant());

  /* User
  ==================================== */
  app.post('/api/user/unique', Controllers.User.unique);
  app.post('/api/user/session', Controllers.User.session);
  app.post('/api/user/register', Controllers.User.register);
  app.get('/api/user/me', middleware.requiresUser, Controllers.User.getMe);
  app.delete('/api/user/me', middleware.requiresUser, Controllers.User.deleteMe);
  app.put('/api/user/me', middleware.requiresUser, Controllers.User.putMe);
  app.post('/api/user/logout', Controllers.User.logout);

   /* Pages
  ==================================== */
  app.post('/api/pages/create', Controllers.Pages.create);
  app.get('/api/pages/all', Controllers.Pages.all);
  app.get('/api/pages/get/:page_id', Controllers.Pages.get);
  app.put('/api/pages/put/:page_id', Controllers.Pages.put);
  app.delete('/api/pages/delete/:page_id', Controllers.Pages.delete);

};