
define(['handlebars'], function (handlebars) {

  "use strict";

  var DefaultPage = Backbone.Page.extend({

    initialize : function (options) {
      this.model = options.model;
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
