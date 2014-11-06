
define([
  'App'
],

function (App) {

  "use strict";

  var PageModel = Backbone.Model.extend({

    urls : {
      // register : '/api/user/register',
      // login : '/api/user/login',
      // logout : '/api/user/logout',
      // me : '/api/user/me',
      // session : '/api/user/session'
    },

    initialize : function (model, options) {
      this.listenTo(options.collection, 'sync', function (collection, ary, response) {
        this.setModelProperties(collection);
      }, this);
    },

    parse : function (model) {
      return model;
    },

    setModelProperties : function (collection) {
      var subpages = this.get('subpages'),
            self = this;

      if(subpages) {
        for(var i = 0; i<subpages.length;i++) {}
      }

    },

    getPage : function (prop, direction) {
      return prop ? App.Sitemap.get(this.get(direction + 'Page') + '-page').get(prop) : App.Sitemap.get(this.get(direction + 'Page') + '-page');
    }

  });

  return PageModel;

});
