
define([
  'Backbone',
  'SiteifyModel',
  'require'
], function (Backbone, SiteifyModel, app_require) {

  "use strict";

  var App = Backbone.Model.extend({

    Page : new Backbone.Model(),
    $broker : $({}),

    setup : function (data, status) {

      var self = this;

      function getSitemap () {
        app_require(['Sitemap'], function (Sitemap) {
          self.Sitemap = new Sitemap();
          getBodyView();
        });
      }

      function getBodyView () {
        app_require(['BodyView'], function (BodyView) {
          getForms();
        });
      }

      function getForms () {
        app_require(['forms'], function (config) {
          function load () {
            req(['Forms'], function (Forms) {
              self.Forms = Forms;
              getRouter();
            });
          }
          var req = window.require(config(), load);
        });
      }

      function getRouter () {
        app_require(['Router'], function (Router) {
          self.Router = new Router();
          start();
        });
      }

      function start () {
        self[SiteifyModel.get('setup') ? 'startApp' : 'setupApp']();
      }

      app_require(['UserModel'], function (UserModel) {
        self.User = new UserModel();
        getSitemap();
      });

    },

    setupApp : function () {
      /* TODO Investigate the passing in of this here */
      this.Router.init(this).navigate('/siteify/setup/admin', {trigger:true});
    },

    startApp : function () {

      var self = this;
      this.Sitemap.fetch({
        success : function () {
          self.Router.init(self); /* TODO Investigate the passing in of self here */
        },
        error : function () { alert('Something went wrong loading the pages'); }
      });
    },

    init : function () {
      var self = this;
      SiteifyModel.hello(function (result, data, status) {
        if(result) self.setup();
      });
    }

  });

  return new App();

});