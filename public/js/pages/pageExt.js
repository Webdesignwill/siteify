
define([
  'Backbone'
], function (Backbone) {

  "use strict";

  Backbone.Page = Backbone.View.extend({

    constructor : function () {
      Backbone.View.prototype.constructor.apply(this, arguments);
    },

    opacity : function (done) {},
    before : function (done) {},

    close : function (done) {
      this.$el.off().remove();
      done();
    }

  });

});