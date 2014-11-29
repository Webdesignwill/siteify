
define([
  'App',
  'SiteifyModel',
  'text!pages/admin/setup/templates/setupsite.tpl'
], function (App, SiteifyModel, template) {

  "use strict";

  var SetupSitePage = Backbone.Page.extend({

    initialize : function () {
      this.form = new App.Forms();
    },

    render : function () {
      this.$el.html(template);
      var self = this;
      this.form.init(SiteifyModel, {
        name : 'Setup',
        action : 'setup',
        el : this.$el.find('form')
      }, self.done);
      return this;
    },

    done : function (result, data, status) {
      if(result) {
        App.Router.navigate('/siteify/setup/homepage', {trigger:true});
      } else {
        alert('Something went wrong setting up Siteify');
      }
    }

  });

  return SetupSitePage;

});