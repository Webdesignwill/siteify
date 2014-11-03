
define([
  'ButtonView'
], function (ButtonView) {

  "use strict";

  var Controls = Backbone.View.extend({

    initialize : function () {
      this.render();
    },

    render : function () {
      var btn = new ButtonView({
        name : 'Clear Selection',
        class : 'btn-warning',
        event : 'clear:selection',
        callback : null
      });

      this.$el.html(btn.el);

      return this;
    }

  });

  return Controls;

});