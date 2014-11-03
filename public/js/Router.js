
define([
  'Siteify',
  'PageFactory'
],

function (Siteify, PageFactory) {

  "use strict";

  var Router = Backbone.Router.extend({

    init : function (module) {

      var self = this,
            pageFactory = new PageFactory(module);

      function setRoutes (pageModel) {
        /* TODO remove this and have the templates as blobs in the page mode */
        var templatePath = '/js/templates/';

        self.route(pageModel.get('route'), pageModel.get('name'), function (option) {
          siteify_require([pageModel.get('view')], function (View) {
            pageFactory.make(templatePath, $('#sf-content'), pageModel, View, option);
          });
        });
      }

      var sitemap = Siteify.Sitemap.attributes;
      for(var key in sitemap){
        console.log(sitemap[key]);
        setRoutes(sitemap[key]);
      }
      Backbone.history.start();
    },

    execute: function(callback, args) {
      if (callback) callback.apply(this, args);
    }

  });

  return Router;

});