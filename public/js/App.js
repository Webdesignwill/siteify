
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

        if(SiteifyModel.get('owner')) {
          return self[SiteifyModel.get('setup') ? 'startSite' : 'setupSite']();
        }

        Backbone.history.start();
        self.Router.navigate('/siteify/setup/owner', {trigger:true});
      }

      app_require(['UserModel'], function (UserModel) {
        self.User = new UserModel();
        getSitemap();
      });

    },

    setupSite : function () {
      Backbone.history.start();
      this.Router.navigate('/siteify/setup/site', {trigger:true});
    },

    startSite : function () {
      var self = this, path;
      this.Sitemap.getAllPages(function (result, data, status) {
        if(result) {
          path = SiteifyModel.get('homepage') ? self.Sitemap.getHomepage().get('path') : '/siteify/setup/homepage';
        } else {
          alert('Something went wrong loading the sitemap');
        }

        Backbone.history.start();
        self.Router.navigate(path, {trigger : true});
      });
    },

    init : function () {
      var self = this;
      SiteifyModel.hello(function (result, data, status) {
        if(result) {
          self.setup();
        } else {
          alert('Something went wrong saying hello :( ');
        }
      });
    }

  });

  return new App();

});