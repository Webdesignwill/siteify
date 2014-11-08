
define([
  'App',
  'SiteifyModel',
  'PageFactory'
],

function (App, SiteifyModel, PageFactory) {

  "use strict";

  var Router = Backbone.Router.extend({

    templatePath : '/js/templates',

    routes : {
      'siteify/setup(/)' : 'setup'
    },

    init : function (module) {

      var self = this;
      this.pageFactory = new PageFactory(module);

      function setRoutes (pageModel) {
        self.route(pageModel.get('route'), pageModel.get('name'), function (option) {
          app_require([pageModel.get('page').view], function (Page) {
            self.pageFactory.make(self.templatePath, $('#sf-content'), pageModel, Page, option);
          });
        });
      }

      App.Sitemap.each(function (model, index, list) {
        setRoutes(model);
      });

      Backbone.history.start();

      return this;
    },

    execute: function(callback, args) {
      if (callback) callback.apply(this, args);
    },

    setup : function (option) {
      var pageModel = new Backbone.Model({id : 'admin', name : 'setup'}),
            self = this;

      app_require(['SetupPage'], function (Page) {
        self.pageFactory.make(self.templatePath, $('#sf-content'), pageModel, Page, option);
      });
    }

  });

  return Router;

});