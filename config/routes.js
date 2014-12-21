
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

  /* User
  ==================================== */
  app.post('/api/user/unique', Controllers.User.unique);
  app.post('/api/user/register', Controllers.User.register);
  app.get('/api/user/me', app.oauth.authorise(), Controllers.User.me);
  app.delete('/api/user/me', app.oauth.authorise(), Controllers.User.deleteMe);
  app.put('/api/user/me', app.oauth.authorise(), Controllers.User.putMe);
  app.post('/api/user/logout', app.oauth.authorise(), Controllers.User.logout);

  /* All Users
  ==================================== */
  app.get('/api/users/all', app.oauth.authorise(), function (err, req, res, next) {
    res.json([{user : 'Willy'}]);
  });

   /* Pages
  ==================================== */
  app.post('/api/pages/new', app.oauth.authorise(), Controllers.Pages.new);
  app.post('/api/pages/delete', app.oauth.authorise(), Controllers.Pages.delete);
  app.get('/api/pages/all', Controllers.Pages.all);
  // app.get('/api/pages/get/:page_id', Controllers.Pages.get);
  // app.put('/api/pages/put/:page_id', Controllers.Pages.put);
  // app.delete('/api/pages/delete/:page_id', Controllers.Pages.delete);

};