
define([
  'App',
  'SiteifyModel'
], function (App, SiteifyModel) {

  "use strict";

  var OwnerSetupPage = Backbone.Page.extend({

    initialize : function (options) {
      this.options = options;
      this.form = new App.Forms();
    },

    render : function () {
      this.$el.html(this.options.template);
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

  return OwnerSetupPage;

});