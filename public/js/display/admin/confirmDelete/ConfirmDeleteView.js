
define([
  'App',
  'handlebars',
  'SiteifyModel',
  'text!display/admin/confirmDelete/templates/confirm.tpl'
], function (App, handlebars, SiteifyModel, template) {

  "use strict";

  var ConfirmDeleteView = Backbone.View.extend({

    events : {
      'click .btn-danger' : 'delete',
      'click .btn-primary' : 'goBack'
    },

    initialize : function () {
      this.render();
    },

    render : function () {
      var tpl = handlebars.compile(template);
      var compiled = tpl(SiteifyModel.get('page').model.attributes);
      this.$el.html(compiled);

      return this;
    },

    goBack : function () {
      App.$broker.trigger('modal:close');
    },

    delete : function (e) {
      e.preventDefault();

      var model = SiteifyModel.get('page').model;

      if(model.get('homepage')) {
        return this;
      }

      App.Sitemap.delete(SiteifyModel.get('page'), function (result, data, status) {
        if(result) {
          App.$broker.trigger('modal:close');
          return App.Router.navigate(App.Sitemap.getHomepage().get('path'), {trigger:true});
        }
        alert('There was a problem deleting the page');
      });
    },

    close : function () {
      this.$el.off();
      this.$el.empty();
    }

  });

  return ConfirmDeleteView;

});