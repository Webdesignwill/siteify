
define(['handlebars'], function (handlebars) {

  "use strict";

  var DefaultPage = Backbone.Page.extend({

    className : 'container',

    initialize : function (options) {
      this.model = options.model;
      this.$el.addClass(options.id);
    },

    render : function () {
      var tpl = handlebars.compile(this.model.get('html'));
      var compiled = tpl(this.model.attributes);

      this.$el.html(compiled);
      return this;
    }

  });

  return DefaultPage;

});
