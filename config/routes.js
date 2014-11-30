
var Controllers = require('./../app/controllers'),
      middleware = require('./../app/middleware');

module.exports = function (app) {

  /* Siteify
  ==================================== */
  app.get('/api/siteify/hello', middleware.sessionSiteId, Controllers.Siteify.hello);
  app.post('/api/siteify/setup', Controllers.Siteify.setup);
  app.post('/api/siteify/owner', Controllers.Siteify.owner);

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
  app.post('/api/pages/new', middleware.requiresUser, Controllers.Pages.new);
  app.post('/api/pages/delete', middleware.requiresUser, Controllers.Pages.delete);
  app.get('/api/pages/all', Controllers.Pages.all);
  // app.get('/api/pages/get/:page_id', Controllers.Pages.get);
  // app.put('/api/pages/put/:page_id', Controllers.Pages.put);
  // app.delete('/api/pages/delete/:page_id', Controllers.Pages.delete);

};