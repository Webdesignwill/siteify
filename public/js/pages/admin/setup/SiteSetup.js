
define([
  'App',
  'SiteifyModel'
], function (App, SiteifyModel) {

  "use strict";

  var SiteSetupPage = Backbone.Page.extend({

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
      if(result) {
        App.Router.navigate('/siteify/pages/new', {trigger:true});
      } else {
        alert('Something went wrong setting up Siteify');
      }
    }

  });

  return SiteSetupPage;

});