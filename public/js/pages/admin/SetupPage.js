
define([
  'App',
  'SiteifyModel',
  'UserModel'
], function (App, SiteifyModel, UserModel) {

  "use strict";

  var SetupPage = Backbone.Page.extend({

    initialize : function (options) {
      this.options = options;
      this.form = new App.Forms();
    },

    render : function () {
      this.$el.html(this.options.template);
      var self = this;
      this.form.init(SiteifyModel, {
        name : 'Setup',
        action : 'setup',
        el : this.$el.find('form')
      }, self.done);
      return this;
    },

    done : function (result, data, status) {
      alert('Navigate to home page I guess');
    }

  });

  return SetupPage;

});