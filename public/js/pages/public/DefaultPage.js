
define([], function () {

  "use strict";

  var DefaultPage = Backbone.Page.extend({

    initialize : function (options) {
      this.options = options;
    },

    render : function () {
      this.$el.html(this.options.template);
      return this;
    }

  });

  return DefaultPage;

});
