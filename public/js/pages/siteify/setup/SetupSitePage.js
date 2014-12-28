
define([
  'Siteify',
  'text!pages/siteify/setup/templates/setupsite.tpl'
], function (Siteify, template) {

  "use strict";

  var SetupSitePage = Backbone.Page.extend({

    initialize : function () {
      this.form = new Siteify.Forms();
    },

    render : function () {
      this.$el.html(template);
      var self = this;
      this.form.init(Siteify, {
        name : 'Setup',
        action : 'setup',
        el : this.$el.find('form')
      }, self.done);
      return this;
    },

    done : function (result, data, status) {
      if(result) {
        Siteify.Router.navigate('/siteify/setup/homepage', {trigger:true});
      } else {
        alert('Something went wrong setting up Siteify');
      }
    }

  });

  return SetupSitePage;

});