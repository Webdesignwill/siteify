
define([
  'Backbone',
  'Siteify'
],

function (Backbone, Siteify) {

  "use strict";

  var PageModel = Backbone.Model.extend({

    urls : {
      // register : '/api/user/register',
      // login : '/api/user/login',
      // logout : '/api/user/logout',
      // me : '/api/user/me',
      // session : '/api/user/session'
    },

    initialize : function () {},

    /* Attribute page settings should be set on the model */
    parse : function (model, options) {
      return model;
    },

    getPage : function (prop, direction) {
      return prop ? Siteify.Sitemap.get(this.get(direction + 'Page') + '-page').get(prop) : Siteify.Sitemap.get(this.get(direction + 'Page') + '-page');
    }

  });

  return PageModel;

});
