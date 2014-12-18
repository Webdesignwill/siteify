
define([
  'Siteify',
  'handlebars',
  'text!display/admin/ownerBar/templates/ownerbarcontrols.tpl'
], function (Siteify, handlebars, template) {

  "use strict";

  var OwnerBarControlsView = Backbone.View.extend({

    events : {
      'click .delete-page' : 'preventDefault'
    },

    initialize : function () {
      this.listenTo(Siteify, 'change:page', function (siteifyModel, page) {
        this.render();
      }, this);

      if(Siteify.get('page')) {
        this.render();
      }

    },

    setElements : function () {
      this.$deletePage = this.$el.find('.delete-page');
    },

    render : function () {

      var model = Siteify.get('page').model;

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
      if(Siteify.get('page').model.get('homepage')) {
        e.preventDefault();
        e.stopPropagation();
      }
    },

    destroy : function () {
      this.$el.off();
      this.stopListening();
      this.$el.empty();
    }

  });

  return OwnerBarControlsView;

});