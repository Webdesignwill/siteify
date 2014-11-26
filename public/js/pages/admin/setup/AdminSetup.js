
define([
  'App',
  'UserModel'
], function (App, UserModel) {

  "use strict";

  var AdminSetup = Backbone.Page.extend({

    initialize : function (options) {
      this.options = options;
      this.form = new App.Forms();
    },

    render : function () {
      this.$el.html(this.options.template);
      var self = this;
      this.form.init(App.User, {
        name : 'Register',
        action : 'registerAdmin',
        el : this.$el.find('form')
      }, self.done);
      return this;
    },

    done : function (result, data, status) {
      App.Router.navigate('/siteify/setup/site', {trigger:true});
    }

  });

  return AdminSetup;

});