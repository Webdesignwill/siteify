
var Controllers = require('./../app/controllers');

module.exports = function (app) {

  /* Oauth
  ==================================== */
  app.post('/api/oauth/token', app.oauth.grant());

  /* Siteify
  ==================================== */
  app.get('/api/siteify/hello', Controllers.Siteify.hello);
  app.post('/api/siteify/setup', Controllers.Siteify.setup);
  app.post('/api/siteify/owner', Controllers.Siteify.owner);

  /* Me
  ==================================== */
  app.post('/api/me/unique', Controllers.Me.unique);
  app.post('/api/me/register', Controllers.Me.register);
  app.get('/api/me', app.oauth.authorise(), Controllers.Me.me);
  app.delete('/api/me', app.oauth.authorise(), Controllers.Me.deleteMe);
  app.put('/api/me', app.oauth.authorise(), Controllers.Me.putMe);
  app.post('/api/me/logout', app.oauth.authorise(), Controllers.Me.logout);

  /* All Users
  ==================================== */
  app.get('/api/users/all', app.oauth.authorise(), Controllers.Users.all);

   /* Pages
  ==================================== */
  app.post('/api/pages/new', app.oauth.authorise(), Controllers.Pages.new);
  app.post('/api/pages/delete', app.oauth.authorise(), Controllers.Pages.delete);
  app.get('/api/pages/all', Controllers.Pages.all);
  // app.get('/api/pages/get/:page_id', Controllers.Pages.get);
  // app.put('/api/pages/put/:page_id', Controllers.Pages.put);
  // app.delete('/api/pages/delete/:page_id', Controllers.Pages.delete);

};