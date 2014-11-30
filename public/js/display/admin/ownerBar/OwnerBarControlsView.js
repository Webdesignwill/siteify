
define([
  'App',
  'SiteifyModel',
  'text!display/admin/ownerBar/templates/ownerbarcontrols.tpl'
], function (App, SiteifyModel, template) {

  "use strict";

  var OwnerBarControlsView = Backbone.View.extend({

    events : {
      'click .delete-page' : 'delete'
    },

    initialize : function () {
      this.render();
    },

    setElements : function () {
      this.$sfOwnerControls = this.$el.find('.sf-owner-controls');
    },

    render : function () {
      this.$el.html(template);
      this.setElements();
      return this;
    },

    delete : function (e) {
      e.preventDefault();
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