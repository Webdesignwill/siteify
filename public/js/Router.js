
define([
  'App',
  'PageFactory'
],

function (App, PageFactory) {

  "use strict";

  var Router = Backbone.Router.extend({

    templatePath : '/js/templates',

    routes : {
      '(/)' : 'home',
      'siteify/setup/owner(/)' : 'setupOwner',
      'siteify/setup/site(/)' : 'setupSite',
      'siteify/setup/homepage(/)' : 'setupHomePage'
    },

    initialize : function () {

      this.$sfContent = $('#sf-content');

      this.listenTo(App.Sitemap, 'add', function (model) {
        this.addRoute(model);
      }, this);
      this.listenTo(App.Sitemap, 'remove', function (model) {
        this.removeRoute(model);
      }, this);

      this.pageFactory = new PageFactory();

    },

    addRoute : function (model) {
      var self = this;
      self.route(model.get('route'), model.get('name'), function (option) {
        app_require([model.get('view')], function (Page) {
          self.pageFactory.make(self.$sfContent, model, Page, option);
        });
      });
    },

    removeRoute : function (model) {

    },

    execute: function(callback, args) {
      if (callback) callback.apply(this, args);
    },

    home : function (option) {
      var model = App.Sitemap.getHomepage(),
            self = this;

      if(model) {
        app_require([model.get('view')], function (Page) {
          self.pageFactory.make(self.$sfContent, model, Page, option);
        });
      }
    },

    /* Owner routes
    ========================================== */

    setupSite : function (option) {
      var pageModel = new Backbone.Model({id : 'setupSite', name : 'setupSite'}),
            self = this;

      app_require(['SetupSitePage'], function (Page) {
        self.pageFactory.make(self.$sfContent, pageModel, Page, option);
      });
    },

    setupOwner : function (option) {
      var pageModel = new Backbone.Model({id : 'setupOwner', name : 'setupOwner'}),
            self = this;

      app_require(['SetupOwnerPage'], function (Page) {
        self.pageFactory.make(self.$sfContent, pageModel, Page, option);
      });
    },

    setupHomePage : function (option) {
      var pageModel = new Backbone.Model({id : 'setupHomePage', name : 'setupHomePage'}),
            self = this;

      app_require(['SetupHomePage'], function (Page) {
        self.pageFactory.make(self.$sfContent, pageModel, Page, option);
      });
    }

  });

  return Router;

});