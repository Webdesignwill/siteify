
define([
  'App',
  'IntervalsCollection'
], function (App, IntervalsCollection) {

  "use strict";

  var Button = Backbone.View.extend({

    tagName : 'button',
    className : 'btn btn-sm',
    events : {
      'click' : 'handler'
    },

    initialize : function (options) {
      this.options = options;
      this.render();
    },

    render : function () {
      this.$el.addClass(this.options.class || 'btn-primary');
      this.$el.html(this.options.name);
      return this;
    },

    handler : function (e) {
      e.preventDefault();
      if(this.options.event) App.$broker.trigger(this.options.event);
      if(this.options.callback) this.options.callback();
    }

  });

  return Button;

});