
define([
  'App',
  'IntervalsCollection',
  'text!display/admin/intervals/templates/intervalManagement.tpl'
], function (App, IntervalsCollection, template) {

  "use strict";

  var IntervalManagement = Backbone.View.extend({

    initialize : function (options) {
      this.options = options;
      this.form = new App.Forms();
      this.render();
    },

    render : function () {
      this.$el.html(template);
      var self = this;
      this.form.init(IntervalsCollection, {
        name : 'Interval',
        action : 'addInterval',
        el : this.$el.find('form')
      }, function () { self.done(); });
      return this;
    },

    done : function () {
      this.form.clear();
    },

    close : function () {
      this.form.destroy();
    }

  });

  return IntervalManagement;

});