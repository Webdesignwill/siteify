
define([
  'handlebars',
  'Siteify'
],

function (handlebars, Siteify) {

  "use strict";

  var NavSubView = Backbone.View.extend({

    tagName : 'li',

    events : {
      'click' : 'navigate'
    },

    initialize : function () {
      this.setEvents();
    },

    setEvents : function () {
      this.listenTo(Siteify.page, 'change:page', function (model) {
        this.highlightActive(model.get('page'));
      });
    },

    highlightActive : function (page) {
      this.$el[page.model === this.model ? 'addClass' : 'removeClas']('active');
    },

    navigate : function () {
      Siteify.Router.navigate(this.model.get('path'), {trigger: true});
    },

    render : function () {
      this.$el.html('<a href="' + this.model.get('path') + '">' + this.model.get('name') + '</a>');
      return this;
    }

  });

  return NavSubView;

});
