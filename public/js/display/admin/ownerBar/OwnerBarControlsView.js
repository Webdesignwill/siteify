
define([
  'App',
  'handlebars',
  'SiteifyModel',
  'text!display/admin/ownerBar/templates/ownerbarcontrols.tpl'
], function (App, handlebars, SiteifyModel, template) {

  "use strict";

  var OwnerBarControlsView = Backbone.View.extend({

    events : {
      'click .delete-page' : 'delete'
    },

    initialize : function () {
      this.listenTo(SiteifyModel, 'change:page', function (siteifyModel, page) {
        this.render();
      }, this);
      this.render();
    },

    render : function () {

      var model = SiteifyModel.get('page').model;

      var tpl = handlebars.compile(template);
      var compiled = tpl(model.attributes);
      this.$el.html(compiled);

      if(model.get('homepage')) {
        this.$el.find('.delete-page').addClass('disabled');
      }

      return this;
    },

    delete : function (e) {
      e.preventDefault();

      if(SiteifyModel.get('page').model.get('homepage')) {
        return this;
      }

      App.Sitemap.delete(SiteifyModel.get('page'), function (result, data, status) {
        if(result) {
          return App.Router.navigate(App.Sitemap.getHomepage().get('path'), {trigger:true});
        }
        alert('There was a problem deleting the page');
      });
    },

    destroy : function () {
      this.$el.off();
      this.$el.empty();
    }

  });

  return OwnerBarControlsView;

});