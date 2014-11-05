
define([
  'Backbone',
  'require'
], function (Backbone, siteify_require) {

  "use strict";

  var Siteify = Backbone.Model.extend({

    url : '/api/siteify/hello',
    page : new Backbone.Model(),
    $broker : $({}),

    initialize : function () {
      this.listenTo(this, 'change:status', function (model, event) {
        console.log('%c Siteify has ' + event + ' ', 'background: #444f64; color: #FFFFFF');
      });
    },

    setup : function (data, status) {

      var self = this;

      function getSitemap () {
        siteify_require(['Sitemap'], function (Sitemap) {
          self.Sitemap = new Sitemap();
          getBodyView();
        });
      }

      function getBodyView () {
        siteify_require(['BodyView'], function (BodyView) {
          getForms();
        });
      }

      function getForms () {
        siteify_require(['forms'], function (config) {
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
        siteify_require(['Router'], function (Router) {
          self.Router = new Router();
          start();
        });
      }

      function start () {
        if(data.showSetup) {
          return self.setupSiteify();
        }
        self.startSiteify();
      }

      siteify_require(['UserModel'], function (UserModel) {
        self.User = new UserModel();
        getSitemap();
      });

    },

    setupSiteify : function () {
      // Navigate to start page
      this.set('status', 'started');

      /* TODO Investigate the passing in of self here */
      this.Router.init(this).navigate('siteify/setup', {trigger:true});
    },

    startSiteify : function () {

      var self = this;

      function initRouter () {
        self.Router.init(self); /* TODO Investigate the passing in of self here */
        self.set('status', 'started');
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
      $.ajax({
        type : 'GET',
        context : this,
        url : this.url,
        contentType : 'application/x-www-form-urlencoded',
        success : this.setup,
        error : function (data, status) {
          alert("Siteify isn't available");
        }
      });
    }

  });

  return new Siteify();

});