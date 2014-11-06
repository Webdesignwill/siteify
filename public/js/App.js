
define([
  'Backbone',
  'SiteifyModel',
  'require'
], function (Backbone, SiteifyModel, app_require) {

  "use strict";

  var App = Backbone.Model.extend({

    url : '/api/siteify/hello',
    page : new Backbone.Model(),
    $broker : $({}),

    initialize : function () {
      this.listenTo(this, 'change:status', function (model, event) {
        console.log('%c App has ' + event + ' ', 'background: #444f64; color: #FFFFFF');
      });
    },

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
          var req = window.require(config(), function () {
            load();
          });
        });
      }

      function getRouter () {
        app_require(['Router'], function (Router) {
          self.Router = new Router();
          start();
        });
      }

      function start () {
        self[SiteifyModel.get('showSetup') ? 'setupApp' : 'startApp']();
      }

      app_require(['UserModel'], function (UserModel) {
        self.User = new UserModel();
        getSitemap();
      });

    },

    setupApp : function () {
      /* TODO Investigate the passing in of self here */
      this.Router.init(this).navigate('siteify/setup', {trigger:true});
    },

    startApp : function () {

      var self = this;

      function initRouter () {
        self.Router.init(self); /* TODO Investigate the passing in of self here */
      }

      // TODO this.User.fetch({});

      this.Sitemap.fetch({
        success : function () {
          initRouter();
        },
        error : function () { alert('Something went wrong loading the pages'); }
      });
    },

    init : function () {
      var self = this;
      SiteifyModel.hello(function () {
        self.setup();
      });
    },

    makeSite : function (siteify, done) {
      done(true, null, null);
    }

  });

  return new App();

});