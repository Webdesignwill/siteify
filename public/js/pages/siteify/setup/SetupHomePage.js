
define([
  'Siteify',
  'Errors',
  'text!pages/siteify/setup/templates/setuphomepage.tpl'
], function (Siteify, Errors, template) {

  "use strict";

  var SetupHomePage = Backbone.Page.extend({

    initialize : function () {
      this.form = new Siteify.Forms();
    },

    render : function () {
      this.$el.html(template);
      var self = this;
      this.form.init(Siteify.Sitemap, {
        name : 'NewPage',
        action : 'newPage',
        el : this.$el.find('form')
      }, self.done);
      return this;
    },

    done : function (result, data, status) {
      if(result) {
        Siteify.Router.navigate(data.path, {trigger:true});
      } else {
        new Errors('server', data.responseText);
      }
    }

  });

  return SetupHomePage;

});