
define([
  'Siteify'
],

function (Siteify) {

  "use strict";

  var NavSubView = Backbone.View.extend({

    tagName : 'li',

    events : {
      'click' : 'navigate'
    },

    initialize : function (options) {
      this.options = options;
      this.setEvents();
    },

    setEvents : function () {
      this.listenTo(Siteify, 'change:page', function (model) {
        this.highlightActive(model.get('page'));
      });
    },

    highlightActive : function (page) {
      this.$el[page.model === this.model ? 'addClass' : 'removeClass']('active');
    },

    navigate : function () {
      Siteify.Router.navigate(this.options.model.get('path'), {trigger: true});
    },

    render : function () {
      this.$el.html('<a href="' + this.options.model.get('path') + '">' + this.model.get('title') + '</a>');
      return this;
    },

    destroy : function () {
      this.stopListening();
      this.off();
      this.$el.remove();
    }

  });

  return NavSubView;

});
