
define([
  'PageModel'
],

function (PageModel) {

  "use strict";

  var Sitemap = Backbone.Model.extend({

    url : '/api/pages/all',
    affix : '-page',
    sitemap : {},

    initialize : function () {},

    parse : function (response, options) {
       for(var i = 0; i < response.length; i++) {
        var nextPage = response[i+1], prevPage = response[i-1];
        this.sitemap[this.setPropertyName(response[i])] = new PageModel(this.createModel(response[i], 0, '', '', nextPage, prevPage));
      }

      return this.sitemap;
    },

    setPropertyName : function (pageObject) {
      return pageObject.name + '-page';
    },

    createModel : function (sitemap, level, route, path, np, pp) {

      var i, model = {
        _id : sitemap._id,
        level : level + 1,
        name : sitemap.name,
        map : sitemap.name + this.affix,
        view : JSON.parse(sitemap.page).view,
        template : JSON.parse(sitemap.page).template,
        route : route,
        path : path,
        nextPage : (np && np.name) || null,
        prevPage : (pp && pp.name) || null,
        nav : sitemap.nav || null,
        packages : sitemap.packages || null
      };

      model.path += sitemap.name + '/';
      model.route += sitemap.name;

      if(sitemap.subpages) {
        model.route += '/';
        for(i = 0; i < sitemap.subpages.length; i++) {
          var nextPage = sitemap.subpages[i+1], prevPage = sitemap.subpages[i-1];
          this.sitemap[this.setPropertyName(sitemap.subpages[i])] = new PageModel(this.createModel(sitemap.subpages[i], model.level, model.route, model.path, nextPage, prevPage));
        }
        if(sitemap.subpages.length === i) {
          model.route = model.route.slice(0,-1);
          model.route += '(/)';
        }
      } else {
        model.route += '(/)';
      }

      if(sitemap.option) {
        if(sitemap.subpages && sitemap.subpages.length === i || !sitemap.subpages) {
          model.route += '(:option)';
        }
      }

      if(sitemap.override) {
        var ovr = JSON.parse(sitemap.override);
        model.route = ovr.route;
        model.path = ovr.path;
      }

      return model;

    }

  });

  return Sitemap;

});