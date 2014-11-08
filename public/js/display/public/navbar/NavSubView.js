
define([
  'App',
  'SiteifyModel'
],

function (App, SiteifyModel) {

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
      this.listenTo(SiteifyModel, 'change:page', function (model, event) {
        console.log('NAV : ', model);
      });
      this.listenTo(App.Page, 'change:page', function (model) {
        this.highlightActive(model.get('page'));
      });
    },

    highlightActive : function (page) {
      this.$el[page.model === this.model ? 'addClass' : 'removeClass']('active');
    },

    navigate : function () {
      App.Router.navigate(this.model.get('path'), {trigger: true});
    },

    render : function () {
      this.$el.html('<a href="' + this.model.get('path') + '">' + this.model.get('name') + '</a>');
      return this;
    }

  });

  return NavSubView;

});
