
define([
  'App',
  'handlebars',
  'SiteifyModel',
  'text!display/admin/ownerBar/templates/ownerbarcontrols.tpl'
], function (App, handlebars, SiteifyModel, template) {

  "use strict";

  var OwnerBarControlsView = Backbone.View.extend({

    events : {
      'click .delete-page' : 'preventDefault'
    },

    initialize : function () {
      this.listenTo(SiteifyModel, 'change:page', function (siteifyModel, page) {
        this.render();
      }, this);
      this.render();
    },

    setElements : function () {
      this.$deletePage = this.$el.find('.delete-page');
    },

    render : function () {

      var model = SiteifyModel.get('page').model;

      var tpl = handlebars.compile(template);
      var compiled = tpl(model.attributes);
      this.$el.html(compiled);

      this.setElements();

      if(model.get('homepage')) {
        this.$deletePage.addClass('disabled');
      }

      return this;
    },

    preventDefault : function (e) {
      if(SiteifyModel.get('page').model.get('homepage')) {
        e.preventDefault();
        e.stopPropagation();
      }
    },

    destroy : function () {
      this.$el.off();
      this.$el.empty();
    }

  });

  return OwnerBarControlsView;

});