
define([
  'Backbone',
  'require'
], function (Backbone, siteify_require) {

  "use strict";

  var Siteify = Backbone.Model.extend({

    page : new Backbone.Model(),
    $broker : $({}),

    init : function () {
      var self = this;

      function loadSitemap () {
        siteify_require(['Sitemap'], function (Sitemap) {
          self.Sitemap = new Sitemap();
          self.Sitemap.fetch({
            success : function () {
              loadBody();
            }
          });
        });
      }

      function loadBody () {
        siteify_require(['BodyView'], function (BodyView) {
          loadForms();
        });
      }

      function loadForms () {
        siteify_require(['forms'], function (config) {
          function load () {
            req(['Forms'], function (Forms) {
              self.Forms = Forms;
              loadRouter();
            });
          }
          var req = window.require(config(), function () {
            load();
          });
        });
      }

      function loadRouter () {
        siteify_require(['Router'], function (Router) {
          self.Router = new Router();

          /* TODO Investigate the passing in of self here */
          self.Router.init(self);
          console.log('%c Siteify has started ', 'background: #444f64; color: #FFFFFF');
        });
      }

      siteify_require(['UserModel'], function (UserModel) {
        self.User = new UserModel();
        loadSitemap();
      });

    }

  });

  return new Siteify();

});