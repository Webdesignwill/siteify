
define([
  'App',
  'FretView',
  'FretModel'
], function (App, FretView, FretModel) {

  "use strict";

  var Fretboard = Backbone.View.extend({
    initialize : function () {
      this.render();
    },
    render : function () {

      var dc = document.createDocumentFragment();
      for(var i = 0; i<App.get('octave');i++) {
        var fv = new FretView({
          model : new FretModel({number : i+1})
        });
        dc.appendChild(fv.render().el);
      }
      this.$el.html(dc);

      return this;
    }
  });

  return Fretboard;

});