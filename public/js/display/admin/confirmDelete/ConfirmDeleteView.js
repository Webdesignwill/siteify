
define([
  'Siteify',
  'handlebars',
  'text!display/admin/confirmDelete/templates/confirm.tpl'
], function (Siteify, handlebars, template) {

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
      var compiled = tpl(Siteify.get('page').model.attributes);
      this.$el.html(compiled);

      return this;
    },

    goBack : function () {
      Siteify.$broker.trigger('modal:close');
    },

    delete : function (e) {
      e.preventDefault();

      var model = Siteify.get('page').model;

      if(model.get('homepage')) {
        return this;
      }

      Siteify.Sitemap.delete(Siteify.get('page'), function (result, data, status) {
        if(result) {
          Siteify.$broker.trigger('modal:close');
          return Siteify.Router.navigate(Siteify.Sitemap.getHomepage().get('path'), {trigger:true});
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