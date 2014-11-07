
define([
  'App'
], function (App) {

  "use strict";

  var SetupPage = Backbone.Page.extend({

    initialize : function (options) {
      this.options = options;
      this.form = new App.Forms();
    },

    render : function () {
      this.$el.html(this.options.template);
      var self = this;
      this.form.init(App.Page, {
        name : 'Setup',
        action : 'create',
        el : this.$el.find('form')
      }, function () { self.done(); });
      return this;
    },

    done : function () {
      alert('Navigate to home page I guess');
    }

  });

  return SetupPage;

});