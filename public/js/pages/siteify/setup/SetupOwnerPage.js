
define([
  'Siteify',
  'text!pages/siteify/setup/templates/setupowner.tpl'
], function (Siteify, template) {

  "use strict";

  var SetupOwnerPage = Backbone.Page.extend({

    initialize : function () {
      this.form = new Siteify.Forms();
    },

    render : function () {
      this.$el.html(template);
      var self = this;
      this.form.init(Siteify, {
        name : 'Register',
        action : 'registerOwner',
        el : this.$el.find('form')
      }, self.done);
      return this;
    },

    done : function (result, data, status) {
      if(result) {
        Siteify.Router.navigate('/siteify/setup/site', {trigger:true});
      } else {
        alert('Something went wrong registering the owner');
      }
    }

  });

  return SetupOwnerPage;

});