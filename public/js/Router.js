
define([
  'Siteify',
  'PageFactory'
],

function (Siteify, PageFactory) {

  "use strict";

  var Router = Backbone.Router.extend({

    routes : {
      '(/)' : 'home',
      'siteify/setup/owner(/)' : 'setupOwner',
      'siteify/setup/site(/)' : 'setupSite',
      'siteify/setup/homepage(/)' : 'setupHomePage',

      'siteify/manage/pages(/)' : 'pages',
      'siteify/manage/users(/)' : 'users'
    },

    initialize : function () {

      this.$sfContent = $('#sf-content');
      // this.$sfRestricted = $('#sf-restricted');

      this.listenTo(Siteify.Sitemap, 'add', function (model) {
        this.addUserRoutes(model);
      }, this);
      this.listenTo(Siteify.Sitemap, 'remove', function (model) {
        this.removeRoute(model);
      }, this);

      this.pageFactory = new PageFactory();

    },

    addUserRoutes : function (model) {
      var self = this;
      self.route(model.get('route'), model.get('name'), function (option) {
        Siteify.set('creationmode', false);
        siteify_require([model.get('view')], function (Page) {
          self.pageFactory.make(self.$sfContent, model, Page, option);
        });
      });
    },

    removeRoute : function (model) {
      // TODO remove browser history for this
      // TODO remove route
    },

    execute: function(callback, args) {
      if (callback) callback.apply(this, args);
    },

    home : function (option) {

      Siteify.set('creationmode', false);

      var model = Siteify.Sitemap.getHomepage(),
            self = this;

      if(model) {
        siteify_require([model.get('view')], function (Page) {
          self.pageFactory.make(self.$sfContent, model, Page, option);
        });
      }
    },

    /* Owner routes
    ========================================== */

    setupSite : function (option) {
      var pageModel = new Backbone.Model({id : 'setupSite', name : 'setupSite'}),
            self = this;

      siteify_require(['SetupSitePage'], function (Page) {
        self.pageFactory.make(self.$sfContent, pageModel, Page, option);
      });
    },

    setupOwner : function (option) {
      var pageModel = new Backbone.Model({id : 'setupOwner', name : 'setupOwner'}),
            self = this;

      siteify_require(['SetupOwnerPage'], function (Page) {
        self.pageFactory.make(self.$sfContent, pageModel, Page, option);
      });
    },

    setupHomePage : function (option) {
      var pageModel = new Backbone.Model({id : 'setupHomePage', name : 'setupHomePage'}),
            self = this;

      siteify_require(['SetupHomePage'], function (Page) {
        self.pageFactory.make(self.$sfContent, pageModel, Page, option);
      });
    },

    pages : function (option) {
      Siteify.set('creationmode', true);
    },

    users : function (option) {
      Siteify.set('creationmode', true);
    }

  });

  return Router;

});