
define([
  'App',
  'SiteifyModel',
  'text!pages/admin/setup/templates/setupowner.tpl'
], function (App, SiteifyModel, template) {

  "use strict";

  var SetupOwnerPage = Backbone.Page.extend({

    initialize : function () {
      this.form = new App.Forms();
    },

    render : function () {
      this.$el.html(template);
      var self = this;
      this.form.init(SiteifyModel, {
        name : 'Register',
        action : 'registerOwner',
        el : this.$el.find('form')
      }, self.done);
      return this;
    },

    done : function (result, data, status) {
      if(result) {
        App.Router.navigate('/siteify/setup/site', {trigger:true});
      } else {
        alert('Something went wrong registering the owner');
      }
    }

  });

  return SetupOwnerPage;

});